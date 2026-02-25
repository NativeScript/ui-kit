# @nativescript/widgets

This package provides a small DSL and runtime helpers to build App Widgets for NativeScript apps on both Android and iOS. It exposes composable layout primitives (VStack/HStack/Grid/Spacer), basic views (Text, Image, Button, Chronometer, Clock, ProgressBar, List, Flipper, Stack) and helper functions to update widgets from your app.

The Android implementation is built on top of Android RemoteViews; because of that RemoteViews' runtime restrictions apply (see Limitations below). The `ns widget android` command creates an Android AppWidget provider and metadata XML. For iOS widget guidance see:

- https://docs.nativescript.org/guide/widgets-ios

The NativeScript CLI provides `ns widget android` to create Android provider files; combined with `@nativescript/widgets` to handle widgets.

## Quick install

```bash
npm install @nativescript/widgets
```

## Basic usage

Register a widget listener and update widgets from your app code. The sample below is from the demo app and shows common patterns.

```ts
import { registerWidgetListener, Root, VStack, HStack, Text, Chronometer, Grid, Spacer, updateWidget } from '@nativescript/widgets';

registerWidgetListener('org.nativescript.plugindemo.PluginDemoWidgetProvider', {
  onUpdate: (event) => {
    const targetTime = Date.now() + 3600_000; // 1 hour
    const root = Root(() =>
      VStack(() => [
        Text('⏱️ Countdown').setTextSize(18),
        Spacer(12),
        Chronometer({ targetTime, countDown: true, started: true }).setTextSize(32),
        Spacer(8),
        Text('until deadline').setTextSize(12),
      ]),
    ).setBackgroundColor('#ffffff').setPadding(16);

    for (const id of event.appWidgetIds) updateWidget(event.provider, root, id);
  }
});
```

## Grid example (quick actions)

```ts
function gridWidget(provider: string, ids: number[]) {
  const actions = [
    { icon: '📞', label: 'Call', color: '#3498db', bg: '#ebf5fb' },
    { icon: '💬', label: 'Message', color: '#9b59b6', bg: '#f5eef8' },
    { icon: '📧', label: 'Email', color: '#e74c3c', bg: '#fdedec' },
    { icon: '📅', label: 'Calendar', color: '#27ae60', bg: '#eafaf1' },
    { icon: '📷', label: 'Camera', color: '#f39c12', bg: '#fef9e7' },
    { icon: '🎵', label: 'Music', color: '#e91e63', bg: '#fce4ec' },
  ];

  const root = Root(() =>
    VStack(() => [
      HStack(() => [Text('⚡ Quick Actions').setTextSize(18), Spacer(), Text('6 apps').setTextSize(12)]),
      Spacer(16),
      Grid(3, 12, () =>
        actions.map((action) =>
          VStack(() => [
            Text(action.icon).setTextSize(28),
            Spacer(6),
            Text(action.label).setColor(action.color).setTextSize(11),
          ]).setBackgroundColor(action.bg).setPadding(12),
        ),
      ),
    ]),
  ).setBackgroundColor('#ffffff').setPadding(16);

  for (const id of ids) updateWidget(provider, root, id);
}
```

## API notes

- Use `Chronometer({ targetTime: Date.now() + ms })` when you have a Unix timestamp — the library converts it to the required `SystemClock.elapsedRealtime()` base for RemoteViews.
- `ProgressBar` supports `flex` and `fullWidth` layouts — use `flex` inside horizontal stacks to share space, or `fullWidth` to make the bar match parent width.
- `Spacer()` without args expands (weighted); `Spacer(8)` creates a fixed 8dp gap.

## Limitations and implementation details

- Android RemoteViews cannot modify LayoutParams for arbitrary views at runtime. To emulate responsive grids we generate rows of weighted LinearLayouts (each child gets `layout_width=0dp` and `layout_weight=1`) — similar to how Jetpack Glance implements weighted rows.
- Because widget provider metadata (the `appwidget-provider` XML) controls default size and resize behavior, scaffold with `ns widget android` to ensure the correct `minWidth`/`minHeight` and `resizeMode` values.


## Contributing

- The demo app `apps/demo/src/app.ts` contains example widgets (countdown, clock, progress, list, slideshow, grid, stack, dashboard). Use them as a starting point when building your widgets.

## License

Apache License Version 2.0
