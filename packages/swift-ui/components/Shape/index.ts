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
    this.props.type = value;
    this.updateData();
  }
  [cornerRadiusProperty.setNative](value: number) {
    this.props.cornerRadius = value;
    this.updateData();
  }
  [cornerRadiiProperty.setNative](value: number) {
    this.props.cornerRadii = value;
    this.updateData();
  }
  [strokeProperty.setNative](value: any) {
    if (value) {
      this.updateModifier('stroke', value);
    }
  }
  [fillProperty.setNative](value: string) {
    if (value) {
      this.updateModifier('fill', value);
    }
  }
}

typeProperty.register(Shape);
cornerRadiusProperty.register(Shape);
fillProperty.register(Shape);
strokeProperty.register(Shape);
cornerRadiiProperty.register(Shape);
