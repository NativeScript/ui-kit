import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const titleProperty = new Property<DatePicker, string>({
  name: 'title',
});

const selectionProperty = new Property<DatePicker, string>({
  name: 'selection',
});

const displayedComponentsProperty = new Property<DatePicker, Array<string>>({
  name: 'displayedComponents',
});

export class DatePicker extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = DatePickerProvider.new();
    return this.provider.view;
  }

  [titleProperty.setNative](value: string) {
    this.updateData(titleProperty.name, value);
  }
  [selectionProperty.setNative](value: string) {
    this.updateData(selectionProperty.name, value);
  }
  [displayedComponentsProperty.setNative](value: Array<string>) {
    this.updateData(displayedComponentsProperty.name, value);
  }
}

titleProperty.register(DatePicker);
selectionProperty.register(DatePicker);
displayedComponentsProperty.register(DatePicker);
