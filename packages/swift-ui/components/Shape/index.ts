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

const strokeProperty = new Property<Shape, { color: string; lineWidth: number }>({
  name: 'stroke',
});

const cornerRadiusProperty = new Property<Shape, number>({
  name: 'cornerRadius',
  valueConverter: (value) => Number(value),
});

type CornerRadii = {
  topLeading?: number;
  topTrailing?: number;
  bottomLeading?: number;
  bottomTrailing?: number;
};
const cornerRadiiProperty = new Property<Shape, CornerRadii>({
  name: 'cornerRadii',
});

export class Shape extends SwiftUIViewBase {
  createNativeView() {
    this.provider = ShapeViewProvider.new();
    return this.provider.view;
  }

  [typeProperty.setNative](value: ShapeType) {
    this.updateData(typeProperty.name, value);
  }
  [cornerRadiusProperty.setNative](value: number) {
    this.updateData(cornerRadiusProperty.name, value);
  }
  [cornerRadiiProperty.setNative](value: number) {
    this.updateData(cornerRadiiProperty.name, value);
  }
  [strokeProperty.setNative](value: any) {
    if (value) {
      this.updateModifier(strokeProperty.name, value);
    }
  }
  [fillProperty.setNative](value: string) {
    if (value) {
      this.updateModifier(fillProperty.name, value);
    }
  }
}

typeProperty.register(Shape);
cornerRadiusProperty.register(Shape);
fillProperty.register(Shape);
strokeProperty.register(Shape);
cornerRadiiProperty.register(Shape);
