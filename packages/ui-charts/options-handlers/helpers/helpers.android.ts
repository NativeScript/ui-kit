import { Color } from '@nativescript/core';
import { typesMap as _typesMap } from './_helpers.common';
import { dataSerialize, numberHasDecimals } from '@nativescript/core/utils';

const typesMap = Object.assign({}, _typesMap, {
  number: (options) => fromJSToNativePrimitive(options),
  boolean: (options) => fromJSToNativePrimitive(options),
  Array: (options) => convertJSArrayToNative(options),
  LinkedList: (options) => toLinkedList(options),
  HIColor: (options) => toHIColor(options),
  object: (options) => dataSerialize(options),
});

export function convertJSArrayToNative(jsArray: Array<any>): java.util.ArrayList<any> {
  const nativeArray = new java.util.ArrayList<any>();
  for (let i = 0, l = jsArray.length; i < l; i++) {
    nativeArray.add(fromJSToNativePrimitive(jsArray[i]));
  }

  return nativeArray;
}

export function fromJSToNativePrimitive(value: any): any {
  if (value === null) return null;
  if (value === undefined) return undefined;
  if (typeof value === 'boolean' || value === 'false' || value === 'true') return new java.lang.Boolean(value);
  if (typeof value === 'string') return new java.lang.String(value);

  if (typeof value === 'number' || Number.isInteger(value) || value instanceof Number) {
    if (numberHasDecimals(value)) {
      return new java.lang.Double(value);
    }
    if (Number.isInteger(value)) {
      return new java.lang.Long(value);
    }

    if (!isNaN(Number(value)) && value !== null) {
      if (value.toString().includes('.')) {
        return new java.lang.Double(value.toString());
      }
      return new java.lang.Long(value.toString());
    }
  }

  return value;
}

export function toArrayList(arr, isNumber = false) {
  const size = arr?.length ?? 0;
  const arrayList = new java.util.ArrayList<any>(size);
  for (let i = 0; i < size; i++) {
    const item = arr[i];
    arrayList.add(item);
  }
  return arrayList;
}

export function toStringArray(arr) {
  const array = Array.create(java.lang.String, arr.length);
  for (let i = 0; i < arr.length; i++) {
    array[i] = arr[i];
  }
  return array;
}

export function toLinkedList(arr, isNumber = false) {
  const linkedList = new java.util.LinkedList<any>();
  arr.forEach((item, i) => {
    linkedList.add(i, item);
  });
  return linkedList;
}

export function toArrayListRecursive(arr, isNumber = false) {
  const arrayList = new java.util.ArrayList<any>();
  arr.forEach((item) => {
    if (item.length) {
      arrayList.add(toArrayListRecursive(item, isNumber));
    } else {
      if (isNumber) {
        arrayList.add(fromJSToNativePrimitive(item));
      } else {
        arrayList.add(item);
      }
    }
  });
  return arrayList;
}

export function colorToString(color: any) {
  const c = new Color(color);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a / 255})`;
}

export function toHIColor(color) {
  if (Array.isArray(color)) {
    const colorArray = [];
    for (let i = 0; i < color.length; i++) {
      const c = color[i];

      if (c.radialGradient && c.stops) {
        const grad = c.radialGradient;
        const gradient = new com.highsoft.highcharts.common.HIGradient(grad.cx, grad.cy, grad.r);
        const stops = c.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
        const stopslist = toLinkedList(stops);

        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithRadialGradient(gradient, stopslist));
      } else if (c.linearGradient && c.stops) {
        const grad = c.linearGradient;
        const gradient = new com.highsoft.highcharts.common.HIGradient(grad.x1, grad.y1, grad.x2, grad.y2);
        const stops = c.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
        const stopslist = toLinkedList(stops);

        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithLinearGradient(gradient, stopslist));
      } else {
        const _c = new Color(c);
        colorArray.push(com.highsoft.highcharts.common.HIColor.initWithRGBA(_c.r, _c.g, _c.b, _c.a / 255) as any);
      }
    }

    return convertJSArrayToNative(colorArray);
  } else {
    if (color.radialGradient && color.stops) {
      const grad = color.radialGradient;
      const gradient = new com.highsoft.highcharts.common.HIGradient(grad.cx, grad.cy, grad.r);
      const stops = color.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
      const stopslist = toLinkedList(stops);

      return com.highsoft.highcharts.common.HIColor.initWithRadialGradient(gradient, stopslist);
    } else if (color.linearGradient && color.stops) {
      const grad = color.linearGradient;
      const gradient = new com.highsoft.highcharts.common.HIGradient(grad.x1, grad.y1, grad.x2, grad.y2);
      const stops = color.stops.map((stop, i) => new com.highsoft.highcharts.common.HIStop(i, toHIColor(stop)));
      const stopslist = toLinkedList(stops);

      return com.highsoft.highcharts.common.HIColor.initWithLinearGradient(gradient, stopslist);
    } else {
      const c = new Color(color);
      return com.highsoft.highcharts.common.HIColor.initWithRGBA(c.r, c.g, c.b, c.a / 255) as any;
    }
  }
}

export function optionsBuilder(schema, options, containerObject) {
  const schemaKeys = Object.keys(schema);
  const optionsKeys = Object.keys(options);

  for (const schemaKey of schemaKeys) {
    if ((<any>optionsKeys).includes(schemaKey)) {
      if (typeof typesMap[schema[schemaKey]] === 'function') {
        if (options[schemaKey] !== null && typeof options[schemaKey] !== 'undefined') {
          containerObject['set' + schemaKey[0].toUpperCase() + schemaKey.slice(1)](typesMap[schema[schemaKey]](options[schemaKey]));
        }
      } else {
        console.log('Handler for', schemaKey, schema[schemaKey], 'not implemented');
      }
    }
  }

  return containerObject;
}
