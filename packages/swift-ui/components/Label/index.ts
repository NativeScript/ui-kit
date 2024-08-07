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
    this.props.title = value;
    this.updateData();
  }
  [systemImageProperty.setNative](value: string) {
    this.props.systemImage = value;
    this.updateData();
  }
}

titleProperty.register(Label);
systemImageProperty.register(Label);
