import { View } from '@nativescript/core';
import { MorphModalKitCommon, MorphOptions } from './common';

export class MorphModalKit extends MorphModalKitCommon {
  static open(view: View, ref: View, options?: MorphOptions) {
    console.log('MorphModalKit only available on iOS at the moment.');
  }
}
