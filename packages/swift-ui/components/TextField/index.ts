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
    this.props.text = value;
    this.updateData();
  }
  [placeholderProperty.setNative](value: string) {
    this.props.placeholder = value;
    this.updateData();
  }
  [typeProperty.setNative](value: TextFieldType) {
    // console.log('typeProperty.setNative:', value);
    this.props.type = value;
    this.updateData();
  }
}

textProperty.register(TextField);
placeholderProperty.register(TextField);
typeProperty.register(TextField);
