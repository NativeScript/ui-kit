// @ts-nocheck
import { ContentView, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

const textProperty = new Property<Text, string>({
  name: 'text',
});

export class Text extends SwiftUIViewBase {
  createNativeView() {
    this.provider = TextViewProvider.new();
    return this.provider.view;
  }

  [textProperty.setNative](value: string) {
    this.props.text = `${Utils.isUndefined(value) ? '' : value}`;
    this.updateData();
  }
}

textProperty.register(Text);
