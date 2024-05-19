import { View } from '@nativescript/core';
import { AutoLayoutController, UNSPECIFIED } from './view-helper-controllers';

export { AutoLayoutController, AutoLayoutView, ViewLayoutWrapper } from './view-helper-controllers';

export class NativeScriptViewHelper {
  static generateNativeView(view: View, nativeContextOrParent: any | View, autoLayout = true): any {
    if (nativeContextOrParent instanceof View) {
      if (view.parent !== nativeContextOrParent) {
        view.parent?._removeView(view);
        nativeContextOrParent._addView(view);
      }
    } else {
      // this also sets up the style scope (root css)
      view._setupAsRootView(nativeContextOrParent);
    }
    if (__APPLE__) {
      const iosView = view.ios;
      if (view.viewController) {
        return view.viewController.view;
      }
      if (iosView instanceof UIViewController) {
        return iosView.view;
      } else {
        // we can disable autolayout here, so it'll just create a normal view
        if (!autoLayout) {
          view.callLoaded();
          // iosView.translatesAutoresizingMaskIntoConstraints = true;
          View.measureChild(null, view, UNSPECIFIED, UNSPECIFIED);
          View.layoutChild(null, view, 0, 0, view.getMeasuredWidth(), view.getMeasuredHeight());
          return view.ios;
        }
        const controller = AutoLayoutController.initWithOwner(new WeakRef(view)) as UIViewController;
        controller.view.addSubview(view.ios);
        view.viewController = controller;
        return controller.view;
      }
    } else if (__ANDROID__) {
      view.callLoaded();
      return view.android;
    }
  }

  static disposeView(view: View) {
    view.parent?._removeView(view);
    view.destroyNode(true);
    view.viewController = null;
  }
}
