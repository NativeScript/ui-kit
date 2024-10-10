import { optionsBuilder } from '../helpers/helpers';
import { isAndroid } from '@nativescript/core';

export function conditionHandler(conditionOptions) {
  const condition = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HICondition() : new HICondition();

  const conditionSchema = {
    callback: 'HIFunction',
    maxHeight: 'number',
    maxWidth: 'number',
    minHeight: 'number',
    minWidth: 'number',
  };

  return optionsBuilder(conditionSchema, conditionOptions, condition);
}
