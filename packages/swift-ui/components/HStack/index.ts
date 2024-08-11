import { Property } from '@nativescript/core';
import { SwiftUILayoutBase } from '../common';

const spacingProperty = new Property<HStack, number>({
  name: 'spacing',
});

export class HStack extends SwiftUILayoutBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = HStackProvider.new();
    return this.provider.view;
  }

  [spacingProperty.setNative](value: number) {
    this.updateData(spacingProperty.name, value);
  }
}

spacingProperty.register(HStack);
