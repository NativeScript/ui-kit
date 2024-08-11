import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const isOnProperty = new Property<Toggle, boolean>({
  name: 'isOn',
});

const labelProperty = new Property<Toggle, string>({
  name: 'label',
});

type ToggleStyle = 'button' | 'switch';
const toggleStyleProperty = new Property<Toggle, ToggleStyle>({
  name: 'toggleStyle',
});

export class Toggle extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ToggleViewProvider.new();
    return this.provider.view;
  }

  [isOnProperty.setNative](value: boolean) {
    this.updateData(isOnProperty.name, value);
  }
  [labelProperty.setNative](value: string) {
    this.updateData(labelProperty.name, value);
  }
  [toggleStyleProperty.setNative](value: ToggleStyle) {
    this.updateData(toggleStyleProperty.name, value);
  }
}

isOnProperty.register(Toggle);
labelProperty.register(Toggle);
toggleStyleProperty.register(Toggle);
