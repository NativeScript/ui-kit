// @ts-nocheck
import { ContentView, LayoutBase, Property, Utils, View, ViewBase } from '@nativescript/core';
import { AutoLayoutView, SwiftUI } from '../..';
import { SwiftUIViewBase } from '../common';

type ShapeType = 'Circle' | 'Rectangle' | 'RoundedRectangle' | 'Capsule' | 'Ellipse' | 'UnevenRoundedRectangle';
const typeProperty = new Property<Shape, ShapeType>({
  name: 'type',
});

const fillProperty = new Property<Shape, string>({
  name: 'fill',
});

const cornerRadiusProperty = new Property<Shape, number>({
  name: 'cornerRadius',
  valueConverter: (value) => Number(value),
});

export class Shape extends SwiftUIViewBase {
  createNativeView() {
    this.provider = ShapeViewProvider.new();
    return this.provider.view;
  }

  [typeProperty.setNative](value: ShapeType) {
    this.props.type = value;
    this.updateData();
  }
  [cornerRadiusProperty.setNative](value: number) {
    this.props.cornerRadius = value;
    this.updateData();
  }
  [fillProperty.setNative](value: string) {
    if (!this.props.modifiers) {
      this.props.modifiers = [];
    }
    const index = this.props.modifiers.findIndex((m) => !!m.fill);
    if (index > -1) {
      this.props.modifiers[index].fill = value;
      this.props.modifiers = [...this.props.modifiers];
    } else {
      this.props.modifiers = [
        {
          fill: value,
        },
      ];
    }
    this.updateData();
  }
}

typeProperty.register(Shape);
cornerRadiusProperty.register(Shape);
fillProperty.register(Shape);
