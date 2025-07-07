import { Application, StackLayout, View } from '@nativescript/core';
import { MorphModalKitCommon, MorphOptions } from './common';

export class MorphModalKit extends MorphModalKitCommon {
  static observers: any[] = [];
  static open(view: View, ref: View, options?: MorphOptions) {
    const vc: any = ref.page.viewController as UIViewController;
    MorphModalKit.observers.push(
      Application.ios.addNotificationObserver('MorphModalClosed', (notification: NSNotification) => {
        console.log('MorphModal closed.');
        // cleanup
        if (view && view.parent) {
          // Remove the view from its parent
          (view.parent as StackLayout).removeChild(view);
        }
        MorphModalKit.observers.forEach((observer) => {
          Application.ios.removeNotificationObserver(observer, 'MorphModalClosed');
        });
        MorphModalKit.observers = [];
      }),
    );
    if (vc && vc.openMorphModal) {
      const opt = MorphModalOptions.new();
      if (options) {
        for (const key in options) {
          opt[key] = options[key];
        }
      }
      vc.openMorphModal(view?.nativeView, opt);
    } else {
      console.error('openMorphModal is not available on this view controller');
    }
  }
}
