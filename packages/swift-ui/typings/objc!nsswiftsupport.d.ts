declare class NativeScriptViewRegistry extends NSObject {
  static alloc(): NativeScriptViewRegistry; // inherited from NSObject

  static getWithId(id: string): UIKitContainerView;

  static new(): NativeScriptViewRegistry; // inherited from NSObject

  registerCallbackContainerView(id: string, containerView: UIKitContainerView): void;

  static registerWithIdContainerView(id: string, containerView: UIKitContainerView): void;

  readonly views: NSMutableDictionary<any, any>;

  static readonly cnt: number;

  static readonly shared: NativeScriptViewRegistry;
}

interface SwiftUIProvider {
  onEvent: (p1: NSDictionary<any, any>) => void;

  updateDataWithData(data: NSDictionary<any, any>): void;
}
declare var SwiftUIProvider: {
  prototype: SwiftUIProvider;
};

declare class UIKitContainerView extends UIView {
  static alloc(): UIKitContainerView; // inherited from NSObject

  static appearance(): UIKitContainerView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): UIKitContainerView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): UIKitContainerView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): UIKitContainerView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): UIKitContainerView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): UIKitContainerView; // inherited from UIAppearance

  static new(): UIKitContainerView; // inherited from NSObject

  updateData(data: NSDictionary<any, any>): void;
}
