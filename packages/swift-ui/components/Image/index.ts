import { booleanConverter, Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const systemNameProperty = new Property<ImageView, string>({
  name: 'systemName',
});

const variableValueProperty = new Property<ImageView, number>({
  name: 'variableValue',
});

type ImageViewScale = 'small' | 'medium' | 'large';
const imageScaleProperty = new Property<ImageView, ImageViewScale>({
  name: 'imageScale',
});

const foregroundStyleProperty = new Property<ImageView, string>({
  name: 'foregroundStyle',
});

const boldProperty = new Property<ImageView, boolean>({
  name: 'bold',
  valueConverter: booleanConverter,
});

export class ImageView extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ImageViewProvider.new();
    return this.provider.view;
  }

  [systemNameProperty.setNative](value: string) {
    this.updateData(systemNameProperty.name, value);
  }
  [variableValueProperty.setNative](value: number) {
    this.updateData(variableValueProperty.name, value);
  }
  [imageScaleProperty.setNative](value: ImageViewScale) {
    if (value) {
      this.updateModifier(imageScaleProperty.name, value);
    }
  }
  [foregroundStyleProperty.setNative](value: string) {
    if (value) {
      this.updateModifier(foregroundStyleProperty.name, value);
    }
  }
  [boldProperty.setNative](value: boolean) {
    if (value) {
      this.updateModifier(boldProperty.name, value);
    }
  }
}

systemNameProperty.register(ImageView);
variableValueProperty.register(ImageView);
imageScaleProperty.register(ImageView);
foregroundStyleProperty.register(ImageView);
boldProperty.register(ImageView);
