import { Property } from '@nativescript/core';
import { SwiftUILayoutBase } from '../common';

export const colorProperty = new Property<Color, string>({
  name: 'color',
});

export class Color extends SwiftUILayoutBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ColorProvider.new();
    return this.provider.view;
  }

  [colorProperty.setNative](value: string) {
    this.updateData(colorProperty.name, value);
  }
}
colorProperty.register(Color);
