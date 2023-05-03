import { optionsBuilder } from '../helpers/helpers';
import { isAndroid } from '@nativescript/core';

export function boostHandler(chartOptions) {
  const boost = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HIBoost() : new HIBoost();

  const boostSchema = {
    allowForce: 'number',
    debug: 'HIDebug',
    enabled: 'number',
    seriesThreshold: 'number',
    useGPUTranslations: 'number',
    usePreallocated: 'number',
  };

  return optionsBuilder(boostSchema, chartOptions, boost);
}
