import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const sectionsProperty = new Property<List, Array<any>>({
  name: 'sections',
});

export class List extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ListProvider.new();
    return this.provider.view;
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
}

sectionsProperty.register(List);
