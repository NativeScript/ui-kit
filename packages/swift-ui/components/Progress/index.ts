import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const valueProperty = new Property<Progress, number>({
  name: 'value',
  valueConverter: (value) => Number(value),
});

const totalProperty = new Property<Progress, number>({
  name: 'total',
  valueConverter: (value) => Number(value),
});

const tintProperty = new Property<Progress, string>({
  name: 'tint',
});

export class Progress extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ProgressViewProvider.new();
    return this.provider.view;
  }

  [valueProperty.setNative](value: number) {
    this.updateData(valueProperty.name, value);
  }

  [totalProperty.setNative](value: number) {
    this.updateData(totalProperty.name, value);
  }
  [tintProperty.setNative](value: string) {
    if (value) {
      this.updateModifier(tintProperty.name, value);
    }
  }
}

valueProperty.register(Progress);
totalProperty.register(Progress);
tintProperty.register(Progress);
