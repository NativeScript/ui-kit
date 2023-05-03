import { optionsBuilder } from '../helpers/helpers';
import { isAndroid } from '@nativescript/core';

export function dataHandler(dataOptions) {
  const data = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIData() : new HIData();

  const dataSchema = {
    selected: 'number',
    y: 'number',
    value: 'number',
    id: 'string',
    events: 'dataPointEvents',
  };

  return optionsBuilder(dataSchema, dataOptions, data);
}
