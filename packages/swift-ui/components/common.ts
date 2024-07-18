import { LayoutBase, Property, Utils, View } from '@nativescript/core';
import { SwiftUI } from '..';

export class SwiftUIBase extends View {}

const modifiersProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

export class SwiftUIViewBase extends View {
  provider: UIViewController & any;
  props = {
    children: [],
    modifiers: [],
  };

  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }
  [modifiersProperty.setNative](value: any) {
    this.props.modifiers = value;
    this.updateData();
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersProperty.register(SwiftUIViewBase);

const modifiersLayoutProperty = new Property<SwiftUIViewBase, string>({
  name: 'modifiers',
});

export class SwiftUILayoutBase extends LayoutBase {
  provider: UIViewController & any;
  props = {
    children: [],
    modifiers: [],
  };
  [modifiersLayoutProperty.setNative](value: any) {
    this.props.modifiers = value;
    this.updateData();
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersLayoutProperty.register(SwiftUILayoutBase as any);
