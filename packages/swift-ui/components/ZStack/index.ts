import { Property } from '@nativescript/core';
import { SwiftUILayoutBase } from '../common';

type ZStackAlignment = 'topLeading' | 'top' | 'topTrailing' | 'leading' | 'center' | 'trailing' | 'bottomLeading' | 'bottom' | 'bottomTrailing';
const alignmentProperty = new Property<ZStack, ZStackAlignment>({
  name: 'alignment',
});

export class ZStack extends SwiftUILayoutBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ZStackProvider.new();
    return this.provider.view;
  }

  [alignmentProperty.setNative](value: ZStackAlignment) {
    this.updateData(alignmentProperty.name, value);
  }
}

alignmentProperty.register(ZStack);
