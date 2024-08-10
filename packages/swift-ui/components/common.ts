import { LayoutBase, Property, Utils, View } from '@nativescript/core';
import { SwiftUI } from '..';

export class SwiftUIBase extends View {}

const modifiersProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

type FrameModifier = { width: number; height: number };
const frameProperty = new Property<SwiftUIViewBase, FrameModifier>({
  name: 'frame',
});

export class SwiftUIViewBase extends View {
  provider: UIViewController & any;
  modifiers: Array<any>;
  props: any = {};

  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }
  [frameProperty.setNative](value: FrameModifier) {
    if (value) {
      this.updateModifier('frame', value);
    }
  }
  [modifiersProperty.setNative](value: any) {
    if (!value) {
      value = [];
    }
    // NOTE: maybe always add frame?
    // const frameIndex = value.findIndex((m) => !!m.frame);
    // if (frameIndex === -1) {
    //   value.push({ frame: { width: this.width, height: this.height } });
    // }
    this.props.modifiers = value;
    // console.log('update base modifiers!', this.width, this.height);
    this.updateData();
  }
  updateModifier(key: string, value: any) {
    let modifiers = this.props.modifiers;
    if (!modifiers) {
      modifiers = [];
    }
    const index = modifiers.findIndex((m) => !!m[key]);
    if (index > -1) {
      modifiers[index][key] = value;
      modifiers = [...modifiers];
    } else {
      modifiers = [
        ...modifiers,
        {
          [key]: value,
        },
      ];
    }
    console.log('modifiers:', modifiers);
    this.modifiers = modifiers;
  }

  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersProperty.register(SwiftUIViewBase);
frameProperty.register(SwiftUIViewBase);

const modifiersLayoutProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

export class SwiftUILayoutBase extends LayoutBase {
  provider: UIViewController & any;
  props: any = {};
  [modifiersLayoutProperty.setNative](value: any) {
    this.props.modifiers = value;
    this.updateData();
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersLayoutProperty.register(SwiftUILayoutBase as any);
