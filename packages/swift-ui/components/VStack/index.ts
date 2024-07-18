// @ts-nocheck
import { ContentView, GridLayout, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';

const spacingProperty = new Property<SUButton, number>({
  name: 'spacing',
});

export class VStack extends LayoutBase {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = VStackProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.props.alignment = 'trailing';
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }

  addChild(view: View): void {
    const autoLayout = new AutoLayoutView();
    autoLayout.addChild(view);
    super.addChild(autoLayout);
  }

  _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
    // super._addViewToNativeVisualTree(view, atIndex);
    this.props.children.push(view.nativeViewProtected);
    this.updateData();
    // console.log('this.props:', this.props);
    // console.log('_addViewToNativeVisualTree', view.nativeViewProtected);
    return true;
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

spacingProperty.register(VStack);
