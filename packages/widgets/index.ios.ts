import { Utils, CoreTypes, Color, Length, ImageSource } from '@nativescript/core';
import { layout } from '@nativescript/core/utils';

const native_ = Symbol('[[_native_]]');
export class WidgetManager {
  [native_];

  get native() {
    return this[native_];
  }

  static fromNative(manager) {
    const ret = new WidgetManager();
    ret[native_] = manager;
    return ret;
  }
}

export class ViewsManager {
  [native_];

  get native() {
    return this[native_];
  }

  static fromNative(manager) {
    const ret = new ViewsManager();
    ret[native_] = manager;
    return ret;
  }
}

export class PlatformWidgetManager {
  [native_];

  get native() {
    return this[native_];
  }

  static fromNative(nativeManager) {
    const ret = new PlatformWidgetManager();
    ret[native_] = nativeManager;
    return ret;
  }
}

interface IWidgetListener {
  onEnabled?: (provider: string) => void;
  onUpdate?: (event: { provider: string; appWidgetIds: number[]; manager: WidgetManager; widgetManager: PlatformWidgetManager }) => void;
  onUpdateAsync?: (event: { provider: string; appWidgetIds: number[]; manager: WidgetManager; widgetManager: PlatformWidgetManager }) => void;
  onDeleted?: (event: { provider: string; appWidgetIds: number[] }) => void;
  onDisabled?: (provider: string) => void;
  onClick?: (event: { action: string; extras: Record<string, any>; provider: string }) => void;
  onResize?: (event: { provider: string; appWidgetId: number; minWidth: number; minHeight: number; maxWidth: number; maxHeight: number; manager: WidgetManager; widgetManager: PlatformWidgetManager }) => void;
}

export class PlatformRemoteViews {
  [native_];

  get native() {
    return this[native_];
  }

  static fromNative(views) {
    const ret = new PlatformRemoteViews();
    ret[native_] = views;
    return ret;
  }
}

const toUnitValue = (value: CoreTypes.FixedLengthType) => {
  switch (typeof value) {
    case 'string':
      const parsed = Length.parse(value);
      if (typeof parsed === 'string') {
        return null;
      }
      return toUnitValue(parsed);
    case 'number':
      return {
        value,
        unit: 'dip',
      };
    case 'object': {
      switch (value?.unit) {
        case 'dip':
          return {
            value: value.value,
            unit: 'dip',
          };
        case 'px':
          return {
            value: value.value,
            unit: 'px',
          };
        default:
          return null;
      }
    }
  }
};

type BundleValue = string | number | boolean | string[] | number[] | Record<string, any>;

const toBundle = (extras: Record<string, BundleValue | null | undefined>): android.os.Bundle => {
  return Utils.dataSerialize(extras, true);
};

const fromBundle = (bundle: android.os.Bundle): Record<string, any> => {
  return Utils.dataDeserialize(bundle) as Record<string, any>;
};

const toPxValue = (value: CoreTypes.FixedLengthType) => {
  switch (typeof value) {
    case 'string':
      const parsed = Length.parse(value);
      if (typeof parsed === 'string') {
        return -1;
      }
      return toPxValue(parsed);
    case 'number':
      return layout.toDevicePixels(value);
    case 'object': {
      switch (value?.unit) {
        case 'dip':
          return layout.toDevicePixels(value.value);
        case 'px':
          return value.value;
        default:
          return -1;
      }
    }
  }
};

export class RemoteViews {
  protected [native_];

  get native() {
    return this[native_];
  }

  setPadding(value: CoreTypes.FixedLengthType) {
    let left = -1,
      top = -1,
      right = -1,
      bottom = -1;

    switch (arguments.length) {
      case 1:
        left = top = right = bottom = toPxValue(value);
        break;
      case 2:
        left = right = toPxValue(arguments[0]);
        top = bottom = toPxValue(arguments[1]);
        break;
      case 3:
        left = right = toPxValue(arguments[0]);
        top = toPxValue(arguments[1]);
        bottom = toPxValue(arguments[2]);
        break;
      case 4:
        left = toPxValue(arguments[0]);
        top = toPxValue(arguments[1]);
        right = toPxValue(arguments[2]);
        bottom = toPxValue(arguments[3]);
        break;
    }
    if (left >= -1 && top >= -1 && right >= -1 && bottom >= -1) {
      this.native.setPadding(left, top, right, bottom);
    }
    return this;
  }

  setMargin(value: CoreTypes.FixedLengthType) {
    let left = 0,
      top = 0,
      right = 0,
      bottom = 0;

    switch (arguments.length) {
      case 1:
        left = top = right = bottom = toPxValue(value);
        break;
      case 2:
        left = right = toPxValue(arguments[0]);
        top = bottom = toPxValue(arguments[1]);
        break;
      case 3:
        left = right = toPxValue(arguments[0]);
        top = toPxValue(arguments[1]);
        bottom = toPxValue(arguments[2]);
        break;
      case 4:
        left = toPxValue(arguments[0]);
        top = toPxValue(arguments[1]);
        right = toPxValue(arguments[2]);
        bottom = toPxValue(arguments[3]);
        break;
    }
    this.native.setMargin(left, top, right, bottom);
    return this;
  }

  setBackgroundColor(color: Color | string) {
    if (typeof color === 'string') {
      this.native.setBackgroundColor(new Color(color).android);
    } else {
      if (color && color instanceof Color) {
        this.native.setBackgroundColor(color.android);
      }
    }
    return this;
  }

  setWidth(value: CoreTypes.FixedLengthType) {
    const unitValue = toUnitValue(value);
    if (unitValue) {
      this.native.setWidth(unitValue.value, unitValue.unit);
    }
    return this;
  }

  setHeight(value: CoreTypes.FixedLengthType) {
    const unitValue = toUnitValue(value);
    if (unitValue) {
      this.native.setHeight(unitValue.value, unitValue.unit);
    }
    return this;
  }

  setSize(width: CoreTypes.FixedLengthType, height: CoreTypes.FixedLengthType) {
    const widthUnitValue = toUnitValue(width);
    const heightUnitValue = toUnitValue(height);
    if (widthUnitValue && heightUnitValue) {
      this.native.setSize(widthUnitValue.value, widthUnitValue.unit, heightUnitValue.value, heightUnitValue.unit);
    }
    return this;
  }

  setPendingIntentTemplate(intent: android.app.PendingIntent): this {
    this.native.setPendingIntentTemplate(intent);
    return this;
  }

  setOnClickFillInIntent(intent: android.content.Intent): this {
    this.native.setOnClickFillInIntent(intent);
    return this;
  }

  onClick(action: string, extras?: Record<string, string | number | boolean>): this {
    this.native.onClick(action, extras ? toBundle(extras) : null);
    return this;
  }

  onItemClick(action: string, extras?: Record<string, string | number | boolean>): this {
    this.native.onItemClick(action, extras ? toBundle(extras) : null);
    return this;
  }

  toPlatformViews(packageName?: string): PlatformRemoteViews {
    return PlatformRemoteViews.fromNative(this[native_].build(packageName ?? Utils.android.getApplicationContext().getPackageName()));
  }
}

export type ViewBuilder = () => RemoteViews | RemoteViews[];

export function ForEach<T>(items: T[], id?: keyof T | ((item: T) => string | number), content?: (item: T, index: number) => RemoteViews): RemoteViews[] {
  if (!content) return [];

  return items.map((item, index) => content(item, index));
}

export function Root(content: ViewBuilder) {
  const view = new RootLayoutView();
  if (content) {
    const result = content();

    const views = Array.isArray(result) ? result.flat() : [result];
    for (const child of views) {
      if (child instanceof SpacerView) {
        child.setOrientation('vertical');
      }
      view.addView(child);
    }
  }
  return view;
}

export function VStack(content?: ViewBuilder) {
  const view = new VLinearLayoutView();
  if (content) {
    const result = content();

    const views = Array.isArray(result) ? result.flat() : [result];
    for (const child of views) {
      if (child instanceof SpacerView) {
        child.setOrientation('vertical');
      }
      view.addView(child);
    }
  }
  return view;
}

export function HStack(content?: ViewBuilder) {
  const view = new HLinearLayoutView();
  if (content) {
    const result = content();

    const views = Array.isArray(result) ? result.flat() : [result];
    for (const child of views) {
      if (child instanceof SpacerView) {
        child.setOrientation('horizontal');
      }
      view.addView(child);
    }
  }
  return view;
}

export function ZStack(content?: ViewBuilder) {
  const view = new FrameLayout();
  if (content) {
    const result = content();
    const views = Array.isArray(result) ? result.flat() : [result];
    for (const child of views) {
      view.addView(child);
    }
  }
  return view;
}

export function Flipper<T>(items: T[], interval?: number, content?: (item: T, index: number) => RemoteViews): RemoteViews {
  const flipper = new AdapterViewFlipper();

  if (interval) {
    // flipInterval is baked into the layout XML, we just enable autoStart
    flipper.setAutoStart(true);
  }

  if (content) {
    for (let i = 0; i < items.length; i++) {
      flipper.addItem(content(items[i], i));
    }
  }

  return flipper;
}

export function Chronometer(options?: { base?: number; targetTime?: number; format?: string; countDown?: boolean; started?: boolean; color?: Color | string }) {
  const view = new ChronometerView();
  if (options) {
    // targetTime uses Unix timestamp (Date.now() style), base uses elapsedRealtime
    if (options.targetTime != null) view.setTargetTime(options.targetTime);
    else if (options.base != null) view.setBase(options.base);
    if (options.format) view.setFormat(options.format);
    if (options.countDown != null) view.setCountDown(options.countDown);
    if (options.color) view.setColor(options.color);
    if (options.started) view.start();
  }
  return view;
}

export function Clock(options?: { format12Hour?: string; format24Hour?: string; timeZone?: string; color?: Color | string }) {
  const view = new TextClockView();
  if (options) {
    if (options.format12Hour) view.setFormat12Hour(options.format12Hour);
    if (options.format24Hour) view.setFormat24Hour(options.format24Hour);
    if (options.timeZone) view.setTimeZone(options.timeZone);
    if (options.color) view.setColor(options.color);
  }
  return view;
}

export function List(count: number, content: (index: number) => RemoteViews, emptyView?: () => RemoteViews): RemoteViews {
  const view = new ListView();
  for (let i = 0; i < count; i++) {
    const item = content(i);
    view.addItem(item);
  }
  if (emptyView) {
    view.setEmptyView(emptyView());
  }
  return view;
}

export function ProgressBar(options?: { progress?: number; max?: number; indeterminate?: boolean; flex?: boolean; fullWidth?: boolean }) {
  const view = new ProgressBarView();
  if (options) {
    const indeterminate = options.indeterminate ?? (options.progress == null && options.max == null);
    const max = options.max ?? 100;
    const progress = options.progress ?? 0;
    view.setProgressBar(max, progress, indeterminate);
    if (options.flex) {
      view.setFlex(true);
    }
    if (options.fullWidth) {
      view.setFullWidth(true);
    }
  }
  return view;
}

export function RelativeLayout(content?: ViewBuilder) {
  const view = new RelativeLayoutView();
  if (content) {
    const result = content();
    const views = Array.isArray(result) ? result.flat() : [result];
    for (const child of views) {
      view.addView(child);
    }
  }
  return view;
}

export class SpacerView extends RemoteViews {
  private orientation_: 'horizontal' | 'vertical' = 'horizontal';
  private size_: CoreTypes.FixedLengthType | undefined;

  constructor(sizeOrOrientation?: CoreTypes.FixedLengthType | 'horizontal' | 'vertical') {
    super();
    // Determine if argument is orientation or size
    if (sizeOrOrientation === 'horizontal' || sizeOrOrientation === 'vertical') {
      this.orientation_ = sizeOrOrientation;
    } else if (sizeOrOrientation != null) {
      this.size_ = sizeOrOrientation;
    }
    this.updateNative();
  }

  get native() {
    return this[native_];
  }

  private updateNative() {
    /* this[native_] = this.orientation_ === 'horizontal' ? new org.nativescript.widgets.RemoteViews.HSpacer() : new org.nativescript.widgets.RemoteViews.VSpacer();

    // Apply fixed size if provided - use fixed layout (no weight)
    if (this.size_ != null) {
      this.native.setFixed(true);
      const unitValue = toUnitValue(this.size_);
      if (unitValue) {
        if (this.orientation_ === 'horizontal') {
          this.native.setWidth(unitValue.value, unitValue.unit);
        } else {
          this.native.setHeight(unitValue.value, unitValue.unit);
        }
      }
    }
    */
  }

  setOrientation(orientation: 'horizontal' | 'vertical') {
    if (this.orientation_ !== orientation) {
      this.orientation_ = orientation;
      this.updateNative();
    }
    return this;
  }

  setSize(size: CoreTypes.FixedLengthType) {
    this.size_ = size;
    this.native.setFixed(true);
    const unitValue = toUnitValue(size);
    if (unitValue) {
      if (this.orientation_ === 'horizontal') {
        this.native.setWidth(unitValue.value, unitValue.unit);
      } else {
        this.native.setHeight(unitValue.value, unitValue.unit);
      }
    }
    return this;
  }
}

export function Spacer(sizeOrOrientation?: CoreTypes.FixedLengthType | 'horizontal' | 'vertical') {
  return new SpacerView(sizeOrOrientation);
}

export function Stack(count?: number, content?: (index: number) => RemoteViews) {
  const view = new StackView();
  if (count != null && content) {
    for (let i = 0; i < count; i++) {
      view.addItem(content(i));
    }
  }
  return view;
}

export function Text(text: string) {
  const ret = new TextView();
  if (text) {
    ret.native.setText(text);
  }
  return ret;
}

export function Button(content: string | number | ImageSource, action?: () => void) {
  if (typeof content === 'string') {
    const button = new ButtonView();
    button.native.setText(content);
    return button;
  }

  const button = new ImageButton();
  if (typeof content === 'string') {
    // button.native.setImageURI(NSURL.URLWithString(content));
  } else {
    //button.native.setImage(content.ios);
  }
  return button;
}

export function Image(source: ImageSource | number | string) {
  const ret = new ImageView();
  //    if (typeof source === 'string') {
  //     if (source.startsWith('http') || source.startsWith('https')) {
  //       ret.native.setImageUrl(source);
  //     } else {
  //       ret.native.setImageURI(android.net.Uri.parse(source));
  //     }
  //   } else if (source instanceof ImageSource) {
  //     ret.native.setImageBitmap(source.ios);
  //   }
  return ret;
}

export function Grid(columns: number, spacing?: number, content?: ViewBuilder): RemoteViews {
  // GridLayout doesn't work well with RemoteViews - simulate with nested layouts
  const container = new VLinearLayoutView();

  //   if (content) {
  //     const children = content();
  //     const views = Array.isArray(children) ? children.flat() : [children];
  //     const rows = Math.ceil(views.length / columns);
  //     const spacingPx = spacing ?? 0;

  //     for (let row = 0; row < rows; row++) {
  //       const rowLayout = new HLinearLayoutView();

  //       for (let col = 0; col < columns; col++) {
  //         const index = row * columns + col;

  //         // Add spacing between items
  //         if (col > 0 && spacingPx > 0) {
  //           rowLayout.addView(Spacer(spacingPx));
  //         }

  //         if (index < views.length) {
  //           const view = views[index];
  //           // Wrap in a flex container so items share space equally
  //           const wrapper = new VLinearLayoutView();
  //           wrapper.setFlex(true);
  //           wrapper.native.setInt('setGravity', 17); // center
  //           wrapper.addView(view);
  //           rowLayout.addView(wrapper);
  //         } else {
  //           // Empty placeholder to maintain grid structure
  //           const placeholder = new VLinearLayoutView();
  //           placeholder.setFlex(true);
  //           rowLayout.addView(placeholder);
  //         }
  //       }

  //       // Add spacing between rows
  //       if (row > 0 && spacingPx > 0) {
  //         container.addView(Spacer(spacingPx));
  //       }
  //       container.addView(rowLayout);
  //     }
  //   }

  return container;
}

export function Switch(checked: boolean) {
  const ret = new SwitchView();
  // ret.setChecked(checked);
  return ret;
}

export function CheckBox(checked: boolean) {
  const ret = new CheckBoxView();
  // ret.setChecked(checked);
  return ret;
}

export function RadioButton(checked: boolean) {
  const ret = new RadioButtonView();
  // ret.setChecked(checked);
  return ret;
}

export class RootLayoutView extends RemoteViews {
  constructor(id?: string) {
    super();
    // this[native_] = new org.nativescript.widgets.RemoteViews.RootLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }
}

export class AdapterViewFlipper extends RemoteViews {
  constructor(id?: string) {
    super();
    //  this[native_] = new org.nativescript.widgets.RemoteViews.AdapterViewFlipper(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addItem(item: RemoteViews): this {
    this.native.addItem(item.native);
    return this;
  }

  setAutoStart(autoStart: boolean): this {
    this.native.setAutoStart(autoStart);
    return this;
  }

  setEmptyView(view: RemoteViews): this {
    this.native.setEmptyView(view.native);
    return this;
  }
}

export class ButtonView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.Button(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setTextSize(size: number): this {
    this.native.setTextSize(size, android.util.TypedValue.COMPLEX_UNIT_SP);
    return this;
  }
}

export class ChronometerView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.Chronometer(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setBase(base: number): this {
    this.native.setBase(base);
    return this;
  }

  /**
   * Set target time using Unix timestamp (Date.now() style).
   * Automatically converts to SystemClock.elapsedRealtime() base.
   * For countdown: pass future timestamp (Date.now() + milliseconds)
   * For count up: pass past timestamp
   */
  setTargetTime(targetTime: number): this {
    this.native.setTargetTime(targetTime);
    return this;
  }

  setFormat(format: string): this {
    this.native.setFormat(format);
    return this;
  }

  setCountDown(countDown: boolean): this {
    this.native.setCountDown(countDown);
    return this;
  }

  start(): this {
    this.native.start();
    return this;
  }

  stop(): this {
    this.native.stop();
    return this;
  }

  setColor(color: Color | string): this {
    if (typeof color === 'string') {
      this.native.setTextColor(new Color(color).android);
    } else if (color instanceof Color) {
      this.native.setTextColor(color.android);
    }
    return this;
  }

  setTextSize(size: number): this {
    this.native.setTextSize(size, android.util.TypedValue.COMPLEX_UNIT_SP);
    return this;
  }
}

export class FrameLayout extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.FrameLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
    return this;
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
    return this;
  }
}

export class GridLayoutView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.GridLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }
}

export class GridView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.GridView(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }

  addItem(item: RemoteViews): this {
    this.native.addItem(item.native);
    return this;
  }

  setEmptyView(view: RemoteViews): this {
    this.native.setEmptyView(view.native);
    return this;
  }
}

export class ImageButton extends RemoteViews {
  constructor(id?: string) {
    super();
    // this[native_] = new org.nativescript.widgets.RemoteViews.ImageButton(id ?? null);
  }

  get native() {
    return this[native_];
  }

  resolveRemoteResources() {
    this.native.resolveRemoteResources();
  }
}

export class ImageView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.ImageView(id ?? null);
  }

  get native() {
    return this[native_];
  }

  resolveRemoteResources() {
    this.native.resolveRemoteResources();
  }
}

export class HLinearLayoutView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.HLinearLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }

  setFlex(value: boolean): this {
    this.native.setFlex(value);
    return this;
  }
}

export class VLinearLayoutView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.LinearLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }

  setFlex(value: boolean): this {
    this.native.setFlex(value);
    return this;
  }
}

export class ListView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.ListView(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addItem(item: RemoteViews): this {
    this.native.addItem(item.native);
    return this;
  }

  setEmptyView(view: RemoteViews): this {
    this.native.setEmptyView(view.native);
    return this;
  }
}

export class ProgressBarView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.ProgressBar(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setProgressBar(max: number, progress: number, indeterminate: boolean): this {
    this.native.setProgressBar(max, progress, indeterminate);
    return this;
  }

  setFlex(value: boolean): this {
    this.native.setFlex(value);
    return this;
  }

  setFullWidth(value: boolean): this {
    this.native.setFullWidth(value);
    return this;
  }
}

export class RelativeLayoutView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.RelativeLayout(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }
}

export class StackView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.StackView(id ?? null);
  }

  get native() {
    return this[native_];
  }

  addView(view: RemoteViews) {
    this.native.addView(view.native);
  }

  removeView(view: RemoteViews) {
    this.native.removeView(view.native);
  }

  addItem(item: RemoteViews): this {
    this.native.addItem(item.native);
    return this;
  }

  setEmptyView(view: RemoteViews): this {
    this.native.setEmptyView(view.native);
    return this;
  }
}

export class TextView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.TextView(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setColor(color: Color | string) {
    if (typeof color === 'string') {
      this.native.setTextColor(new Color(color).android);
    } else {
      if (color && color instanceof Color) {
        this.native.setTextColor(color.android);
      }
    }
    return this;
  }

  setTextSize(size: number): this {
    this.native.setTextSize(size, android.util.TypedValue.COMPLEX_UNIT_SP);
    return this;
  }
}

export class TextClockView extends RemoteViews {
  constructor(id?: string) {
    super();
    //   this[native_] = new org.nativescript.widgets.RemoteViews.TextClock(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setFormat12Hour(format: string): this {
    // TextClock.setFormat12Hour is not remotable in RemoteViews
    return this;
  }

  setFormat24Hour(format: string): this {
    // TextClock.setFormat24Hour is not remotable in RemoteViews
    return this;
  }

  setTimeZone(timeZone: string): this {
    // TextClock.setTimeZone is not remotable in RemoteViews
    return this;
  }

  setColor(color: Color | string): this {
    if (typeof color === 'string') {
      this.native.setTextColor(new Color(color).android);
    } else if (color instanceof Color) {
      this.native.setTextColor(color.android);
    }
    return this;
  }

  setTextSize(size: number): this {
    this.native.setTextSize(size, android.util.TypedValue.COMPLEX_UNIT_SP);
    return this;
  }
}

export class CheckBoxView extends RemoteViews {
  constructor(id?: string) {
    super();
    //  this[native_] = new org.nativescript.widgets.RemoteViews.CheckBox(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setChecked(checked: boolean): this {
    this.native.setChecked(checked);
    return this;
  }
}

export class RadioButtonView extends RemoteViews {
  constructor(id?: string) {
    super();
    // this[native_] = new org.nativescript.widgets.RemoteViews.RadioButton(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setChecked(checked: boolean): this {
    this.native.setChecked(checked);
    return this;
  }
}

export class SwitchView extends RemoteViews {
  constructor(id?: string) {
    super();
    // this[native_] = new org.nativescript.widgets.RemoteViews.Switch(id ?? null);
  }

  get native() {
    return this[native_];
  }

  setChecked(checked: boolean): this {
    this.native.setChecked(checked);
    return this;
  }
}

function toJSArray(array: androidNative.Array<number>) {
  const jsArray: number[] = [];
  for (let i = 0; i < array.length; i++) {
    jsArray.push(array[i]);
  }
  return jsArray;
}

let mgn: WidgetManager;
export function registerWidgetListener(provider: string, listener: IWidgetListener) {
  /*
  org.nativescript.widgets.AppWidgetManager.INSTANCE.register(
    provider,
    new org.nativescript.widgets.AppWidgetManager.WidgetListener({
      onEnabled(provider) {
        if (listener.onEnabled) {
          listener.onEnabled(provider);
        }
      },
      onUpdateAsync(context, provider, appWidgetIds, manager, widgetManager) {
        if (!manager) {
          mgn = WidgetManager.fromNative(org.nativescript.widgets.AppWidgetManager.INSTANCE);
        }
        if (listener.onUpdateAsync) {
          listener.onUpdateAsync({ provider, appWidgetIds: toJSArray(appWidgetIds), manager: mgn, widgetManager: PlatformWidgetManager.fromNative(widgetManager) });
        }
      },
      onUpdate(context, provider, appWidgetIds, manager, widgetManager) {
        if (listener.onUpdate) {
          listener.onUpdate({ provider, appWidgetIds: toJSArray(appWidgetIds), manager: mgn, widgetManager: PlatformWidgetManager.fromNative(widgetManager) });
        }
      },
      onDeleted(provider, appWidgetIds) {
        if (listener.onDeleted) {
          listener.onDeleted({ provider, appWidgetIds: toJSArray(appWidgetIds) });
        }
      },
      onDisabled(provider) {
        if (listener.onDisabled) {
          listener.onDisabled(provider);
        }
      },
      onAction(context, provider, action, extras) {
        if (listener.onClick) {
          listener.onClick({ action, extras: extras ? fromBundle(extras) : {}, provider });
        }
      },
      onOptionsChanged(context, provider, appWidgetId, newOptions, manager, widgetManager) {
        if (listener.onResize) {
          const minWidth = newOptions.getInt(android.appwidget.AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH, 0);
          const minHeight = newOptions.getInt(android.appwidget.AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT, 0);
          const maxWidth = newOptions.getInt(android.appwidget.AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH, 0);
          const maxHeight = newOptions.getInt(android.appwidget.AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT, 0);
          listener.onResize({
            provider,
            appWidgetId,
            minWidth,
            minHeight,
            maxWidth,
            maxHeight,
            manager: mgn,
            widgetManager: PlatformWidgetManager.fromNative(widgetManager),
          });
        }
      },
    }),
  );
  */
}

export function unregisterWidgetListener(provider: string) {
  /*
  org.nativescript.widgets.AppWidgetManager.INSTANCE.unregister(provider);
  */
}

export function updateWidget(provider: string, root: RemoteViews, widgetIds?: number | number[], context?: any) {
  /*  const ctx = context ?? Utils.android.getApplicationContext();
  if (widgetIds == null) {
    org.nativescript.widgets.AppWidgetManager.INSTANCE.updateAppWidget(ctx, provider, root.native);
  } else if (Array.isArray(widgetIds)) {
    org.nativescript.widgets.AppWidgetManager.INSTANCE.updateAppWidget(ctx, provider, widgetIds, root.native);
  } else {
    org.nativescript.widgets.AppWidgetManager.INSTANCE.updateAppWidget(ctx, provider, widgetIds, root.native);
  }
  */
}
