// @ts-nocheck
import { LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUILayoutBase } from '../common';

const spacingProperty = new Property<SUButton, number>({
  name: 'spacing',
});

export class HStack extends SwiftUILayoutBase {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = HStackProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.props.alignment = 'center';
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
    this.props.children.push(view.nativeViewProtected);
    this.updateData();
    return true;
  }
  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

spacingProperty.register(HStack);
