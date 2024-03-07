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
