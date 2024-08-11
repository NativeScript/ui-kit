import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const selectionProperty = new Property<Picker, string>({
  name: 'selection',
});

const optionsProperty = new Property<Picker, Array<string>>({
  name: 'options',
});

type PickerStyle = 'wheel' | 'segmented' | 'menu';
const pickerStyleProperty = new Property<Picker, PickerStyle>({
  name: 'pickerStyle',
});

export class Picker extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = PickerViewProvider.new();
    return this.provider.view;
  }

  [selectionProperty.setNative](value: string) {
    this.updateData(selectionProperty.name, value);
  }
  [optionsProperty.setNative](value: Array<string>) {
    this.updateData(optionsProperty.name, value);
  }
  [pickerStyleProperty.setNative](value: string) {
    if (value) {
      this.updateModifier(pickerStyleProperty.name, value);
    }
  }
}

selectionProperty.register(Picker);
optionsProperty.register(Picker);
pickerStyleProperty.register(Picker);
