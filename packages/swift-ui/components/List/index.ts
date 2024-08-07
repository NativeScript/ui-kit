// @ts-nocheck
import { ContentView, GridLayout, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { BaseSwiftUIComponentProps, SwiftUIViewBase } from '../../common';

const sectionsProperty = new Property<List, Array<any>>({
  name: 'sections',
});

export class List extends SwiftUIViewBase {
  provider: UIViewController;
  props = {
    sections: [],
    children: [],
  };

  createNativeView() {
    this.provider = ListProvider.new();
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

  // addChild(view: View): void {
  //   const autoLayout = new AutoLayoutView();
  //   autoLayout.addChild(view);
  //   super.addChild(autoLayout);
  // }

  // _addViewToNativeVisualTree(view: ViewBase, atIndex?: number): boolean {
  //   // super._addViewToNativeVisualTree(view, atIndex);
  //   this.props.items[0].children.push(view.nativeViewProtected);
  //   this.updateData();
  //   // console.log('this.props:', this.props);
  //   // console.log('_addViewToNativeVisualTree', view.nativeViewProtected);
  //   return true;
  // }

  [sectionsProperty.setNative](value: any) {
    this.props.sections = value;
    this.updateData();
  }

  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

sectionsProperty.register(List);
