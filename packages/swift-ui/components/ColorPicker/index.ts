import { booleanConverter, Color, Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const titleProperty = new Property<ColorPicker, string>({
  name: 'title',
});

const selectionProperty = new Property<ColorPicker, string>({
  name: 'selection',
});

const supportsOpacityProperty = new Property<ColorPicker, boolean>({
  name: 'supportsOpacity',
  valueConverter: booleanConverter,
});

export class ColorPicker extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ColorPickerProvider.new();
    return this.provider.view;
  }

  [titleProperty.setNative](value: string) {
    this.updateData(titleProperty.name, value);
  }
  [selectionProperty.setNative](value: string) {
    this.updateData(selectionProperty.name, new Color(value).ios);
  }
  [supportsOpacityProperty.setNative](value: boolean) {
    this.updateData(supportsOpacityProperty.name, value);
  }
}

titleProperty.register(ColorPicker);
selectionProperty.register(ColorPicker);
supportsOpacityProperty.register(ColorPicker);
