import { GridLayout } from '@nativescript/core';

export class MorphModalKitCommon extends GridLayout {}

export interface MorphAnimationSettings {
  damping: number;

  duration: number;

  velocity: number;
}

export interface MorphOptions {
  animation?: MorphModalAnimationSettings;

  cardShadowColor?: UIColor;

  cardShadowOffset?: CGSize;

  cardShadowOpacity?: number;

  cardShadowRadius?: number;

  centerIPadWidthMultiplier?: number;

  centerOnIpad?: boolean;

  cornerMask?: 1 | 2 | 4 | 8;

  cornerRadius?: number;

  dimBackgroundColor?: UIColor;

  dimOpacityMultiplier?: number;

  handleColor?: UIColor;

  horizontalInset?: number;

  keyboardSpacing?: number;

  maxVisibleStack?: number;

  modalBackgroundColor?: UIColor;

  morphAnimation?: MorphModalAnimationSettings;

  overlayColor?: UIColor;

  overlayOpacity?: number;

  removesSelfWhenCleared?: boolean;

  showsHandle?: boolean;

  stackVerticalSpacing?: number;

  usesSnapshots?: boolean;

  usesSnapshotsForMorph?: boolean;
}
