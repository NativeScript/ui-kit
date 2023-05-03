import { optionsBuilder } from '../helpers/helpers';
import { isAndroid } from '@nativescript/core';

export function selectHandler(selectOptions) {
  const select = isAndroid ? new com.highsoft.highcharts.common.hichartsclasses.HISelect() : new HISelect();

  const selectSchema = {
    animation: 'HIAnimationOptionsObject',
    borderColor: 'string',
    brightness: 'number',
    color: 'HIColor',
    connectorWidthPlus: 'number',
    enabled: 'number',
    fillColor: 'HIColor',
    halo: 'HIHalo',
    height: 'number',
    heightPlus: 'number',
    lineColor: 'HIColor',
    lineWidth: 'number',
    lineWidthPlus: 'number',
    linkOpacity: 'number',
    opacity: 'number',
    radius: 'number',
    radiusPlus: 'number',
    shadow: 'number',
    width: 'number',
    widthPlus: 'number',
  };

  return optionsBuilder(selectSchema, selectOptions, select);
}
