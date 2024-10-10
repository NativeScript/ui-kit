import { dataSerialize } from '@nativescript/core/utils';
import { optionsBuilder } from '../helpers/helpers';
import { isAndroid } from '@nativescript/core';

export function rulesHandler(rulesOptions) {
  const rules = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIRules() : new HIRules();

  const rulesSchema = {
    chartOptions: 'object',
    condition: 'HICondition',
  };

  const rulesArray = [];
  if (Array.isArray(rulesOptions)) {
    for (const rule of rulesOptions) {
      rulesArray.push(optionsBuilder(rulesSchema, rule, rules));
    }
  }

  return dataSerialize(rulesArray);
}
