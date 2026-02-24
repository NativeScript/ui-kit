import { CoreTypes, Color, ImageSource } from '@nativescript/core';

export class PlatformRemoteViews {
  readonly native: any;
}

export class WidgetManager {
  readonly native: any;
}

export class PlatformWidgetManager {
  readonly native: any;
}

export class RemoteViews {
  readonly native: any;

  setBackgroundColor(color: Color | string): this;

  setWidth(value: CoreTypes.FixedLengthType): this;

  setHeight(value: CoreTypes.FixedLengthType): this;

  setSize(width: CoreTypes.FixedLengthType, height: CoreTypes.FixedLengthType): this;

  setPendingIntentTemplate(intent: any): this;

  setOnClickFillInIntent(intent: any): this;

  onClick(action: string, extras?: Record<string, string | number | boolean>): this;

  onItemClick(action: string, extras?: Record<string, string | number | boolean>): this;

  toPlatformViews(packageName?: string): PlatformRemoteViews;

  setPadding(value: CoreTypes.FixedLengthType): this;

  setPadding(left: CoreTypes.FixedLengthType, top: CoreTypes.FixedLengthType, right: CoreTypes.FixedLengthType, bottom: CoreTypes.FixedLengthType): this;

  setMargin(value: CoreTypes.FixedLengthType): this;

  setMargin(left: CoreTypes.FixedLengthType, top: CoreTypes.FixedLengthType, right: CoreTypes.FixedLengthType, bottom: CoreTypes.FixedLengthType): this;
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

export type WidgetListener = IWidgetListener;

export function registerWidgetListener(provider: string, listener: WidgetListener);
export function unregisterWidgetListener(provider: string);
export function updateWidget(provider: string, root: RemoteViews, widgetIds?: number | number[], context?: any): void;

export type ViewBuilder = () => RemoteViews | RemoteViews[];

export class ButtonView extends RemoteViews {
  constructor(id?: string);
  setTextSize(size: number): this;
}

export class TextView extends RemoteViews {
  constructor(id?: string);
  setColor(color: Color | string): this;
  setTextSize(size: number): this;
}

export class ChronometerView extends RemoteViews {
  constructor(id?: string);
  setBase(base: number): this;
  /**
   * Set target time using Unix timestamp (Date.now() style).
   * Automatically converts to SystemClock.elapsedRealtime() base.
   * For countdown: pass future timestamp (Date.now() + milliseconds)
   * For count up: pass past timestamp
   */
  setTargetTime(targetTime: number): this;
  setFormat(format: string): this;
  setCountDown(countDown: boolean): this;
  start(): this;
  stop(): this;
  setColor(color: Color | string): this;
  setTextSize(size: number): this;
}

export class ProgressBarView extends RemoteViews {
  constructor(id?: string);
  setProgress(progress: number): this;
  setMax(max: number): this;
  setIndeterminate(indeterminate: boolean): this;
  setFlex(value: boolean): this;
  setFullWidth(value: boolean): this;
}

export class TextClockView extends RemoteViews {
  constructor(id?: string);
  setFormat12Hour(format: string): this;
  setFormat24Hour(format: string): this;
  setTimeZone(timeZone: string): this;
  setColor(color: Color | string): this;
  setTextSize(size: number): this;
}

export class ViewGroupLike extends RemoteViews {
  addView(view: RemoteViews): this;
  removeView(view: RemoteViews): this;
}

export class FrameLayout extends ViewGroupLike {
  constructor(id?: string);
}

export class GridLayout extends ViewGroupLike {
  constructor(id?: string);
}

export class LinearLayout extends ViewGroupLike {
  constructor(id?: string);
}

export class RelativeLayoutView extends ViewGroupLike {
  constructor(id?: string);
}

export class ImageViewLike extends RemoteViews {
  setImageResource(resourceId: number): this;
  setImageURI(uri: string): this;
  setImageBitmap(bitmap: any): this;
  setImageSource(value: ImageSource): this;
  resolveRemoteResources();
}

export class ImageButton extends ImageViewLike {
  constructor(id?: string);
}

export class ImageView extends ImageViewLike {
  constructor(id?: string);
}

export class AdapterViewFlipper extends RemoteViews {
  constructor(id?: string);
  addItem(item: RemoteViews): this;
  setEmptyView(view: RemoteViews): this;
}

export class GridView extends ViewGroupLike {
  constructor(id?: string);
  addItem(item: RemoteViews): this;
  setEmptyView(view: RemoteViews): this;
}

export class ListView extends RemoteViews {
  constructor(id?: string);
  addItem(item: RemoteViews): this;
  setEmptyView(view: RemoteViews): this;
}

export class StackView extends ViewGroupLike {
  constructor(id?: string);
  addItem(item: RemoteViews): this;
  setEmptyView(view: RemoteViews): this;
}

export class SpacerView extends RemoteViews {
  constructor(sizeOrOrientation?: CoreTypes.FixedLengthType | 'horizontal' | 'vertical');
  setOrientation(orientation: 'horizontal' | 'vertical'): this;
  setSize(size: CoreTypes.FixedLengthType): this;
}

export class RootLayoutView extends RemoteViews {}

export function Root(content?: ViewBuilder): RemoteViews;
export function VStack(content?: ViewBuilder): RemoteViews;
export function HStack(content?: ViewBuilder): RemoteViews;
export function ZStack(content?: ViewBuilder): RemoteViews;

export function Text(text: string): TextView;
export function Button(content: string | number | ImageSource, action?: () => void): RemoteViews;
export function Image(source: ImageSource | number | string): RemoteViews;
export function Spacer(sizeOrOrientation?: CoreTypes.FixedLengthType | 'horizontal' | 'vertical'): SpacerView;

export function Grid(columns: number, spacing?: number, content?: ViewBuilder): RemoteViews;
export function RelativeLayout(content?: ViewBuilder): RemoteViews;

export function Chronometer(options?: {
  /** Raw base in SystemClock.elapsedRealtime() units */
  base?: number;
  /** Unix timestamp (Date.now() style) - automatically converted */
  targetTime?: number;
  format?: string;
  countDown?: boolean;
  started?: boolean;
  color?: Color | string;
}): ChronometerView;
export function Clock(options?: { format12Hour?: string; format24Hour?: string; timeZone?: string; color?: Color | string }): TextClockView;
export function ProgressBar(options?: { progress?: number; max?: number; indeterminate?: boolean; flex?: boolean; fullWidth?: boolean }): ProgressBarView;

export function List(count: number, content: (index: number) => RemoteViews, emptyView?: () => RemoteViews): RemoteViews;
export function Flipper<T>(items: T[], interval?: number, content?: (item: T, index: number) => RemoteViews): RemoteViews;
export function Stack(count?: number, content?: (index: number) => RemoteViews): RemoteViews;

export function ForEach<T>(items: T[], id?: keyof T | ((item: T) => string | number), content?: (item: T, index: number) => RemoteViews): RemoteViews[];

export interface ViewModifers {
  padding?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
  width?: number;
  height?: number;
  backgroundColor?: string | Color;
}

export interface ViewLike {
  id?: string;
  modifier?: ViewModifers;
}
export interface GroupLike extends ViewLike {
  children?: ViewLike[];
}

export interface ImageLike extends ViewLike {
  uri?: string;
  resourceId?: number;
  bitmap?: any;
  imageSource?: ImageSource;
}
