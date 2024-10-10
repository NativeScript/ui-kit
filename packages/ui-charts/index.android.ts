import { UIChartsViewBase } from './common';
import { optionsHandler } from './options-handlers/options-handler';
import { Application } from '@nativescript/core';
import { langHandler } from './options-handlers/lang/lang-handler';

export class UIChartsView extends UIChartsViewBase {
  public _chartInitialized: boolean = false;
  public customLayoutChangeListener;
  public chartHeight;
  public chartWidth;
  public maxHeight;
  public onLoaded() {
    super.onLoaded();
    this.customLayoutChangeListener = new android.view.View.OnLayoutChangeListener({
      onLayoutChange: (v) => {
        const nativeView = <com.highsoft.highcharts.core.HIChartView>this.nativeView;
        const w = this.nativeView.owner.get();
        if (w && this.nativeView.getOptions()) {
          const newWidth = w.getActualSize().width;
          const newHeight = w.getActualSize().height;
          if (!this.maxHeight) this.maxHeight = newHeight;
          if (newHeight > this.maxHeight) {
            // condition detected where android chart won't resize above this height,
            // dont attempt resize to avoid chart being cut off at the bottom
          } else if (this.chartHeight !== newHeight) {
            if (nativeView.getOptions().getChart()) {
              nativeView.getOptions().getChart().setHeight(java.lang.Long.valueOf(newHeight));
              nativeView.getOptions().getChart().setWidth(java.lang.Long.valueOf(newWidth));
            }
            this.chartHeight = newHeight;
            this.chartWidth = newWidth;
            const hiOptions = optionsHandler(this.options);
            this.nativeView.update(hiOptions);
          }
        }
      },
    });
    this.nativeView.addOnLayoutChangeListener(this.customLayoutChangeListener);
  }

  public createNativeView() {
    const chartView = new com.highsoft.highcharts.core.HIChartView(this._context) as any;
    chartView.setBackgroundColor(android.graphics.Color.TRANSPARENT);
    return chartView;
  }

  public onUnloaded() {
    super.onUnloaded();
    this.nativeView.removeOnLayoutChangeListener(this.customLayoutChangeListener);
  }

  /**
   * Initializes properties/listeners of the native view.
   */
  initNativeView(): void {
    // Attach the owner to nativeView.
    // When nativeView is tapped we get the owning JS object through this field.
    (<any>this.nativeView).owner = new WeakRef(this);
    (<any>this.nativeView).generateDefaultLayoutParams();
    (<any>this)._orientationHandler = this.onOrientationChange.bind(this);
    Application.on('orientationChanged', (<any>this)._orientationHandler);

    // Enable huge performance boost on Android devices
    const layout = <android.widget.RelativeLayout>this.nativeViewProtected;
    const webView = <android.webkit.WebView>layout.getChildAt(0);
    webView.setLayerType(android.view.View.LAYER_TYPE_HARDWARE, null);

    // ensure chart does not move around when dragging on visuals while nested in a ScrollView
    webView.setOnTouchListener(
      new android.view.View.OnTouchListener({
        onTouch(view: android.view.View, event: android.view.MotionEvent): boolean {
          let scrollView: org.nativescript.widgets.VerticalScrollView;
          while (!scrollView && view) {
            view = <any>view.getParent();
            if (view instanceof org.nativescript.widgets.VerticalScrollView) {
              scrollView = <org.nativescript.widgets.VerticalScrollView>view;
            }
          }
          if (scrollView) {
            scrollView.requestDisallowInterceptTouchEvent(true);
            const action = event.getActionMasked();
            switch (action) {
              case android.view.MotionEvent.ACTION_UP:
                scrollView.requestDisallowInterceptTouchEvent(false);
                break;
            }
          }

          return false;
        },
      })
    );

    super.initNativeView();
  }

  public disposeNativeView() {
    this._chartInitialized = false;
    Application.off('orientationChanged', (<any>this)._orientationHandler);
    super.disposeNativeView();
  }

  onOrientationChange() {
    setTimeout(() => {
      const w = (<any>this).nativeView.owner.get();
      if (w) {
        // TODO: redraw the chart here to handle orientation change
      }
    });
  }

  public setOptions(opts: any) {
    this.options = opts;
    if (this.nativeView) {
      const hiOptions = optionsHandler(this.options);
      this.nativeView.setOptions(hiOptions);
      this._chartInitialized = true;
      this.nativeView.reload();
    }
  }

  public updateOptions(opts) {
    this.options = opts;
    if (this.nativeView) {
      const hiOptions = optionsHandler(this.options);
      // this.nativeView.setOptions(hiOptions);
      this.nativeView.update(hiOptions, true, true);
    }
  }

  public setLangOptions(opts: any) {
    const hiLang = langHandler(opts);
    if (this.nativeView) {
      this.nativeView.lang = hiLang;
    }
  }

  public setExtremes(newMin: any, newMax: any, xAxisIndex = 0) {
    const nativeview = <any>this.nativeView;
    const opts = nativeview.getOptions() as com.highsoft.highcharts.common.hichartsclasses.HIOptions;
    if (opts) {
      const xaxisArr = opts.getXAxis();
      const xaxis = xaxisArr.get(xAxisIndex);
      xaxis.setMin(new java.lang.Long(newMin));
      xaxis.setMax(new java.lang.Long(newMax));
      nativeview.zoomOut();
      nativeview.update(opts);
    }
  }

  public enableAnnotationsModule() {
    if (this.nativeView) {
      const nativeArray = new java.util.ArrayList<any>();
      nativeArray.add('annotations');
      this.nativeView.plugins = nativeArray;
    }
  }
}
