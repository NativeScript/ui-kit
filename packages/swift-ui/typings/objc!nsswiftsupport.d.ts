interface SwiftUIProvider {
  onEvent: (p1: NSDictionary<any, any>) => void;

  buildViewController(): UIViewController;

  init?(): SwiftUIProvider;

  updateDataWithData(data: NSDictionary<any, any>): void;
}
declare var SwiftUIProvider: {
  prototype: SwiftUIProvider;
};

declare class NativeScriptSceneRegistry extends NSObject {
  static alloc(): NativeScriptSceneRegistry; // inherited from NSObject

  static new(): NativeScriptSceneRegistry; // inherited from NSObject

  static setShared(value: NativeScriptSceneRegistry): void;

  static shared: NativeScriptSceneRegistry;

  updateDataWithIdUpdates(id: string, updates: NSDictionary<any, any>): void;
}
