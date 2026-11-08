declare class IONPortal extends NSObject {
  static alloc(): IONPortal; // inherited from NSObject

  static new(): IONPortal; // inherited from NSObject

  bundle: NSBundle;

  initialContext: NSDictionary<string, any>;

  readonly name: string;

  readonly startDir: string;

  constructor(o: { name: string; startDir: string; bundle: NSBundle; initialContext: NSDictionary<string, any> });

  constructor(o: { name: string; startDir: string; initialContext: NSDictionary<string, any> });

  initWithNameStartDirBundleInitialContext(name: string, startDir: string, bundle: NSBundle, initialContext: NSDictionary<string, any>): this;

  initWithNameStartDirInitialContext(name: string, startDir: string, initialContext: NSDictionary<string, any>): this;
}

declare class IONPortalUIView extends UIView {
  static alloc(): IONPortalUIView; // inherited from NSObject

  static appearance(): IONPortalUIView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): IONPortalUIView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): IONPortalUIView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): IONPortalUIView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): IONPortalUIView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): IONPortalUIView; // inherited from UIAppearance

  static new(): IONPortalUIView; // inherited from NSObject

  readonly bridge: CAPBridgeProtocol;

  constructor(o: { portal: IONPortal });

  initWithPortal(portal: IONPortal): this;

  reload(): void;
}

declare class IONPortalsPubSub extends NSObject {
  static alloc(): IONPortalsPubSub; // inherited from NSObject

  static new(): IONPortalsPubSub; // inherited from NSObject

  static publishMessageToTopic(message: any, topic: string): void;

  static subscribeToTopicCallback(topic: string, callback: (p1: NSDictionary<string, any>) => void): number;

  static unsubscribeFromTopicSubscriptionRef(topic: string, subscriptionRef: number): void;
}

declare var IonicPortalsVersionNumber: number;

declare var IonicPortalsVersionString: interop.Reference<number>;
