declare class NSCIonicPortals extends NSObject {
  static alloc(): NSCIonicPortals; // inherited from NSObject

  static configureLiveUpdatesWithPortalIdConfigurationError(portalId: string, configuration: NSDictionary<string, any> | { [key: string]: any }): boolean;

  static createPortalViewWithPortalIdInitialContext(portalId: string, initialContext: NSDictionary<string, any> | { [key: string]: any }): IONPortalUIView;

  static new(): NSCIonicPortals; // inherited from NSObject

  static syncLiveUpdatesWithPortalIdCompletion(portalId: string, completion: (p1: NSError) => void): void;
}
