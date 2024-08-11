import { Property } from '@nativescript/core';
import { SwiftUIViewBase } from '../common';

const sectionsProperty = new Property<List, Array<any>>({
  name: 'sections',
});

type ListStyle = 'inset' | 'grouped' | 'plain' | 'insetGrouped';
const listStyleProperty = new Property<List, ListStyle>({
  name: 'listStyle',
});

export class List extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ListProvider.new();
    return this.provider.view;
  }

  [sectionsProperty.setNative](value: any) {
    this.updateData(sectionsProperty.name, value);
  }

  [listStyleProperty.setNative](value: ListStyle) {
    if (value) {
      this.updateModifier(listStyleProperty.name, value);
    }
  }
}

sectionsProperty.register(List);
listStyleProperty.register(List);
