// @ts-nocheck
import { Property, Utils, View } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const textProperty = new Property<TextField, string>({
  name: 'text',
  valueConverter: (v) => `${v || ''}`,
});

const placeholderProperty = new Property<TextField, string>({
  name: 'placeholder',
  valueConverter: (v) => `${v || ''}`,
});

type TextFieldType = 'textfield' | 'securefield' | 'texteditor';
const typeProperty = new Property<TextField, TextFieldType>({
  name: 'type',
});

export class TextField extends SwiftUIViewBase {
  createNativeView() {
    this.provider = TextFieldViewProvider.new();
    return this.provider.view;
  }

  [textProperty.setNative](value: string) {
    this.updateData(textProperty.name, value);
  }
  [placeholderProperty.setNative](value: string) {
    this.updateData(placeholderProperty.name, value);
  }
  [typeProperty.setNative](value: TextFieldType) {
    this.updateData(typeProperty.name, value);
  }
}

textProperty.register(TextField);
placeholderProperty.register(TextField);
typeProperty.register(TextField);
