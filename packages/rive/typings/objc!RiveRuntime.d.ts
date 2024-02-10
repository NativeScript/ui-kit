declare class CDNFileAssetLoader extends RiveFileAssetLoader {
  static alloc(): CDNFileAssetLoader; // inherited from NSObject

  static new(): CDNFileAssetLoader; // inherited from NSObject
}

declare class CustomFileAssetLoader extends RiveFileAssetLoader {
  static alloc(): CustomFileAssetLoader; // inherited from NSObject

  static new(): CustomFileAssetLoader; // inherited from NSObject

  loadAsset: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean;

  constructor(o: { loader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  initWithLoader(loader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;
}

declare class FPSCounterView extends UILabel {
  static alloc(): FPSCounterView; // inherited from NSObject

  static appearance(): FPSCounterView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): FPSCounterView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): FPSCounterView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): FPSCounterView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): FPSCounterView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): FPSCounterView; // inherited from UIAppearance

  static new(): FPSCounterView; // inherited from NSObject
}

declare class FallbackFileAssetLoader extends RiveFileAssetLoader {
  static alloc(): FallbackFileAssetLoader; // inherited from NSObject

  static new(): FallbackFileAssetLoader; // inherited from NSObject

  addLoader(loader: RiveFileAssetLoader): void;
}

declare class RenderContextManager extends NSObject {
  static alloc(): RenderContextManager; // inherited from NSObject

  static new(): RenderContextManager; // inherited from NSObject

  static shared(): RenderContextManager;

  defaultRenderer: RendererType;

  getCGFactory(): RiveFactory;

  getDefaultFactory(): RiveFactory;

  getRiveRendererFactory(): RiveFactory;

  getSkiaFactory(): RiveFactory;
}

declare const enum RendererType {
  skiaRenderer = 0,

  riveRenderer = 1,

  cgRenderer = 2,
}

declare const enum RiveAlignment {
  topLeft = 0,

  topCenter = 1,

  topRight = 2,

  centerLeft = 3,

  center = 4,

  centerRight = 5,

  bottomLeft = 6,

  bottomCenter = 7,

  bottomRight = 8,
}

declare class RiveAnimationState extends RiveLayerState {
  static alloc(): RiveAnimationState; // inherited from NSObject

  static new(): RiveAnimationState; // inherited from NSObject
}

declare class RiveAnyState extends RiveLayerState {
  static alloc(): RiveAnyState; // inherited from NSObject

  static new(): RiveAnyState; // inherited from NSObject
}

declare class RiveArtboard extends NSObject {
  static alloc(): RiveArtboard; // inherited from NSObject

  static new(): RiveArtboard; // inherited from NSObject

  advanceBy(elapsedSeconds: number): void;

  animationCount(): number;

  animationFromIndexError(index: number): RiveLinearAnimationInstance;

  animationFromNameError(name: string): RiveLinearAnimationInstance;

  animationNames(): NSArray<string>;

  bounds(): CGRect;

  defaultStateMachine(): RiveStateMachineInstance;

  draw(renderer: RiveRenderer): void;

  name(): string;

  stateMachineCount(): number;

  stateMachineFromIndexError(index: number): RiveStateMachineInstance;

  stateMachineFromNameError(name: string): RiveStateMachineInstance;

  stateMachineNames(): NSArray<string>;

  textRun(name: string): RiveTextValueRun;
}

declare const enum RiveDirection {
  backwards = 0,

  forwards = 1,

  autoDirection = 2,
}

declare class RiveEntryState extends RiveLayerState {
  static alloc(): RiveEntryState; // inherited from NSObject

  static new(): RiveEntryState; // inherited from NSObject
}

declare const enum RiveErrorCode {
  NoArtboardsFound = 100,

  NoArtboardFound = 101,

  NoAnimations = 200,

  NoAnimationFound = 201,

  NoStateMachines = 300,

  NoStateMachineFound = 301,

  NoStateMachineInputFound = 400,

  UnknownStateMachineInput = 401,

  NoStateChangeFound = 402,

  UnsupportedVersion = 500,

  MalformedFile = 600,

  UnknownError = 700,
}

declare var RiveErrorDomain: string;

declare class RiveEvent extends NSObject {
  static alloc(): RiveEvent; // inherited from NSObject

  static new(): RiveEvent; // inherited from NSObject

  delay(): number;

  name(): string;

  properties(): NSDictionary<string, any>;

  type(): number;
}

declare class RiveEventReport extends NSObject {
  static alloc(): RiveEventReport; // inherited from NSObject

  static new(): RiveEventReport; // inherited from NSObject

  secondsDelay(): number;
}

declare class RiveExitState extends RiveLayerState {
  static alloc(): RiveExitState; // inherited from NSObject

  static new(): RiveExitState; // inherited from NSObject
}

declare class RiveFactory extends NSObject {
  static alloc(): RiveFactory; // inherited from NSObject

  static new(): RiveFactory; // inherited from NSObject

  decodeFont(data: NSData): RiveFont;

  decodeImage(data: NSData): RiveRenderImage;
}

declare class RiveFile extends NSObject {
  static alloc(): RiveFile; // inherited from NSObject

  static new(): RiveFile; // inherited from NSObject

  delegate: any;

  isLoaded: boolean;

  static readonly majorVersion: number;

  static readonly minorVersion: number;

  constructor(o: { byteArray: NSArray<any> | any[]; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  constructor(o: { byteArray: NSArray<any> | any[]; loadCdn: boolean });

  constructor(o: { bytes: string | interop.Pointer | interop.Reference<any>; byteLength: number; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  constructor(o: { bytes: string | interop.Pointer | interop.Reference<any>; byteLength: number; loadCdn: boolean });

  constructor(o: { data: NSData; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  constructor(o: { data: NSData; loadCdn: boolean });

  constructor(o: { httpUrl: string; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean; withDelegate: RiveFileDelegate });

  constructor(o: { httpUrl: string; loadCdn: boolean; withDelegate: RiveFileDelegate });

  constructor(o: { resource: string; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  constructor(o: { resource: string; loadCdn: boolean });

  constructor(o: { resource: string; withExtension: string; loadCdn: boolean; customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean });

  constructor(o: { resource: string; withExtension: string; loadCdn: boolean });

  artboard(): RiveArtboard;

  artboardCount(): number;

  artboardFromIndexError(index: number): RiveArtboard;

  artboardFromNameError(name: string): RiveArtboard;

  artboardNames(): NSArray<string>;

  initWithByteArrayLoadCdnCustomAssetLoaderError(bytes: NSArray<any> | any[], cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;

  initWithByteArrayLoadCdnError(bytes: NSArray<any> | any[], cdn: boolean): this;

  initWithBytesByteLengthLoadCdnCustomAssetLoaderError(bytes: string | interop.Pointer | interop.Reference<any>, length: number, cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;

  initWithBytesByteLengthLoadCdnError(bytes: string | interop.Pointer | interop.Reference<any>, length: number, cdn: boolean): this;

  initWithDataLoadCdnCustomAssetLoaderError(bytes: NSData, cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;

  initWithDataLoadCdnError(bytes: NSData, cdn: boolean): this;

  initWithHttpUrlLoadCdnCustomAssetLoaderWithDelegate(url: string, cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean, delegate: RiveFileDelegate): this;

  initWithHttpUrlLoadCdnWithDelegate(url: string, cdn: boolean, delegate: RiveFileDelegate): this;

  initWithResourceLoadCdnCustomAssetLoaderError(resourceName: string, cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;

  initWithResourceLoadCdnError(resourceName: string, cdn: boolean): this;

  initWithResourceWithExtensionLoadCdnCustomAssetLoaderError(resourceName: string, extension: string, cdn: boolean, customAssetLoader: (p1: RiveFileAsset, p2: NSData, p3: RiveFactory) => boolean): this;

  initWithResourceWithExtensionLoadCdnError(resourceName: string, extension: string, cdn: boolean): this;
}

declare class RiveFileAsset extends NSObject {
  static alloc(): RiveFileAsset; // inherited from NSObject

  static new(): RiveFileAsset; // inherited from NSObject

  cdnBaseUrl(): string;

  cdnUuid(): string;

  fileExtension(): string;

  name(): string;

  uniqueFilename(): string;
}

declare class RiveFileAssetLoader extends NSObject {
  static alloc(): RiveFileAssetLoader; // inherited from NSObject

  static new(): RiveFileAssetLoader; // inherited from NSObject

  loadContentsWithAssetAndDataAndFactory(asset: RiveFileAsset, data: NSData, factory: RiveFactory): boolean;
}

interface RiveFileDelegate extends NSObjectProtocol {
  riveFileDidLoadError(riveFile: RiveFile): boolean;
}
declare var RiveFileDelegate: {
  prototype: RiveFileDelegate;
};

declare const enum RiveFit {
  fill = 0,

  contain = 1,

  cover = 2,

  fitHeight = 3,

  fitWidth = 4,

  scaleDown = 5,

  noFit = 6,
}

declare class RiveFont extends NSObject {
  static alloc(): RiveFont; // inherited from NSObject

  static new(): RiveFont; // inherited from NSObject
}

declare class RiveFontAsset extends RiveFileAsset {
  static alloc(): RiveFontAsset; // inherited from NSObject

  static new(): RiveFontAsset; // inherited from NSObject

  font(font: RiveFont): void;
}

declare class RiveGeneralEvent extends RiveEvent {
  static alloc(): RiveGeneralEvent; // inherited from NSObject

  static new(): RiveGeneralEvent; // inherited from NSObject
}

declare class RiveImageAsset extends RiveFileAsset {
  static alloc(): RiveImageAsset; // inherited from NSObject

  static new(): RiveImageAsset; // inherited from NSObject

  renderImage(image: RiveRenderImage): void;
}

declare class RiveLayerState extends NSObject {
  static alloc(): RiveLayerState; // inherited from NSObject

  static new(): RiveLayerState; // inherited from NSObject

  isAnimationState(): boolean;

  isAnyState(): boolean;

  isEntryState(): boolean;

  isExitState(): boolean;

  name(): string;

  rive_layer_state(): interop.Pointer | interop.Reference<any>;
}

declare class RiveLinearAnimationInstance extends NSObject {
  static alloc(): RiveLinearAnimationInstance; // inherited from NSObject

  static new(): RiveLinearAnimationInstance; // inherited from NSObject

  advanceBy(elapsedSeconds: number): boolean;

  didLoop(): boolean;

  direction(): number;

  duration(): number;

  effectiveDuration(): number;

  effectiveDurationInSeconds(): number;

  endTime(): number;

  fps(): number;

  hasEnded(): boolean;

  loop(): number;

  name(): string;

  setTime(time: number): void;

  time(): number;

  workEnd(): number;

  workStart(): number;
}

declare const enum RiveLoop {
  oneShot = 0,

  loop = 1,

  pingPong = 2,

  autoLoop = 3,
}

declare class RiveOpenUrlEvent extends RiveEvent {
  static alloc(): RiveOpenUrlEvent; // inherited from NSObject

  static new(): RiveOpenUrlEvent; // inherited from NSObject

  target(): string;

  url(): string;
}

declare class RiveRenderImage extends NSObject {
  static alloc(): RiveRenderImage; // inherited from NSObject

  static new(): RiveRenderImage; // inherited from NSObject
}

declare class RiveRenderer extends NSObject {
  static alloc(): RiveRenderer; // inherited from NSObject

  static new(): RiveRenderer; // inherited from NSObject

  constructor(o: { context: any });

  alignWithRectWithContentRectWithAlignmentWithFit(rect: CGRect, contentRect: CGRect, alignment: RiveAlignment, fit: RiveFit): void;

  initWithContext(context: any): this;
}

declare class RiveRendererView extends MTKView {
  static alloc(): RiveRendererView; // inherited from NSObject

  static appearance(): RiveRendererView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): RiveRendererView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): RiveRendererView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): RiveRendererView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): RiveRendererView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): RiveRendererView; // inherited from UIAppearance

  static new(): RiveRendererView; // inherited from NSObject

  alignWithRectContentRectAlignmentFit(rect: CGRect, contentRect: CGRect, alignment: RiveAlignment, fit: RiveFit): void;

  artboardLocationFromTouchLocationInArtboardFitAlignment(touchLocation: CGPoint, artboardRect: CGRect, fit: RiveFit, alignment: RiveAlignment): CGPoint;

  drawRiveSize(rect: CGRect, size: CGSize): void;

  drawWithArtboard(artboard: RiveArtboard): void;

  isPaused(): boolean;

  restore(): void;

  save(): void;

  transformXyYxYyTxTy(xx: number, xy: number, yx: number, yy: number, tx: number, ty: number): void;
}

declare var RiveRuntimeVersionNumber: number;

declare var RiveRuntimeVersionString: interop.Reference<number>;

declare class RiveSMIBool extends RiveSMIInput {
  static alloc(): RiveSMIBool; // inherited from NSObject

  static new(): RiveSMIBool; // inherited from NSObject

  setValue(newValue: boolean): void;

  value(): boolean;
}

declare class RiveSMIInput extends NSObject {
  static alloc(): RiveSMIInput; // inherited from NSObject

  static new(): RiveSMIInput; // inherited from NSObject

  isBoolean(): boolean;

  isNumber(): boolean;

  isTrigger(): boolean;

  name(): string;
}

declare class RiveSMINumber extends RiveSMIInput {
  static alloc(): RiveSMINumber; // inherited from NSObject

  static new(): RiveSMINumber; // inherited from NSObject

  setValue(newValue: number): void;

  value(): number;
}

declare class RiveSMITrigger extends RiveSMIInput {
  static alloc(): RiveSMITrigger; // inherited from NSObject

  static new(): RiveSMITrigger; // inherited from NSObject

  fire(): void;
}

interface RiveStateMachineDelegate {
  onRiveEventReceivedOnRiveEvent?(riveEvent: RiveEvent): void;

  stateMachineDidChangeState?(stateMachine: RiveStateMachineInstance, stateName: string): void;

  stateMachineReceivedInput?(stateMachine: RiveStateMachineInstance, input: StateMachineInput): void;

  touchBeganOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

  touchCancelledOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

  touchEndedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;

  touchMovedOnArtboardAtLocation?(artboard: RiveArtboard, location: CGPoint): void;
}
declare var RiveStateMachineDelegate: {
  prototype: RiveStateMachineDelegate;
};

declare class RiveStateMachineInstance extends NSObject {
  static alloc(): RiveStateMachineInstance; // inherited from NSObject

  static new(): RiveStateMachineInstance; // inherited from NSObject

  advanceBy(elapsedSeconds: number): boolean;

  getBool(name: string): RiveSMIBool;

  getNumber(name: string): RiveSMINumber;

  getTrigger(name: string): RiveSMITrigger;

  inputCount(): number;

  inputFromIndexError(index: number): RiveSMIInput;

  inputFromNameError(name: string): RiveSMIInput;

  inputNames(): NSArray<string>;

  layerCount(): number;

  name(): string;

  reportedEventAt(index: number): RiveEvent;

  reportedEventCount(): number;

  stateChangedCount(): number;

  stateChangedFromIndexError(index: number): RiveLayerState;

  stateChanges(): NSArray<string>;

  touchBeganAtLocation(touchLocation: CGPoint): void;

  touchCancelledAtLocation(touchLocation: CGPoint): void;

  touchEndedAtLocation(touchLocation: CGPoint): void;

  touchMovedAtLocation(touchLocation: CGPoint): void;
}

declare class RiveTextValueRun extends NSObject {
  static alloc(): RiveTextValueRun; // inherited from NSObject

  static new(): RiveTextValueRun; // inherited from NSObject

  setText(newValue: string): void;

  text(): string;
}

declare class RiveUnknownState extends RiveLayerState {
  static alloc(): RiveUnknownState; // inherited from NSObject

  static new(): RiveUnknownState; // inherited from NSObject
}

declare class RiveView extends RiveRendererView {
  static alloc(): RiveView; // inherited from NSObject

  static appearance(): RiveView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): RiveView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): RiveView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): RiveView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): RiveView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): RiveView; // inherited from UIAppearance

  static new(): RiveView; // inherited from NSObject

  advanceWithDelta(delta: number): void;
}

declare class RiveViewModel extends NSObject implements RiveFileDelegate, RiveStateMachineDelegate {
  static alloc(): RiveViewModel; // inherited from NSObject

  static new(): RiveViewModel; // inherited from NSObject

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  class(): typeof NSObject;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  onRiveEventReceivedOnRiveEvent(riveEvent: RiveEvent): void;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  riveFileDidLoadError(riveFile: RiveFile): boolean;

  self(): this;

  setView(view: RiveView): void;

  stateMachineDidChangeState(stateMachine: RiveStateMachineInstance, stateName: string): void;

  stateMachineReceivedInput(stateMachine: RiveStateMachineInstance, input: StateMachineInput): void;

  touchBeganOnArtboardAtLocation(artboard: RiveArtboard, location: CGPoint): void;

  touchCancelledOnArtboardAtLocation(artboard: RiveArtboard, location: CGPoint): void;

  touchEndedOnArtboardAtLocation(artboard: RiveArtboard, location: CGPoint): void;

  touchMovedOnArtboardAtLocation(artboard: RiveArtboard, location: CGPoint): void;

  updateWithView(view: RiveView): void;
}

declare class StateMachineInput extends NSObject {
  static alloc(): StateMachineInput; // inherited from NSObject

  static new(): StateMachineInput; // inherited from NSObject
}

declare const enum StateMachineInputType {
  Trigger = 0,

  Number = 1,

  Boolean = 2,
}
