import { Property, Utils } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const valueProperty = new Property<Slider, number>({
  name: 'value',
  valueConverter: (value) => Number(value),
});

const stepProperty = new Property<Slider, number>({
  name: 'step',
  valueConverter: (value) => Number(value),
});

const labelTextProperty = new Property<Slider, string>({
  name: 'labelText',
});

const rangeProperty = new Property<Slider, Array<number>>({
  name: 'range',
});

export class Slider extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = SliderViewProvider.new();
    return this.provider.view;
  }

  [valueProperty.setNative](value: number) {
    this.updateData(valueProperty.name, value);
  }

  [stepProperty.setNative](value: number) {
    this.updateData(stepProperty.name, value);
  }

  [labelTextProperty.setNative](value: string) {
    this.updateData(labelTextProperty.name, `${Utils.isNullOrUndefined(value) ? '' : value}`);
  }

  [rangeProperty.setNative](value: Array<number>) {
    this.updateData(rangeProperty.name, value);
  }
}

valueProperty.register(Slider);
stepProperty.register(Slider);
labelTextProperty.register(Slider);
rangeProperty.register(Slider);
