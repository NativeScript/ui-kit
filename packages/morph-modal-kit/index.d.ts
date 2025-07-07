import { View } from '@nativescript/core';
import { MorphModalKitCommon, MorphOptions } from './common';
export type { MorphOptions, MorphAnimationSettings } from './common';
export declare class MorphModalKit extends MorphModalKitCommon {
  static open(view: View, ref: View, options?: MorphOptions): void;
}
