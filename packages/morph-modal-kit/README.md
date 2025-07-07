# @nativescript/morph-modal-kit

*Note: Early release - have fun!*

Providing the brilliant [MorphModalKit](https://github.com/jsmmth/MorphModalKit) by [Joseph Smith](https://github.com/jsmmth) for NativeScript.

```javascript
npm install @nativescript/morph-modal-kit
```

## Usage

```ts
import { MorphModalKit } from '@nativescript/morph-modal-kit';

/**
 * view: Dynamically created view to show in modal
 * ref: the view reference which calls this api
 * options: morph option following MorphOptions
 */
MorphModalKit.open(view, ref, options);
```

Given a view with a tap binding which may open a morphing modal:

```html
<StackLayout>
  <button text="Open Morph Modal" tap="openModalMenu" />

  <StackLayout id="placeholder"> </StackLayout>
</StackLayout>
```

Using plain core, the following would dynamically create the provided view to open in the morphing modal:

```ts
export function openModalMenu(args: EventData) {
    const btn = args.object as Button;
    const placeholder = btn.page.getViewById("placeholder") as StackLayout;
    const lazy: View = Builder.load({
        path: "~/components",
        name: "morph-modal-content"
    });
    placeholder.addChild(lazy);
    MorphModalKit.open(lazy, btn);
}
```

More flavor examples will be posted in subsequent releases.

### MorphOptions

```ts
interface MorphOptions {
  animation: MorphModalAnimationSettings;

  cardShadowColor: UIColor;

  cardShadowOffset: CGSize;

  cardShadowOpacity: number;

  cardShadowRadius: number;

  centerIPadWidthMultiplier: number;

  centerOnIpad: boolean;

  cornerMask: 1 | 2 | 4 | 8;

  cornerRadius: number;

  dimBackgroundColor: UIColor;

  dimOpacityMultiplier: number;

  handleColor: UIColor;

  horizontalInset: number;

  keyboardSpacing: number;

  maxVisibleStack: number;

  modalBackgroundColor: UIColor;

  morphAnimation: MorphModalAnimationSettings;

  overlayColor: UIColor;

  overlayOpacity: number;

  removesSelfWhenCleared: boolean;

  showsHandle: boolean;

  stackVerticalSpacing: number;

  usesSnapshots: boolean;

  usesSnapshotsForMorph: boolean;
}

interface MorphAnimationSettings {
  damping: number;

  duration: number;

  velocity: number;
}
```

## Demo Examples from Joseph Smith

Demo examples are included in this early release so you can get a feel for it. Just pass `null` to first argument.

```ts
export function openModalMenu(args: EventData) {
    const btn = args.object as Button;
    MorphModalKit.open(null, btn);
}
```

## License

Apache License Version 2.0
