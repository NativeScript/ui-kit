import { Property } from '@nativescript/core';
import { SwiftUILayoutBase } from '../common';

const spacingProperty = new Property<VStack, number>({
  name: 'spacing',
});

export class VStack extends SwiftUILayoutBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = VStackProvider.new();
    return this.provider.view;
  }

  [spacingProperty.setNative](value: number) {
    this.updateData(spacingProperty.name, value);
  }
}

spacingProperty.register(VStack);
