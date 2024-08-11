import { Property, Utils } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const textProperty = new Property<Text, string>({
  name: 'text',
});

export class Text extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = TextViewProvider.new();
    return this.provider.view;
  }

  [textProperty.setNative](value: string) {
    this.updateData(textProperty.name, `${Utils.isNullOrUndefined(value) ? '' : value}`);
  }
}

textProperty.register(Text);
