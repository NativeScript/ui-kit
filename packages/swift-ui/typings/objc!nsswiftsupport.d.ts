interface SwiftUIProvider {
  onEvent: (p1: NSDictionary<any, any>) => void;

  buildViewController(): UIViewController;

  init?(): SwiftUIProvider;

  updateDataWithData(data: NSDictionary<any, any>): void;
}
declare var SwiftUIProvider: {
  prototype: SwiftUIProvider;
};

declare class NativeScriptWindowFactory extends NSObject {
  static alloc(): NativeScriptWindowFactory; // inherited from NSObject

  static new(): NativeScriptWindowFactory; // inherited from NSObject

  static setShared(value: NativeScriptWindowFactory): void;

  static shared: NativeScriptWindowFactory;

  updateDataWithIdUpdates(id: string, updates: NSDictionary<any, any>): void;

  removeWindowWithId(id: string): void;
}

// Provided by @nativescript/core since 8.7
declare class NativeScriptViewFactory extends NSObject {
  static shared: NativeScriptViewFactory;
  views: NSMutableDictionary<string, any>;
  viewCreator: (id: string) => void;
  viewDestroyer: (id: string) => void;
}
