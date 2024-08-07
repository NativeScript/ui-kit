import type { EventData } from '@nativescript/core';
import type { SwiftUICommon, BaseUIDataDriver, NativeScriptWindowCommon } from './common';

export * from './common';
export * from './components';

export declare interface ISwiftUIProvider {
  view: UIView;
  onEvent: unknown;
  updateDataWithData(data: unknown): void;
}

export declare class SwiftUI<T = any, K = any> extends SwiftUICommon {
  static swiftUIEventEvent = 'swiftUIEvent';
  updateData(data: K);
  on(name: SwiftUI.swiftUIEventEvent, callback: (args: SwiftUIEventData<T>) => void, thisArg?: any);
}

export declare class SwiftUIManager {
  static registerNativeScriptViews(views: { [key: string]: any }, viewLifeCycle?: CustomViewLifeCycle);
}

export class UIDataDriver<T extends ISwiftUIProvider, K = unknown, V = unknown> extends BaseUIDataDriver<SwiftUI, K, V> {
  constructor(swiftUIProvider: T, view: SwiftUI);
  onEvent(data: ReceivedDataType): void;
  updateData(data: DataType): void;
  createNativeView(): UIView;
  registerEvents(callback: (data: ReceivedDataType) => void): void;
}

export declare class WindowManager {
  static currentWindows: {
    [key: string]: NativeScriptWindow;
  };
  static getWindow(id: string, isImmersive?: boolean): NativeScriptWindow;
  static supportsMultipleScenes(): boolean;
}
export declare class NativeScriptWindow implements NativeScriptWindowCommon {
  id: string;
  isImmersive?: boolean;
  constructor(id: string, isImmersive?: boolean);
  open(props?: any): Promise<void>;
  close(): Promise<void>;
  update(props?: any): Promise<void>;
}
export declare class XR {
  static currentSessionId: string;
  static requestSession(sessionId: string, props?: any): Promise<void>;
  static endSession(): Promise<void>;
}
