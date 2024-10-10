import { isAndroid } from '@nativescript/core';
import { dataHandler } from '../data/data-handler';
import { optionsBuilder, toArrayList, convertJSArrayToNative, fromJSToNativePrimitive } from '../helpers/helpers';

const numberHasDecimals = function (item: number) {
  return !(item % 1 === 0);
};

export function seriesHandler(seriesOptions, seriesSubClass?) {
  const seriesSchema = {
    accessibility: 'HIAccessibility',
    allowPointSelect: 'number',
    animation: 'HIAnimationOptionsObject',
    animationLimit: 'number',
    boostBlending: 'string',
    boostThreshold: 'number',
    className: 'string',
    clip: 'number',
    color: 'HIColor',
    colorAxis: 'number',
    colorIndex: 'number',
    colorKey: 'string',
    connectEnds: 'number',
    connectNulls: 'number',
    crisp: 'number',
    cropThreshold: 'number',
    cursor: 'string',
    // custom: 'NSDictionary<any, any>',
    // data: 'handled manually',
    dashStyle: 'string',
    dataLabels: 'HIDataLabels', // array
    dataSorting: 'HIDataSortingOptionsObject',
    definition: 'string',
    describeSingleSeries: 'number',
    descriptionFormatter: 'HIFunction',
    dragDrop: 'HIDragDrop',
    enableMouseTracking: 'number',
    events: 'HIEvents',
    findNearestPointBy: 'string',
    getExtremesFromAll: 'number',
    id: 'string',
    includeInDataExport: 'number',
    index: 'number',
    keys: 'Array',
    label: 'HILabel',
    legendIndex: 'number',
    lineWidth: 'number',
    linecap: 'string',
    linkedTo: 'string',
    marker: 'HIMarker',
    name: 'string',
    negativeColor: 'HIColor',
    nullPointValue: 'string',
    opacity: 'number',
    point: 'HIPoint',
    pointAnnotationsDescription: 'string',
    pointDescriptionEnabledThreshold: 'number',
    pointDescriptionFormatter: 'HIFunction',
    pointInterval: 'number',
    pointIntervalUnit: 'string',
    pointPlacement: 'number',
    pointStart: 'number',
    selected: 'number',
    shadow: 'HIShadowOptionsObject',
    showCheckbox: 'number',
    showInLegend: isAndroid ? 'boolean' : 'number',
    skipKeyboardNavigation: 'number',
    softThreshold: 'number',
    stack: 'string',
    stacking: 'string',
    states: 'HIStates',
    step: 'string',
    stickyTracking: 'number',
    summary: 'HISummary',
    threshold: 'number',
    tooltip: 'HITooltip',
    turboThreshold: 'number',
    type: 'string',
    visible: 'number',
    xAxis: 'number',
    xAxisDescription: 'string',
    yAxis: 'number',
    yAxisDescription: 'string',
    zIndex: 'number',
    zoneAxis: 'string',
    zones: 'HIZones', // array
  };

  const series = isAndroid ? seriesSubClass || new com.highsoft.highcharts.common.hichartsclasses.HISeries() : seriesSubClass || new HISeries();
  const sOpts = seriesOptions;

  if (sOpts.data) {
    if (__ANDROID__) {
      const handleData = (item) => {
        if (Array.isArray(item)) {
          const itemArray = new Array(item?.length ?? 0);
          for (const i in item) {
            if (item[i] === null) {
              itemArray[i] = null;
            } else {
              itemArray[i] = handleData(item[i]);
            }
          }
          return toArrayList(itemArray);
        }
        switch (typeof item) {
          case 'string':
            return java.lang.String.valueOf(item);
          case 'number':
            if (numberHasDecimals(item)) {
              return java.lang.Double.valueOf(item);
            }
            return java.lang.Long.valueOf(item);
          case 'boolean':
            return java.lang.Boolean.valueOf(item);
          case 'object':
            if (item === null) {
              return null;
            } else if (item instanceof java.util.Date) {
              return item;
            } else if (item instanceof java.util.Map) {
              return item;
            } else if (item instanceof java.util.List) {
              return item;
            } else if (item instanceof java.util.ArrayList) {
              return item;
            } else {
              const keys = Object.keys(item);
              const itemArray = new java.util.HashMap();
              for (const key of keys) {
                itemArray.put(key, handleData(item[key]));
              }
              return itemArray;
            }
        }
      };

      series.setData(handleData(sOpts.data));

      /* if (sOpts.data[0] !== null && typeof sOpts.data[0] !== 'undefined' && sOpts.data[0].length) {
        const data = sOpts.data.map((item) => {
          const innerArray = new Array(item?.length ?? 0);

          for (let i = 0; i < item.length; i++) {
            if (i === 0) {
              if (typeof item[0] === 'string') {
                innerArray[0] = java.lang.String.valueOf(item[0]);
              } else {
                if (numberHasDecimals(item[0])) {
                  innerArray[0] = java.lang.Double.valueOf(item[0]);
                } else {
                  innerArray[0] = java.lang.Long.valueOf(item[0]);
                }
              }
            } else {
              innerArray[i] = fromJSToNativePrimitive(item[i]);
            }
          }
          return toArrayList(innerArray);
        });
        (<any>series).setData(toArrayList(data));
      } else if (sOpts.data.length && typeof sOpts.data[0] === 'object') {
        const data = convertJSArrayToNative(
          sOpts.data.map((item) => {
            return item ? dataHandler(item) : undefined;
          })
        );
        (<any>series).setData(data);
      } else {
        (<any>series).setData(convertJSArrayToNative(sOpts.data));
      }
      */
    }

    if (__IOS__) {
      const data = NSMutableArray.alloc().initWithCapacity(sOpts.data?.length ?? 0);
      const handleData = (item) => {
        if (Array.isArray(item)) {
          const itemArray = NSMutableArray.alloc().initWithCapacity(item?.length ?? 0);
          for (const i of item) {
            if (typeof i === 'number') {
              if (numberHasDecimals(i)) {
                itemArray.addObject(NSNumber.numberWithDouble(i));
              } else {
                itemArray.addObject(NSNumber.numberWithLong(i));
              }
            } else if (i === null) {
              itemArray.addObject(NSNull.new());
            } else {
              itemArray.addObject(i);
            }
          }
          return itemArray;
        }
        switch (typeof item) {
          case 'string':
            return NSString.stringWithString(item);
          case 'number':
            if (numberHasDecimals(item)) {
              return NSNumber.numberWithDouble(item);
            }
            return NSNumber.numberWithLong(item);
          case 'boolean':
            return NSNumber.numberWithBool(item);
          case 'object':
            if (item === null) {
              return NSNull.new();
            } else if (typeof item === 'object') {
              if (item instanceof NSDictionary) {
                return item;
              }

              if (item instanceof Date) {
                return item;
              }

              const keys = Object.keys(item);
              const itemArray = NSMutableDictionary.alloc().initWithCapacity(keys.length);
              for (const key of keys) {
                itemArray.setObjectForKey(handleData(item[key]), key);
              }
              return itemArray;
            }
            return item;
        }
      };
      for (const item of sOpts.data) {
        data.addObject(handleData(item));
      }
      series.data = data;
    }
  }

  return optionsBuilder(seriesSchema, seriesOptions, series);
}
