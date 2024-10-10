import { Color } from '@nativescript/core';
import { typesMap as _typesMap } from './_helpers.common';
import { dataSerialize } from '@nativescript/core/utils';

const typesMap = Object.assign({}, _typesMap, {
  number: (options) => fromJSToNativePrimitive(options),
  boolean: (options) => fromJSToNativePrimitive(options),
  string: (options) => fromJSToNativePrimitive(options),
  Array: (options) => convertJSArrayToNative(options),
  HIColor: (options) => toHIColor(options),
  object: (options) => dataSerialize(options),
});

export function convertJSArrayToNative(array) {
  return new NSArray({ array: array });
}

export function fromJSToNativePrimitive(value) {
  // stub
  return value;
}

export function toArrayList(arr) {
  // stub
  return arr;
}

export function toLinkedList(arr) {
  // stub
  return arr;
}

export function toArrayListRecursive(arr) {
  // stub
  return arr;
}

export function toStringArray(arr: string[]) {
  return new NSArray<string>({ array: arr });
}

export function colorToString(color: any) {
  const c = new Color(color);
  return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a / 255})`;
}

export function toHIColor(color) {
  if (Array.isArray(color)) {
    const colorArray = [];
    for (let i = 0; i < color.length; i++) {
      let c = color[i];

      if (c.radialGradient && c.stops) {
        const stops = c.stops.map((stop, index) => [index, colorToString(stop)]);
        const g = c.radialGradient;
        colorArray.push(
          new HIColor({
            radialGradient: NSDictionary.dictionaryWithObjectsForKeys([g.cx, g.cy, g.r], ['cx', 'cy', 'r']),
            stops: stops,
          })
        );
      } else if (c.linearGradient && c.stops) {
        const stops = c.stops.map((stop, index) => [index, colorToString(stop)]);
        const g = c.linearGradient;
        colorArray.push(
          new HIColor({
            linearGradient: NSDictionary.dictionaryWithObjectsForKeys([g.x1, g.y1, g.x2, g.y2], ['x1', 'y1', 'x2', 'y2']),
            stops: stops,
          })
        );
      } else {
        if (typeof c === 'string' && c.indexOf('#') === 0) {
          if (c.length === 4) {
            c = `#${c[1]}${c[1]}${c[2]}${c[2]}${c[3]}${c[3]}`;
          }
        }

        const _c = new Color(c);
        colorArray.push(HIColor.alloc().initWithUIColor(_c.ios));
      }
    }

    return convertJSArrayToNative(colorArray);
  } else {
    if (color.radialGradient && color.stops) {
      const stops = NSMutableArray.alloc().initWithCapacity(color.stops.length);

      for (const stop of color.stops) {
        const item = NSMutableArray.alloc().initWithCapacity(2);
        item.addObject(NSNumber.numberWithDouble(stop[0]));
        item.addObject(colorToString(stop));
        stops.addObject(item);
      }

      const g = color.radialGradient;
      const radialGradient = NSMutableDictionary.alloc().initWithCapacity(3);
      radialGradient.setObjectForKey(g.cx, 'cx');
      radialGradient.setObjectForKey(g.cy, 'cy');
      radialGradient.setObjectForKey(g.r, 'r');
      return HIColor.alloc().initWithRadialGradientStops(radialGradient, stops);
    } else if (color.linearGradient && color.stops) {
      const stops = NSMutableArray.alloc().initWithCapacity(color.stops.length);

      color.stops.forEach((stop, index) => {
        const item = NSMutableArray.alloc().initWithCapacity(2);
        item.addObject(NSNumber.numberWithInt(index));
        item.addObject(colorToString(stop));
        stops.addObject(item);
      });
      const g = color.linearGradient;

      const linearGradient = NSMutableDictionary.alloc().initWithCapacity(4);

      linearGradient.setObjectForKey(g.x1, 'x1');
      linearGradient.setObjectForKey(g.y1, 'y1');
      linearGradient.setObjectForKey(g.x2, 'x2');
      linearGradient.setObjectForKey(g.y2, 'y2');

      return HIColor.alloc().initWithLinearGradientStops(linearGradient, stops);
    } else {
      if (typeof color === 'string' && color.indexOf('#') === 0) {
        if (color.length === 4) {
          color = `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        return HIColor.alloc().initWithHexValue(color);
      }
      const c = new Color(color);
      return HIColor.alloc().initWithUIColor(c.ios);
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
          containerObject[schemaKey] = typesMap[schema[schemaKey]](options[schemaKey]);
        }
      } else {
        console.log('Handler for', schemaKey, schema[schemaKey], 'not implemented');
      }
    }
  }

  return containerObject;
}
