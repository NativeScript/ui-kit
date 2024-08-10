import { ContentView, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

const textProperty = new Property<Text, string>({
  name: 'text',
  valueConverter: (value) => `${Utils.isUndefined(value) ? '' : value}`,
});

export class Text extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = TextViewProvider.new();
    return this.provider.view;
  }

  [textProperty.setNative](value: string) {
    this.props.text = value;
    this.updateData();
  }
}

textProperty.register(Text);
