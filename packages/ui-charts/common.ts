import { Property, View } from '@nativescript/core';

export class UIChartsViewBase extends View {
  options: Record<string, any>;
}

export const optionsProperty = new Property<UIChartsViewBase, Record<string, any>>({
  name: 'options',
  defaultValue: {},
  affectsLayout: true,
});
optionsProperty.register(UIChartsViewBase);
