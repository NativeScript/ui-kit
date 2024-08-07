// @ts-nocheck
import { LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUILayoutBase } from '../common';

export const colorProperty = new Property<Color, string>({
  name: 'color',
});

export class Color extends SwiftUILayoutBase {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = ColorProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }

  [colorProperty.setNative](value: string) {
    this.props.color = value;
    this.updateData();
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}
colorProperty.register(Color);
