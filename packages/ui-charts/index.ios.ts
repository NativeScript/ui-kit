import { UIChartsViewBase } from './common';
import { optionsHandler } from './options-handlers/options-handler';
import { langHandler } from './options-handlers/lang/lang-handler';
import { Utils, ViewBase } from '@nativescript/core';

export class UIChartsView extends UIChartsViewBase {
  public _chartInitialized = false;
  private _delegate: HighchartsViewDelegateImpl;

  public createNativeView() {
    // const chartView = new HIChartView({ frame: CGRectMake(0, 0, 200, 200) }) as any;
    const chartView = HIChartView.new();
    // always retain delegate on owner class to ensure it doesn't inadvertently get garbage collected
    this._delegate = HighchartsViewDelegateImpl.initWithOwner(new WeakRef(this));
    chartView.delegate = this._delegate;
    // const currentVC = getVisibleViewController();
    // chartView.viewController = currentVC;
    return chartView;
  }

  disposeNativeView() {
    this._chartInitialized = false;
    super.disposeNativeView();
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.
    // (<any>this.nativeView).owner = new WeakRef(this);
    super.initNativeView();

    // NSNotificationCenter.defaultCenter.addObserverForNameObjectQueueUsingBlock("valueChange", null, NSOperationQueue.mainQueue, this.onValueChange);
  }

  onLoaded() {
    super.onLoaded();
    // we do this on onLoaded as the viewControllers are not properly setup on createNativeView
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let vcParent: ViewBase = this;
    // start iterating over viewControllers
    // we also iterate over this as if it has a viewController, it's most likely a modal
    while (vcParent && !vcParent.viewController) {
      vcParent = vcParent.parent;
    }
    const vc = vcParent?.viewController || Utils.ios.getRootViewController();
    if (vc && this.nativeView) {
      this.nativeView.viewController = vc;
    }
  }

  public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number) {
    const nativeView = this.nativeView;
    if (nativeView) {
      const width = Utils.layout.getMeasureSpecSize(widthMeasureSpec);
      const height = Utils.layout.getMeasureSpecSize(heightMeasureSpec);
      this.setMeasuredDimension(width, height);
    }
  }

  public setOptions(opts: any) {
    this.options = opts;
    const hiOptions = optionsHandler(this.options);
    const nativeView = this.nativeView as HIChartView;
    if (nativeView) {
      nativeView.options = hiOptions;
      this._chartInitialized = true;
      nativeView.reload();
    }
  }

  public setLangOptions(opts: any) {
    const hiLang = langHandler(opts);
    if (this.nativeView) {
      this.nativeView.lang = hiLang;
    }
  }

  public updateOptions(opts) {
    this.options = opts;
    const hiOptions = optionsHandler(this.options);
    const nativeView = this.nativeView as HIChartView;
    if (nativeView) {
      nativeView.updateRedrawOneToOneAnimation(hiOptions, 1, 1, new HIAnimationOptionsObject());
    }
  }

  setExtremes(newMin, newMax, xAxisIndex = 0) {
    const nativeview = this.nativeView as HIChartView;
    if (nativeview) {
      const opts = nativeview.options;
      if (opts) {
        const xaxis = opts.xAxis.objectAtIndex(xAxisIndex);

        if (xaxis) {
          xaxis.min = newMin;
          xaxis.max = newMax;
        }
        nativeview.zoomOut();
        nativeview.updateRedrawOneToOneAnimation(nativeview.options, 1, 1, new HIAnimationOptionsObject());
      }
    }
  }

  public enableAnnotationsModule() {
    if (this.nativeView) {
      this.nativeView.plugins = ['annotations'];
    }
  }
}

@NativeClass()
class HighchartsViewDelegateImpl extends NSObject implements HIChartViewDelegate {
  static ObjCProtocols = [HIChartViewDelegate]; // define our native protocalls
  private _owner: WeakRef<UIChartsView>;

  static initWithOwner(owner: WeakRef<UIChartsView>): HighchartsViewDelegateImpl {
    const delegate = <HighchartsViewDelegateImpl>HighchartsViewDelegateImpl.new();
    delegate._owner = owner;
    return delegate;
  }

  chartViewDidLoad(chart) {
    // console.log('HighchartsViewDelegateImpl Did load chart:', chart);
  }
}

function getVisibleViewController(rootViewController?: UIViewController): UIViewController {
  if (!rootViewController) {
    const app = UIApplication.sharedApplication;
    const window = app.keyWindow || (app.windows.count > 0 && app.windows[0]);
    rootViewController = window.rootViewController;
  }
  if (rootViewController.presentedViewController) {
    return getVisibleViewController(rootViewController.presentedViewController);
  }

  if (rootViewController.isKindOfClass(UINavigationController.class())) {
    return getVisibleViewController((<UINavigationController>rootViewController).visibleViewController);
  }

  if (rootViewController.isKindOfClass(UITabBarController.class())) {
    return getVisibleViewController((<UITabBarController>rootViewController).selectedViewController);
  }

  return rootViewController;
}
