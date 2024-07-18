// @ts-nocheck
import { ContentView, LayoutBase, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

export class Spacer extends SwiftUIViewBase {
  createNativeView() {
    this.provider = SpacerProvider.new();
    return this.provider.view;
  }
}
