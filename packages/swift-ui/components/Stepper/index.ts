// @ts-nocheck
import { ContentView, LayoutBase, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

export class Stepper extends SwiftUIViewBase {
  createNativeView() {
    this.provider = StepperViewProvider.new();
    return this.provider.view;
  }
}
