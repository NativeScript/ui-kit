import { Application, OrientationChangedEventData, Utils } from '@nativescript/core';
import { definedValues, IonicPortalCommon, IonicPortalLiveUpdateConfig, IonicPortalManagerCommon } from './common';

export class IonicPortalManager extends IonicPortalManagerCommon {
  static configureLiveUpdates(portalId: string, config: IonicPortalLiveUpdateConfig) {
    NSCIonicPortals.configureLiveUpdatesWithPortalIdConfigurationError(portalId, definedValues(config));
  }

  static syncLiveUpdates(portalId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      NSCIonicPortals.syncLiveUpdatesWithPortalIdCompletion(portalId, (error) => {
        if (error) {
          reject(new Error(error.localizedDescription));
        } else {
          resolve();
        }
      });
    });
  }

  static publishTopic(topic: string, data?: any) {
    IONPortalsPubSub.publishMessageToTopic(Utils.dataSerialize(data, true), topic);
  }

  static subscribeToTopic(topic: string, callback: (data?: any) => void): number {
    super.subscribeToTopic(topic, callback);
    const subscriptionId = IONPortalsPubSub.subscribeToTopicCallback(topic, (data) => {
      if (this.Listeners && this.Listeners[topic]) {
        for (const listener of this.Listeners[topic]) {
          if (data) {
            listener.callback(Utils.dataDeserialize(data));
          } else {
            listener.callback();
          }
        }
      }
    });
    this.Listeners[topic].push({
      callback,
      subscriptionId,
    });
    return subscriptionId;
  }

  static unsubscribeFromTopic(topic: string, subscriptionId: number) {
    IONPortalsPubSub.unsubscribeFromTopicSubscriptionRef(topic, subscriptionId);
    super.unsubscribeFromTopic(topic, subscriptionId);
  }
}

export class IonicPortal extends IonicPortalCommon {
  private _handleOrientationFn: (args: OrientationChangedEventData) => void;

  // @ts-ignore
  get ios(): IONPortalUIView {
    return this.nativeView;
  }

  createNativeView() {
    if (!this.id) {
      throw new Error(`IonicPortal requires an 'id' property.`);
    }
    return NSCIonicPortals.createPortalViewWithPortalIdInitialContext(this.id, IonicPortalManager.InitialContexts?.[this.id] ?? {});
  }

  initNativeView() {
    // auto-handle orientation
    this._handleOrientationFn = this._updateWebViewSize.bind(this);
    Application.on(Application.orientationChangedEvent, this._handleOrientationFn);
  }

  disposeNativeView() {
    Application.off(Application.orientationChangedEvent, this._handleOrientationFn);
    super.disposeNativeView();
  }

  reload() {
    if (this.ios) {
      this.ios.reload();
    }
  }

  onLoaded() {
    super.onLoaded();
    this._updateWebViewSize();
  }

  private _updateWebViewSize() {
    // updated size on next tick
    setTimeout(() => {
      // ensure the webview content inside also resizes with view size changes
      this.nativeView.subviews.objectAtIndex(0).subviews.objectAtIndex(0).frame = this.ios.bounds;
    });
  }
}
