import { PasteInputBase, PastePayload, PasteImageItem, PasteFileItem, PasteInputTempFiles, mimeMatchesAccept, hintProperty, editableProperty, maxLengthProperty, enableDragDropProperty } from './common';

/**
 * Content processing helpers
 */

function processClipDataItem(item: android.content.ClipData.Item, context: android.content.Context, accept: string): { images: PasteImageItem[]; files: PasteFileItem[]; text: string | null } {
  const result = { images: [] as PasteImageItem[], files: [] as PasteFileItem[], text: null as string | null };
  const contentResolver = context.getContentResolver();

  const uri = item.getUri();
  if (uri) {
    const mimeType = contentResolver.getType(uri) || 'application/octet-stream';

    // GIF - copy raw bytes to preserve animation
    if (mimeType === 'image/gif' && mimeMatchesAccept('image/gif', accept)) {
      const filePath = copyUriToTempFile(uri, contentResolver, 'gif');
      if (filePath) {
        result.images.push({
          uri: PasteInputTempFiles.getFileUri(filePath),
          mimeType: 'image/gif',
          animated: true,
        });
      }
      return result;
    }

    // Static images - decode and compress
    if (mimeType.startsWith('image/') && mimeMatchesAccept(mimeType, accept)) {
      const imageItem = decodeImageUri(uri, contentResolver, mimeType);
      if (imageItem) {
        result.images.push(imageItem);
      }
      return result;
    }

    // Files/documents
    if (mimeMatchesAccept(mimeType, accept)) {
      const fileItem = copyFileUri(uri, contentResolver, context, mimeType);
      if (fileItem) {
        result.files.push(fileItem);
      }
      return result;
    }
  }

  // Text
  const text = item.getText();
  if (text) {
    const textStr = text.toString();
    if (textStr && mimeMatchesAccept('text/plain', accept)) {
      result.text = textStr;
    }
  } else {
    // Try coercing to text
    const coerced = item.coerceToText(context);
    if (coerced) {
      const coercedStr = coerced.toString();
      if (coercedStr && mimeMatchesAccept('text/plain', accept)) {
        result.text = coercedStr;
      }
    }
  }

  return result;
}

function decodeImageUri(uri: android.net.Uri, contentResolver: android.content.ContentResolver, mimeType: string): PasteImageItem | null {
  let inputStream: java.io.InputStream = null;
  try {
    inputStream = contentResolver.openInputStream(uri);
    if (!inputStream) return null;

    const bitmap = android.graphics.BitmapFactory.decodeStream(inputStream);
    if (!bitmap) return null;

    const width = bitmap.getWidth();
    const height = bitmap.getHeight();

    // Write as JPEG 80% (matching expo-paste-input)
    const filePath = PasteInputTempFiles.generateFilePath('jpg');
    const file = new java.io.File(filePath);
    const outputStream = new java.io.FileOutputStream(file);
    bitmap.compress(android.graphics.Bitmap.CompressFormat.JPEG, 80, outputStream);
    outputStream.flush();
    outputStream.close();
    bitmap.recycle();

    return {
      uri: PasteInputTempFiles.getFileUri(filePath),
      mimeType: mimeType.startsWith('image/') ? mimeType : 'image/jpeg',
      width,
      height,
      animated: false,
    };
  } catch (e) {
    return null;
  } finally {
    if (inputStream) {
      try {
        inputStream.close();
      } catch (_e) {
        // ignore
      }
    }
  }
}

function copyUriToTempFile(uri: android.net.Uri, contentResolver: android.content.ContentResolver, extension: string): string | null {
  let inputStream: java.io.InputStream = null;
  let outputStream: java.io.FileOutputStream = null;
  try {
    inputStream = contentResolver.openInputStream(uri);
    if (!inputStream) return null;

    const filePath = PasteInputTempFiles.generateFilePath(extension);
    const file = new java.io.File(filePath);
    outputStream = new java.io.FileOutputStream(file);

    const buffer = Array.create('byte', 8192);
    let bytesRead: number;
    while ((bytesRead = inputStream.read(buffer)) !== -1) {
      outputStream.write(buffer, 0, bytesRead);
    }
    outputStream.flush();
    return filePath;
  } catch (e) {
    return null;
  } finally {
    if (inputStream) {
      try {
        inputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
    if (outputStream) {
      try {
        outputStream.close();
      } catch (_e) {
        /* ignore */
      }
    }
  }
}

function copyFileUri(uri: android.net.Uri, contentResolver: android.content.ContentResolver, _context: android.content.Context, mimeType: string): PasteFileItem | null {
  const ext = mimeToExtension(mimeType);
  const filePath = copyUriToTempFile(uri, contentResolver, ext);
  if (!filePath) return null;

  let name: string | undefined;
  let size: number | undefined;

  // Query for display name and size
  let cursor: android.database.Cursor = null;
  try {
    cursor = contentResolver.query(uri, null, null, null, null);
    if (cursor && cursor.moveToFirst()) {
      const nameIndex = cursor.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME);
      if (nameIndex >= 0) {
        name = cursor.getString(nameIndex);
      }
      const sizeIndex = cursor.getColumnIndex(android.provider.OpenableColumns.SIZE);
      if (sizeIndex >= 0 && !cursor.isNull(sizeIndex)) {
        size = cursor.getLong(sizeIndex);
      }
    }
  } catch (_e) {
    // ignore query errors
  } finally {
    if (cursor) {
      cursor.close();
    }
  }

  return {
    uri: PasteInputTempFiles.getFileUri(filePath),
    mimeType,
    name,
    size,
  };
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
    'image/webp': 'webp',
  };
  return map[mime] || 'bin';
}

function buildPayloadFromClipData(clip: android.content.ClipData, context: android.content.Context, accept: string): PastePayload | null {
  const allImages: PasteImageItem[] = [];
  const allFiles: PasteFileItem[] = [];
  let textValue: string | null = null;

  const itemCount = clip.getItemCount();
  for (let i = 0; i < itemCount; i++) {
    const item = clip.getItemAt(i);
    const processed = processClipDataItem(item, context, accept);
    allImages.push(...processed.images);
    allFiles.push(...processed.files);
    if (processed.text && !textValue) {
      textValue = processed.text;
    }
  }

  if (allImages.length > 0) {
    return { type: 'images', items: allImages };
  }
  if (allFiles.length > 0) {
    return { type: 'files', items: allFiles };
  }
  if (textValue) {
    return { type: 'text', value: textValue };
  }

  // Gather available MIME types for unsupported payload
  const availableTypes: string[] = [];
  const desc = clip.getDescription();
  if (desc) {
    const mimeCount = desc.getMimeTypeCount();
    for (let i = 0; i < mimeCount; i++) {
      availableTypes.push(desc.getMimeType(i));
    }
  }
  if (availableTypes.length > 0) {
    return { type: 'unsupported', availableTypes };
  }

  return null;
}

/**
 * PasteInput
 */

export class PasteInput extends PasteInputBase {
  nativeViewProtected: androidx.appcompat.widget.AppCompatEditText;

  createNativeView(): android.widget.EditText {
    const editText = new androidx.appcompat.widget.AppCompatEditText(this._context);

    if (android.os.Build.VERSION.SDK_INT >= 31) {
      this._setupReceiveContentListener(editText);
    } else {
      this._setupLegacyPasteInterception(editText);
    }

    return editText;
  }

  initNativeView(): void {
    super.initNativeView();
  }

  disposeNativeView(): void {
    super.disposeNativeView();
  }

  /**
   * API 31+ : OnReceiveContentListener
   */

  private _setupReceiveContentListener(editText: androidx.appcompat.widget.AppCompatEditText): void {
    const ownerRef = new WeakRef(this);
    const mimeTypes = ['image/*', 'text/*', 'application/pdf', 'application/*', '*/*'];

    const listener = new androidx.core.view.OnReceiveContentListener({
      onReceiveContent(view: android.view.View, payload: androidx.core.view.ContentInfoCompat): androidx.core.view.ContentInfoCompat {
        const owner = ownerRef.deref();
        if (!owner) return payload;

        const clip = payload.getClip();
        if (!clip || clip.getItemCount() === 0) return payload;

        const accept = owner.accept || 'all';
        const source = payload.getSource();
        const pastePayload = buildPayloadFromClipData(clip, view.getContext(), accept);

        if (pastePayload) {
          if (pastePayload.type === 'text') {
            // Let text paste through by returning the payload to the system
            owner.notifyPaste(pastePayload);
            return payload;
          }
          // For images/files, we handle it and return null (consumed)
          if (source === androidx.core.view.ContentInfoCompat.SOURCE_DRAG_AND_DROP) {
            owner.notifyDrop(pastePayload);
          } else {
            owner.notifyPaste(pastePayload);
          }
          return null; // consumed
        }

        return payload; // unhandled, pass through
      },
    });

    androidx.core.view.ViewCompat.setOnReceiveContentListener(editText, mimeTypes, listener);
  }

  /**
   * Pre-API 31 fallback
   */

  private _setupLegacyPasteInterception(editText: androidx.appcompat.widget.AppCompatEditText): void {
    const ownerRef = new WeakRef(this);

    editText.onTextContextMenuItem = (id: number): boolean => {
      const result = (androidx.appcompat.widget.AppCompatEditText.prototype as any).onTextContextMenuItem.call(editText, id);

      if (id === android.R.id.paste) {
        const owner = ownerRef.deref();
        if (owner) {
          const clipboard = owner._context.getSystemService(android.content.Context.CLIPBOARD_SERVICE) as android.content.ClipboardManager;

          if (clipboard?.hasPrimaryClip()) {
            const clip = clipboard.getPrimaryClip();
            const accept = owner.accept || 'all';
            const payload = buildPayloadFromClipData(clip, owner._context, accept);

            if (payload) {
              owner.notifyPaste(payload);
            }
          }
        }
      }

      return result;
    };
  }

  /**
   * Property handlers
   */

  [hintProperty.setNative](value: string) {
    this.nativeViewProtected.setHint(value);
  }

  [editableProperty.setNative](value: boolean) {
    this.nativeViewProtected.setFocusable(value);
    this.nativeViewProtected.setFocusableInTouchMode(value);
  }

  [maxLengthProperty.setNative](value: number) {
    if (value > 0) {
      this.nativeViewProtected.setFilters([new android.text.InputFilter.LengthFilter(value)]);
    } else {
      this.nativeViewProtected.setFilters([]);
    }
  }

  [enableDragDropProperty.setNative](_value: boolean) {
    // On API 31+, OnReceiveContentListener already handles drag & drop
    // On older APIs, drag & drop support is limited
  }

  /**
   * Public methods
   */

  getText(): string {
    return this.nativeViewProtected?.getText()?.toString() || '';
  }

  setText(value: string): void {
    if (this.nativeViewProtected) {
      this.nativeViewProtected.setText(value);
    }
  }
}
