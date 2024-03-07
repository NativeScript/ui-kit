import { dataProperty, SwiftUICommon, BaseUIDataDriver, NativeScriptWindowCommon } from './common';
import type { ISwiftUIProvider, RegistryCallback } from '.';
import { Utils } from '@nativescript/core';
export * from './common';

const registry = new Map<string, RegistryCallback>();

export function registerSwiftUI(id: string, callback: RegistryCallback) {
  registry.set(id, callback);
}

export class UIDataDriver extends BaseUIDataDriver<SwiftUI> {
  constructor(private swiftUIProvider: ISwiftUIProvider, owner: SwiftUI) {
    super(owner);
  }
  createNativeView(): UIView {
    const vc = this.swiftUIProvider;
    return vc.view;
  }
  registerEvents(callback): void {
    this.swiftUIProvider.onEvent = (data) => {
      callback(data);
    };
  }
  updateData(data) {
    this.swiftUIProvider.updateDataWithData(data);
  }
  onEvent(data) {
    const owner = this.owner.get();
    if (owner) {
      owner.notify({
        eventName: SwiftUICommon.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    }
  }
}

export class SwiftUI extends SwiftUICommon {
  private driver: BaseUIDataDriver;

  createNativeView() {
    const generator = registry.get(this.swiftId);

    if (!generator) {
      console.warn('view not registered:', this.swiftId);
      return UIView.new();
    }
    this.driver = generator(this as any);
    return this.driver.createNativeView();
  }

  initNativeView(): void {
    if (!this.driver) {
      return;
    }

    this.driver.registerEvents((data) => {
      if (this.driver.onEvent) {
        this.driver.onEvent(data);
      } else {
        this.notify({
          eventName: SwiftUI.swiftUIEventEvent,
          data,
        });
      }
    });
  }

  disposeNativeView(): void {
    super.disposeNativeView();
    if (this.driver) {
      this.driver.destroyNativeView?.();
    }
  }

  [dataProperty.setNative](data: any) {
    this.updateData(data);
  }

  updateData(data: Record<string, any>) {
    this.driver?.updateData?.(data);
  }
}

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
    return UIApplication.sharedApplication.supportsMultipleScenes;
  }
}

export class NativeScriptWindow implements NativeScriptWindowCommon {
  id: string;
  isImmersize?: boolean;

  constructor(id: string, isImmersize?: boolean) {
    this.id = id;
    this.isImmersize = isImmersize;
  }

  open(props?: any): Promise<void> {
    if (WindowManager.currentWindows[this.id]) {
      this._updateWindowData('NativeScriptWindowOpen', props);
    }
    return Promise.resolve();
  }

  close(): Promise<void> {
    if (WindowManager.currentWindows[this.id]) {
      this._updateWindowData('NativeScriptWindowClose');
      NativeScriptWindowFactory.shared.removeWindowWithId(this.id);
      delete WindowManager.currentWindows[this.id];
    }
    return Promise.resolve();
  }

  update(props?: any): Promise<void> {
    if (WindowManager.currentWindows[this.id]) {
      this._updateWindowData('NativeScriptWindowUpdate', props);
    }
    return Promise.resolve();
  }

  private _updateWindowData(eventName: string, props?: any) {
    if (props) {
      NativeScriptWindowFactory.shared.updateDataWithIdUpdates(this.id, props);
    }
    NSNotificationCenter.defaultCenter.postNotificationNameObjectUserInfo(eventName, null, Utils.dataSerialize({ type: this.id, isImmersive: this.isImmersize }));
  }
}

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
