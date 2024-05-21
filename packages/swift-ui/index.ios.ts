import type { ISwiftUIProvider, RegistryCallback } from '.';
import { dataProperty, SwiftUICommon, BaseUIDataDriver, NativeScriptWindowCommon, NativeScriptViewHelper, CustomViewLifeCycle } from './common';
import { Utils, View } from '@nativescript/core';
export * from './common';

let registeredSwiftUIViews: Map<string, RegistryCallback>;

export function registerSwiftUI(id: string, callback: RegistryCallback) {
  if (!registeredSwiftUIViews) {
    registeredSwiftUIViews = new Map<string, RegistryCallback>();
  }
  registeredSwiftUIViews.set(id, callback);
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
    const generator = registeredSwiftUIViews.get(this.swiftId);

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

// Possible NativeScriptView's by id
let registeredNativeScriptViews: Map<string, any>;
// NativeScriptView's by id which have been created and in use
let createdNativeScriptViews: Map<string, View>;
// Any custom lifecycle needed for views when paired with flavors
let customViewLifeCycle: CustomViewLifeCycle;
export class SwiftUIManager {
  /**
   * Register NativeScript Views by id for usage within SwiftUI
   * @param views map of id to NativeScript View
   */
  static registerNativeScriptViews(views: { [key: string]: any }, viewLifeCycle?: CustomViewLifeCycle) {
    if (!registeredNativeScriptViews) {
      registeredNativeScriptViews = new Map();
      // ensure view lifecycle is setup with @nativescript/core factory
      NativeScriptViewFactory.shared.viewCreator = (id: string) => {
        // console.log("viewCreator:", id);
        // Each view is created with a unique instance id, with the registered id as the prefix for easy lookup
        const registerId = id.split('-')[0];
        if (registeredNativeScriptViews.has(registerId)) {
          let view: View;
          if (customViewLifeCycle) {
            view = customViewLifeCycle.create(id, registeredNativeScriptViews.get(registerId));
          } else {
            // TODO: xml view creation fallback
          }

          if (!createdNativeScriptViews) {
            createdNativeScriptViews = new Map();
          }
          createdNativeScriptViews.set(id, view);
          NativeScriptViewFactory.shared.views.setObjectForKey(NativeScriptViewHelper.generateNativeView(view, {}), id);
        }
      };
      NativeScriptViewFactory.shared.viewDestroyer = (id: string) => {
        // console.log("viewDestroyer:", id);
        const view = createdNativeScriptViews?.get(id);
        if (view) {
          if (customViewLifeCycle) {
            customViewLifeCycle.destroy(id);
          }
          NativeScriptViewHelper.disposeView(view);
          createdNativeScriptViews.delete(id);
          NativeScriptViewFactory.shared.views.removeObjectForKey(id);
        }
      };
    }
    if (viewLifeCycle) {
      customViewLifeCycle = viewLifeCycle;
    }
    const entries = Object.entries(views);
    entries.forEach((entry) => {
      registeredNativeScriptViews.set(entry[0], entry[1]);
    });
  }
}

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
    return UIApplication.sharedApplication.supportsMultipleScenes;
  }
}

export class NativeScriptWindow implements NativeScriptWindowCommon {
  id: string;
  isImmersive?: boolean;

  constructor(id: string, isImmersive?: boolean) {
    this.id = id;
    this.isImmersive = isImmersive;
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
    NSNotificationCenter.defaultCenter.postNotificationNameObjectUserInfo(eventName, null, Utils.dataSerialize({ type: this.id, isImmersive: this.isImmersive }));
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
