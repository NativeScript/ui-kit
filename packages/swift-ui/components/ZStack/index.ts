// @ts-nocheck
import { ContentView, LayoutBase, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';

export class ZStack extends LayoutBase {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = ZStackProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.props.alignment = 'top';
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
