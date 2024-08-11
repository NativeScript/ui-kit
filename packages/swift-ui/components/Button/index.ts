import { Property } from '@nativescript/core';
import { SwiftUILayoutBase, SwiftUIViewBase } from '../common';

export const titleProperty = new Property<Button, string>({
  name: 'title',
});

export class Button extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ButtonProvider.new();
    return this.provider.view;
  }

  [titleProperty.setNative](value: string) {
    this.updateData(titleProperty.name, `${value || ''}`);
  }
}
titleProperty.register(Button);
