import { SwiftUICommon, NativeScriptWindowCommon, CustomViewLifeCycle } from './common';
export * from './common';

export function registerSwiftUI() {
  // noop
}

export class SwiftUI extends SwiftUICommon {}

export class SwiftUIManager {
  static registerNativeScriptViews(views: { [key: string]: any }, viewLifeCycle?: CustomViewLifeCycle) {}
}

export class UIDataDriver {}

export class WindowManager {
  static currentWindows: { [key: string]: NativeScriptWindow };
  static getWindow(id: string, isImmersive?: boolean): NativeScriptWindow {
    if (!WindowManager.currentWindows) {
      WindowManager.currentWindows = {};
    }
    if (!WindowManager.currentWindows[id]) {
      WindowManager.currentWindows[id] = new NativeScriptWindow(id, isImmersive);
    }
    return WindowManager.currentWindows[id];
  }

  static supportsMultipleScenes(): boolean {
    return false;
  }
}

// Note: Stub for Android
// best moved to @nativescript/ui in future when core is split up
export class NativeScriptWindow implements NativeScriptWindowCommon {
  id: string;
  isImmersive?: boolean;

  constructor(id: string, isImmersive?: boolean) {
    this.id = id;
    this.isImmersive = isImmersive;
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

// Note: Stub for Android
// best moved to @nativescript/ui in future when core is split up
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
