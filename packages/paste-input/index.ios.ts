import { Utils } from '@nativescript/core';
import { PasteInputBase, PastePayload, PasteImageItem, PasteFileItem, PasteInputTempFiles, mimeMatchesAccept, utiToMime, hintProperty, editableProperty, maxLengthProperty, enableDragDropProperty } from './common';

/**
 * UITextView delegate
 */

@NativeClass()
class NSPasteTextViewDelegate extends NSObject implements UITextViewDelegate {
  static ObjCProtocols = [UITextViewDelegate];

  owner: WeakRef<PasteInput>;

  static initWithOwner(owner: WeakRef<PasteInput>): NSPasteTextViewDelegate {
    const delegate = NSPasteTextViewDelegate.new() as NSPasteTextViewDelegate;
    delegate.owner = owner;
    return delegate;
  }

  textViewDidChange(_textView: UITextView): void {
    const owner = this.owner?.deref();
    if (owner) {
      owner._updatePlaceholderVisibility();
    }
  }

  textViewShouldChangeTextInRangeReplacementText(textView: UITextView, range: NSRange, text: string): boolean {
    const owner = this.owner?.deref();
    if (owner && owner.maxLength > 0) {
      const currentLength = textView.text?.length || 0;
      const rangeLength = range.length;
      const newLength = currentLength - rangeLength + text.length;
      return newLength <= owner.maxLength;
    }
    return true;
  }
}

/**
 * UIDropInteraction delegate
 */

@NativeClass()
class NSPasteDropDelegate extends NSObject implements UIDropInteractionDelegate {
  static ObjCProtocols = [UIDropInteractionDelegate];

  owner: WeakRef<PasteInput>;

  static initWithOwner(owner: WeakRef<PasteInput>): NSPasteDropDelegate {
    const delegate = NSPasteDropDelegate.new() as NSPasteDropDelegate;
    delegate.owner = owner;
    return delegate;
  }

  dropInteractionCanHandleSession(_interaction: UIDropInteraction, session: UIDropSession): boolean {
    const owner = this.owner?.deref();
    if (!owner) return false;
    const accept = owner.accept || 'all';
    if (accept === 'all') return true;
    return session.hasItemsConformingToTypeIdentifiers(['public.image', 'public.data', 'public.text']);
  }

  dropInteractionSessionDidUpdate(_interaction: UIDropInteraction, _session: UIDropSession): UIDropProposal {
    return UIDropProposal.alloc().initWithDropOperation(UIDropOperation.Copy);
  }

  dropInteractionPerformDrop(_interaction: UIDropInteraction, session: UIDropSession): void {
    const owner = this.owner?.deref();
    if (!owner) return;

    const itemCount = session.items.count;
    const imageItems: PasteImageItem[] = [];
    let pendingLoads = 0;

    for (let i = 0; i < itemCount; i++) {
      const dragItem = session.items.objectAtIndex(i);
      const provider = dragItem.itemProvider;

      if (provider.hasItemConformingToTypeIdentifier('com.compuserve.gif')) {
        pendingLoads++;
        provider.loadDataRepresentationForTypeIdentifierCompletionHandler('com.compuserve.gif', (data: NSData, _error: NSError) => {
          if (data) {
            const filePath = PasteInputTempFiles.generateFilePath('gif');
            data.writeToFileAtomically(filePath, true);
            imageItems.push({
              uri: PasteInputTempFiles.getFileUri(filePath),
              mimeType: 'image/gif',
              animated: true,
            });
          }
          pendingLoads--;
          if (pendingLoads === 0 && imageItems.length > 0) {
            Utils.executeOnMainThread(() => {
              owner.notifyDrop({ type: 'images', items: imageItems });
            });
          }
        });
      } else if (provider.canLoadObjectOfClass(UIImage.class())) {
        pendingLoads++;
        provider.loadObjectOfClassCompletionHandler(UIImage.class(), (object: UIImage, _error: NSError) => {
          if (object) {
            const item = writeImageToTemp(object);
            if (item) {
              imageItems.push(item);
            }
          }
          pendingLoads--;
          if (pendingLoads === 0 && imageItems.length > 0) {
            Utils.executeOnMainThread(() => {
              owner.notifyDrop({ type: 'images', items: imageItems });
            });
          }
        });
      }
    }
  }
}

/**
 * UITextView subclass
 */

@NativeClass()
class NSPasteTextView extends UITextView {
  owner: WeakRef<PasteInput>;

  static initWithOwner(owner: WeakRef<PasteInput>): NSPasteTextView {
    const view = NSPasteTextView.new() as NSPasteTextView;
    view.owner = owner;
    return view;
  }

  override canPerformActionWithSender(action: string, sender: any): boolean {
    if (action === 'paste:') {
      const clipboard = UIPasteboard.generalPasteboard;
      // Show Paste for images, files, URLs, and text — not just text
      if (clipboard.hasImages || clipboard.hasStrings || clipboard.hasURLs || clipboard.numberOfItems > 0) {
        return true;
      }
    }
    return super.canPerformActionWithSender(action, sender);
  }

  override paste(sender: any): void {
    const owner = this.owner?.deref();
    if (!owner) {
      super.paste(sender);
      return;
    }

    const clipboard = UIPasteboard.generalPasteboard;
    const accept = owner.accept || 'all';
    const payload = extractPasteboardContent(clipboard, accept);

    if (payload) {
      if (payload.type === 'text') {
        // Let text paste through normally, then notify
        super.paste(sender);
      }
      // For images/files/unsupported, do NOT call super.paste()
      owner.notifyPaste(payload);
    } else {
      super.paste(sender);
    }
  }
}

/**
 * Pasteboard content extraction
 */

function acceptsImages(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('image/png', accept) || mimeMatchesAccept('image/jpeg', accept) || mimeMatchesAccept('image/gif', accept);
}

function acceptsText(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('text/plain', accept);
}

function acceptsFiles(accept: string): boolean {
  return !accept || accept === 'all' || mimeMatchesAccept('application/pdf', accept) || mimeMatchesAccept('application/rtf', accept) || mimeMatchesAccept('text/html', accept);
}

/**
 * Extension-to-MIME map for resolving file URLs
 */
const imageExtensions: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
  webp: 'image/webp',
  tiff: 'image/tiff',
  tif: 'image/tiff',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  icns: 'image/x-icns',
};

/**
 * Process a resolved file URL into a PastePayload.
 * For file reference URLs (/.file/id=...), uses NSData.dataWithContentsOfURL as fallback.
 * hintFilename is used when the URL path has no extension (e.g. clipboard.string from Finder).
 */
function processFileUrl(fileUrl: NSURL, accept: string, hintFilename?: string): PastePayload | null {
  const filePath = fileUrl.path;
  const isFileRef = !filePath || filePath.startsWith('/.file/');

  // Determine extension from path or hint filename (clipboard.string from Finder)
  let ext = '';
  if (!isFileRef && filePath) {
    ext = filePath.split('.').pop()?.toLowerCase() || '';
  }
  if (!ext && hintFilename) {
    const dotIndex = hintFilename.lastIndexOf('.');
    if (dotIndex >= 0) {
      ext = hintFilename.substring(dotIndex + 1).toLowerCase();
    }
  }

  const imageMime = imageExtensions[ext];

  // Load data from file path (resolved URL) or directly from URL (file reference)
  const loadData = (): NSData | null => {
    if (!isFileRef && filePath) {
      return NSData.dataWithContentsOfFile(filePath);
    }
    try {
      return NSData.dataWithContentsOfURL(fileUrl);
    } catch (_e) {
      return null;
    }
  };

  // Load UIImage from file path or from data
  const loadImage = (): UIImage | null => {
    if (!isFileRef && filePath) {
      return UIImage.imageWithContentsOfFile(filePath);
    }
    const data = loadData();
    return data ? UIImage.imageWithData(data) : null;
  };

  // Try as image if it has a known image extension
  if (imageMime && acceptsImages(accept)) {
    if (ext === 'gif') {
      const data = loadData();
      if (data) {
        const tempPath = PasteInputTempFiles.generateFilePath('gif');
        data.writeToFileAtomically(tempPath, true);
        return {
          type: 'images',
          items: [{ uri: PasteInputTempFiles.getFileUri(tempPath), mimeType: 'image/gif', animated: true }],
        };
      }
    }

    const image = loadImage();
    if (image) {
      const item = writeImageToTemp(image);
      if (item) {
        return { type: 'images', items: [item] };
      }
    }
  }

  // No known image extension — try loading as image anyway
  if (!imageMime && acceptsImages(accept)) {
    const image = loadImage();
    if (image) {
      const item = writeImageToTemp(image);
      if (item) {
        return { type: 'images', items: [item] };
      }
    }
  }

  // Try as a generic file
  if (acceptsFiles(accept)) {
    const data = loadData();
    if (data) {
      const tempPath = PasteInputTempFiles.generateFilePath(ext || 'bin');
      data.writeToFileAtomically(tempPath, true);
      const fileName = !isFileRef && filePath ? filePath.split('/').pop() : hintFilename || undefined;
      return {
        type: 'files',
        items: [{ uri: PasteInputTempFiles.getFileUri(tempPath), mimeType: imageMime || 'application/octet-stream', name: fileName, size: data.length }],
      };
    }
  }

  return null;
}

/**
 * URL resolution helpers
 */

function resolveToPathUrl(url: NSURL): NSURL | null {
  if (!url) return null;

  const path = url.path;
  if (path && !path.startsWith('/.file/')) {
    return url;
  }

  // filePathURL resolves file reference URLs to path-based file URLs
  const pathUrl = url.filePathURL;
  if (pathUrl && pathUrl.path && !pathUrl.path.startsWith('/.file/')) {
    return pathUrl;
  }

  return null;
}

function resolveBookmarkData(data: NSData): NSURL | null {
  try {
    const isStale = new interop.Reference<boolean>();
    const resolved = NSURL.URLByResolvingBookmarkDataOptionsRelativeToURLBookmarkDataIsStaleError(data, NSURLBookmarkResolutionOptions.WithoutUI, null, isStale);
    if (resolved && resolved.path && !resolved.path.startsWith('/.file/')) {
      return resolved;
    }
  } catch (_e) {
    // Not valid bookmark data or resolution failed
  }
  return null;
}

/**
 * Extract a usable file URL from the pasteboard.
 * Tries multiple strategies: direct URL, bookmark/alias resolution, URL data decoding.
 * Note: macOS Finder file reference URLs (file:///.file/id=...) cannot be resolved
 * on the iOS Simulator — this is a known simulator limitation. On real devices,
 * file URLs from the Files app or other iOS sources use resolvable paths.
 */
function extractFileUrl(clipboard: UIPasteboard): NSURL | null {
  // Try clipboard.URL first
  const directUrl = clipboard.URL;
  if (directUrl && directUrl.fileURL) {
    const resolved = resolveToPathUrl(directUrl);
    if (resolved) return resolved;
  }

  const itemCount = clipboard.items?.count || 0;
  if (itemCount === 0) return null;

  const itemDict = clipboard.items.objectAtIndex(0) as NSDictionary<string, any>;

  // Try com.apple.finder.noderef as bookmark/alias data (contains embedded file path)
  const noderefData = itemDict.objectForKey('com.apple.finder.noderef') as NSData;
  if (noderefData) {
    const resolved = resolveBookmarkData(noderefData);
    if (resolved) return resolved;
  }

  // Try public.file-url data
  const fileUrlData = itemDict.objectForKey('public.file-url') as NSData;
  if (fileUrlData) {
    // Try as bookmark data first (may contain embedded path)
    const bookmarkResolved = resolveBookmarkData(fileUrlData);
    if (bookmarkResolved) return bookmarkResolved;

    // Decode as URL data representation
    try {
      const url = NSURL.URLWithDataRepresentationRelativeToURL(fileUrlData, null);
      if (url) {
        const resolved = resolveToPathUrl(url);
        if (resolved) return resolved;
        // Return unresolved URL — processFileUrl can try data-based loading
        return url;
      }
    } catch (_e) {
      // ignore
    }
  }

  return null;
}

function extractPasteboardContent(clipboard: UIPasteboard, accept: string): PastePayload | null {
  const wantsImages = acceptsImages(accept);
  const wantsText = acceptsText(accept);
  const wantsFiles = acceptsFiles(accept);

  // 1. GIF check first (preserves animation, must come before image check)
  if (wantsImages) {
    const gifData = clipboard.dataForPasteboardType('com.compuserve.gif');
    if (gifData) {
      const filePath = PasteInputTempFiles.generateFilePath('gif');
      gifData.writeToFileAtomically(filePath, true);

      const imageItem: PasteImageItem = {
        uri: PasteInputTempFiles.getFileUri(filePath),
        mimeType: 'image/gif',
        animated: true,
      };

      const items: PasteImageItem[] = [imageItem];
      const itemCount = clipboard.items?.count || 0;
      for (let i = 1; i < itemCount; i++) {
        const itemDict = clipboard.items.objectAtIndex(i) as NSDictionary<string, any>;
        const extraGifData = itemDict.objectForKey('com.compuserve.gif') as NSData;
        if (extraGifData) {
          const extraPath = PasteInputTempFiles.generateFilePath('gif');
          extraGifData.writeToFileAtomically(extraPath, true);
          items.push({
            uri: PasteInputTempFiles.getFileUri(extraPath),
            mimeType: 'image/gif',
            animated: true,
          });
        }
      }
      return { type: 'images', items };
    }
  }

  // 2. Static images from pasteboard image data
  if (wantsImages && clipboard.hasImages) {
    const images = clipboard.images;
    if (images && images.count > 0) {
      const items: PasteImageItem[] = [];
      for (let i = 0; i < images.count; i++) {
        const image = images.objectAtIndex(i);
        const item = writeImageToTemp(image);
        if (item) {
          items.push(item);
        }
      }
      if (items.length > 0) {
        return { type: 'images', items };
      }
    }
  }

  // 3. File URLs — e.g. files copied from Files app or Finder
  if (wantsImages || wantsFiles) {
    const fileUrl = extractFileUrl(clipboard);
    if (fileUrl) {
      const result = processFileUrl(fileUrl, accept, clipboard.string);
      if (result) return result;
    }
  }

  // 4. Files/documents from pasteboard UTI types
  if (wantsFiles) {
    const fileTypes = ['com.adobe.pdf', 'public.rtf', 'public.html'];
    for (const uti of fileTypes) {
      const mime = utiToMime[uti] || 'application/octet-stream';
      if (mimeMatchesAccept(mime, accept)) {
        const data = clipboard.dataForPasteboardType(uti);
        if (data) {
          const ext = mimeToExtension(mime);
          const filePath = PasteInputTempFiles.generateFilePath(ext);
          data.writeToFileAtomically(filePath, true);

          const fileItem: PasteFileItem = {
            uri: PasteInputTempFiles.getFileUri(filePath),
            mimeType: mime,
            size: data.length,
          };
          return { type: 'files', items: [fileItem] };
        }
      }
    }
  }

  // 5. Text
  if (wantsText && clipboard.hasStrings) {
    const text = clipboard.string;
    if (text) {
      return { type: 'text', value: text };
    }
  }

  // 6. Unsupported - gather available types from pasteboard items
  const availableTypes: string[] = [];
  const itemCount = clipboard.items?.count || 0;
  for (let i = 0; i < itemCount; i++) {
    const itemDict = clipboard.items.objectAtIndex(i) as NSDictionary<string, any>;
    const keys = itemDict.allKeys;
    for (let k = 0; k < keys.count; k++) {
      const uti = keys.objectAtIndex(k) as string;
      const mime = utiToMime[uti] || uti;
      if (availableTypes.indexOf(mime) === -1) {
        availableTypes.push(mime);
      }
    }
  }
  if (availableTypes.length > 0) {
    return { type: 'unsupported', availableTypes };
  }

  return null;
}

/**
 * Image writing helpers
 */

function writeImageToTemp(image: UIImage): PasteImageItem | null {
  if (!image) return null;

  const hasAlpha = hasAlphaChannel(image);
  let data: NSData;
  let mimeType: string;
  let ext: string;

  if (hasAlpha) {
    data = UIImagePNGRepresentation(image);
    mimeType = 'image/png';
    ext = 'png';
  } else {
    data = UIImageJPEGRepresentation(image, 0.8);
    mimeType = 'image/jpeg';
    ext = 'jpg';
  }

  if (!data) return null;

  const filePath = PasteInputTempFiles.generateFilePath(ext);
  data.writeToFileAtomically(filePath, true);

  return {
    uri: PasteInputTempFiles.getFileUri(filePath),
    mimeType,
    width: image.size.width,
    height: image.size.height,
    animated: false,
  };
}

function hasAlphaChannel(image: UIImage): boolean {
  if (!image.CGImage) return false;
  const alphaInfo = CGImageGetAlphaInfo(image.CGImage);
  return alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNone && alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNoneSkipLast && alphaInfo !== CGImageAlphaInfo.kCGImageAlphaNoneSkipFirst;
}

function mimeToExtension(mime: string): string {
  const map: Record<string, string> = {
    'application/pdf': 'pdf',
    'application/rtf': 'rtf',
    'text/html': 'html',
    'text/plain': 'txt',
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/gif': 'gif',
    'image/heic': 'heic',
  };
  return map[mime] || 'bin';
}

/**
 * PasteInput
 */

export class PasteInput extends PasteInputBase {
  nativeViewProtected: NSPasteTextView;
  private _delegate: NSPasteTextViewDelegate;
  private _placeholderLabel: UILabel;
  private _dropInteraction: UIDropInteraction;
  private _dropDelegate: NSPasteDropDelegate;

  createNativeView(): UITextView {
    const view = NSPasteTextView.initWithOwner(new WeakRef(this));
    view.font = UIFont.systemFontOfSize(16);
    view.textContainerInset = UIEdgeInsetsZero;
    view.textContainer.lineFragmentPadding = 0;
    return view;
  }

  initNativeView(): void {
    super.initNativeView();
    this._delegate = NSPasteTextViewDelegate.initWithOwner(new WeakRef(this));
    this.nativeViewProtected.delegate = this._delegate;
    this._setupPlaceholder();
  }

  disposeNativeView(): void {
    this._removeDragDrop();
    this.nativeViewProtected.delegate = null;
    this._delegate = null;
    this._placeholderLabel = null;
    super.disposeNativeView();
  }

  /**
   * Property handlers
   */

  [hintProperty.setNative](value: string) {
    if (this._placeholderLabel) {
      this._placeholderLabel.text = value;
    }
  }

  [editableProperty.setNative](value: boolean) {
    this.nativeViewProtected.editable = value;
  }

  [maxLengthProperty.setNative](_value: number) {
    // Enforced via delegate textViewShouldChangeTextInRangeReplacementText
  }

  [enableDragDropProperty.setNative](value: boolean) {
    if (value) {
      this._setupDragDrop();
    } else {
      this._removeDragDrop();
    }
  }

  /**
   * Public methods
   */

  getText(): string {
    return this.nativeViewProtected?.text || '';
  }

  setText(value: string): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.text = value;
      this._updatePlaceholderVisibility();
    }
  }

  /**
   * Placeholder
   */

  private _setupPlaceholder(): void {
    const label = UILabel.alloc().init();
    label.font = this.nativeViewProtected.font;
    label.textColor = UIColor.placeholderTextColor;
    label.numberOfLines = 0;
    label.translatesAutoresizingMaskIntoConstraints = false;
    this.nativeViewProtected.addSubview(label);

    const insets = this.nativeViewProtected.textContainerInset;
    const padding = this.nativeViewProtected.textContainer.lineFragmentPadding;

    NSLayoutConstraint.activateConstraints(NSArray.arrayWithArray([label.topAnchor.constraintEqualToAnchorConstant(this.nativeViewProtected.topAnchor, insets.top), label.leadingAnchor.constraintEqualToAnchorConstant(this.nativeViewProtected.leadingAnchor, insets.left + padding), label.trailingAnchor.constraintEqualToAnchorConstant(this.nativeViewProtected.trailingAnchor, -(insets.right + padding))]));

    this._placeholderLabel = label;
    this._updatePlaceholderVisibility();
  }

  _updatePlaceholderVisibility(): void {
    if (this._placeholderLabel) {
      this._placeholderLabel.hidden = this.nativeViewProtected.text?.length > 0;
    }
  }

  /**
   * Drag & drop
   */

  private _setupDragDrop(): void {
    if (this._dropInteraction) return;
    this._dropDelegate = NSPasteDropDelegate.initWithOwner(new WeakRef(this));
    this._dropInteraction = UIDropInteraction.alloc().initWithDelegate(this._dropDelegate);
    this.nativeViewProtected.addInteraction(this._dropInteraction);
  }

  private _removeDragDrop(): void {
    if (this._dropInteraction) {
      this.nativeViewProtected.removeInteraction(this._dropInteraction);
      this._dropInteraction = null;
      this._dropDelegate = null;
    }
  }
}
