// @ts-nocheck
import { ContentView, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

const titleProperty = new Property<Label, string>({
  name: 'title',
});

const systemImageProperty = new Property<Label, string>({
  name: 'systemImage',
});

export class Label extends SwiftUIViewBase {
  createNativeView() {
    this.provider = LabelViewProvider.new();
    return this.provider.view;
  }

  [titleProperty.setNative](value: string) {
    this.updateData(titleProperty.name, value);
  }
  [systemImageProperty.setNative](value: string) {
    this.updateData(systemImageProperty.name, value);
  }
}

titleProperty.register(Label);
systemImageProperty.register(Label);
