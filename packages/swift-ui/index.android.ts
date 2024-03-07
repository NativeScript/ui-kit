import { SwiftUICommon, NativeScriptWindowCommon } from './common';
export * from './common';

export function registerSwiftUI() {
  // noop
}

export class SwiftUI extends SwiftUICommon {}

export class UIDataDriver {}

export class WindowManager {
  static currentWindows: { [key: string]: NativeScriptWindow };
  static getWindow(id: string, isImmersize?: boolean): NativeScriptWindow {
    if (!WindowManager.currentWindows) {
      WindowManager.currentWindows = {};
    }
    if (!WindowManager.currentWindows[id]) {
      WindowManager.currentWindows[id] = new NativeScriptWindow(id, isImmersize);
    }
    return WindowManager.currentWindows[id];
  }

  static supportsMultipleScenes(): boolean {
    return false;
  }
}

// Note: Impl for Android can be provided
export class NativeScriptWindow implements NativeScriptWindowCommon {
  id: string;
  isImmersize?: boolean;

  constructor(id: string, isImmersize?: boolean) {
    this.id = id;
    this.isImmersize = isImmersize;
  }

  open(props?: any): Promise<void> {
    return Promise.resolve();
  }

  close(): Promise<void> {
    return Promise.resolve();
  }

  update(props?: any): Promise<void> {
    return Promise.resolve();
  }
}

// Note: Impl for Android can be provided
export class XR {
  static currentSessionId: string;
  static requestSession(sessionId: string, props?: any): Promise<void> {
    if (!XR.currentSessionId) {
      XR.currentSessionId = sessionId;
      WindowManager.getWindow(sessionId, true).open(props);
    }
    return Promise.resolve();
  }
  static endSession(): Promise<void> {
    if (XR.currentSessionId) {
      WindowManager.getWindow(XR.currentSessionId, true).close();
      XR.currentSessionId = null;
    }
    return Promise.resolve();
  }
}
