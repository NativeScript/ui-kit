// @ts-nocheck
import { LayoutBase, Property, Utils, View } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';

const isOnProperty = new Property<Toggle, boolean>({
  name: 'isOn',
});

const labelProperty = new Property<Toggle, string>({
  name: 'label',
});

const modifiersProperty = new Property<Toggle, string>({
  name: 'modifiers',
});

export class Toggle extends View {
  provider: UIViewController;
  props = {
    children: [],
  };

  createNativeView() {
    this.provider = ToggleViewProvider.new();
    return this.provider.view;
  }
  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: SwiftUI.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }

  [modifiersProperty.setNative](value: any) {
    this.props.modifiers = value;
    this.updateData();
  }
  [isOnProperty.setNative](value: string) {
    this.props.isOn = value;
    this.updateData();
  }
  [labelProperty.setNative](value: string) {
    this.props.label = value;
    this.updateData();
  }

  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersProperty.register(Toggle);
isOnProperty.register(Toggle);
labelProperty.register(Toggle);
