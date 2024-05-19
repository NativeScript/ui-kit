import { IOSHelper, LayoutBase, Utils, View, ViewBase, ViewHelper } from '@nativescript/core';

export const UNSPECIFIED = Utils.layout.makeMeasureSpec(0, Utils.layout.UNSPECIFIED);

@NativeClass()
export class ViewLayoutWrapper extends UIView {
  owner: WeakRef<View>;

  static initWithOwner(owner: WeakRef<View>): ViewLayoutWrapper {
    const view = ViewLayoutWrapper.new() as ViewLayoutWrapper;
    view.owner = owner;
    return view;
  }
  // @ts-expect-error when overriding native getters, TypeScript doesn't like it
  get intrinsicContentSize() {
    const nsView = this.owner?.deref();
    let intrinsicWidth = 0;
    let intrinsicHeight = 0;
    // This will make the view stretch to giant sizes
    // const maxWidth = Screen.mainScreen.widthPixels;
    // const maxHeight = 99999;
    if (nsView) {
      const { measuredWidth, measuredHeight } = ViewHelper.measureChild(
        null,
        nsView,
        // Utils.layout.makeMeasureSpec(maxWidth, Utils.layout.AT_MOST),
        // Utils.layout.makeMeasureSpec(maxHeight, Utils.layout.AT_MOST)
        UNSPECIFIED,
        UNSPECIFIED
      );
      intrinsicWidth = Utils.layout.toDeviceIndependentPixels(measuredWidth);
      intrinsicHeight = Utils.layout.toDeviceIndependentPixels(measuredHeight);
    }

    return CGSizeMake(intrinsicWidth || UIViewNoIntrinsicMetric, intrinsicHeight || UIViewNoIntrinsicMetric);
  }

  sizeThatFits(size: CGSize): CGSize {
    // console.log('sizeThatFits', size);
    const nsView = this.owner?.deref();
    if (!nsView) {
      return CGSizeMake(0, 0);
    }
    const { measuredWidth, measuredHeight } = ViewHelper.measureChild(null, nsView, Utils.layout.makeMeasureSpec(size.width, Utils.layout.AT_MOST), Utils.layout.makeMeasureSpec(size.height, Utils.layout.AT_MOST));
    return CGSizeMake(measuredWidth, measuredHeight);
  }
}

@NativeClass()
export class AutoLayoutController extends UIViewController {
  public owner: WeakRef<View>;

  public static initWithOwner(owner: WeakRef<View>): AutoLayoutController {
    const controller = <AutoLayoutController>AutoLayoutController.new();
    controller.owner = owner;

    return controller;
  }

  loadView(): void {
    this.view = ViewLayoutWrapper.initWithOwner(this.owner);
  }

  public viewDidLoad(): void {
    super.viewDidLoad();

    // Unify translucent and opaque bars layout
    this.edgesForExtendedLayout = UIRectEdge.Bottom;
    this.extendedLayoutIncludesOpaqueBars = true;
  }

  // older SDK's
  // public viewWillLayoutSubviews(): void {
  //   super.viewWillLayoutSubviews();
  //   const owner = this.owner.deref();
  //   if (owner) {
  //     IOSHelper.updateConstraints(this, owner);
  //   }
  // }

  public viewDidLayoutSubviews(): void {
    super.viewDidLayoutSubviews();
    const owner = this.owner.deref();
    if (owner) {
      IOSHelper.layoutView(this, owner);
    }
  }

  public viewWillAppear(animated: boolean): void {
    super.viewWillAppear(animated);
    const owner = this.owner.deref();
    if (!owner) {
      return;
    }

    if (!owner.parent) {
      owner.callLoaded();
    }
  }

  public viewDidDisappear(animated: boolean): void {
    super.viewDidDisappear(animated);
    const owner = this.owner.deref();
    if (owner && !owner.parent) {
      owner.callUnloaded();
    }
  }

  // Mind implementation for other controllers
  public traitCollectionDidChange(previousTraitCollection: UITraitCollection): void {
    super.traitCollectionDidChange(previousTraitCollection);

    if (Utils.SDK_VERSION >= 13) {
      const owner = this.owner.deref();
      if (owner && this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection && this.traitCollection.hasDifferentColorAppearanceComparedToTraitCollection(previousTraitCollection)) {
        owner.notify({
          eventName: IOSHelper.traitCollectionColorAppearanceChangedEvent,
          object: owner,
        });
      }
    }
  }
}

/**
 * This view is a proxy wrapper for any other view.
 * It can be used in the future for wrapping more complex views, if needed
 */
export class AutoLayoutView extends LayoutBase {
  public viewController: AutoLayoutController;
  public _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    const nativeView = this.viewController.view;
    super._addViewToNativeVisualTree(view, atIndex);
    const index = atIndex ?? Infinity;
    if (nativeView && view.nativeViewProtected) {
      if (index >= nativeView.subviews.count) {
        nativeView.addSubview(view.nativeViewProtected);
      } else {
        nativeView.insertSubviewAtIndex(view.nativeViewProtected, index);
      }
    }
    return true;
  }

  public _removeViewFromNativeVisualTree(view: ViewBase): void {
    const nativeView = this.viewController.view;
    super._removeViewFromNativeVisualTree(view);
    if (view.nativeViewProtected) {
      if ((view.nativeViewProtected as UIView).superview === nativeView) {
        (view.nativeViewProtected as UIView).removeFromSuperview();
      }
    }
  }
  createNativeView() {
    this.viewController = AutoLayoutController.initWithOwner(new WeakRef(this));
    this.viewController.view.translatesAutoresizingMaskIntoConstraints = true;
    return this.viewController.view;
  }

  public layoutNativeView(): void {
    // noop
  }

  public _setNativeViewFrame(): void {
    // noop
  }

  public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
    const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
    const widthMode = Utils.layout.getMeasureSpecMode(widthMeasureSpec);

    const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
    const heightMode = Utils.layout.getMeasureSpecMode(heightMeasureSpec);
    let measureWidth = this.effectiveMinWidth;
    let measureHeight = this.effectiveMinHeight;
    this.eachLayoutChild((child) => {
      const result = View.measureChild(this, child, widthMeasureSpec, heightMeasureSpec);

      measureWidth = Math.max(result.measuredWidth, measureWidth);
      measureHeight = Math.max(result.measuredHeight, measureHeight);

      return true;
    });

    const widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
    const heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);

    this.setMeasuredDimension(widthAndState, heightAndState);
  }

  // This method won't be called in Android because we use the native android layout.
  public onLayout(left: number, top: number, right: number, bottom: number): void {
    this.eachLayoutChild((child) => {
      View.layoutChild(this, child, 0, 0, right - left, bottom - top);
      return true;
    });
  }
}
