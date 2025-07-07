/// <reference path="../../references.d.ts" />

declare class MorphModalAnimationSettings extends NSObject {
  static alloc(): MorphModalAnimationSettings; // inherited from NSObject

  static new(): MorphModalAnimationSettings; // inherited from NSObject

  damping: number;

  duration: number;

  velocity: number;

  constructor(o: { duration: number; damping: number; velocity: number });

  initWithDurationDampingVelocity(duration: number, damping: number, velocity: number): this;
}

declare class MorphModalOptions extends NSObject {
  static alloc(): MorphModalOptions; // inherited from NSObject

  static new(): MorphModalOptions; // inherited from NSObject

  animation: MorphModalAnimationSettings;

  cardShadowColor: UIColor;

  cardShadowOffset: CGSize;

  cardShadowOpacity: number;

  cardShadowRadius: number;

  centerIPadWidthMultiplier: number;

  centerOnIpad: boolean;

  cornerMask: CACornerMask;

  cornerRadius: number;

  dimBackgroundColor: UIColor;

  dimOpacityMultiplier: number;

  handleColor: UIColor;

  horizontalInset: number;

  keyboardSpacing: number;

  maxVisibleStack: number;

  modalBackgroundColor: UIColor;

  morphAnimation: MorphModalAnimationSettings;

  overlayColor: UIColor;

  overlayOpacity: number;

  removesSelfWhenCleared: boolean;

  showsHandle: boolean;

  stackVerticalSpacing: number;

  usesSnapshots: boolean;

  usesSnapshotsForMorph: boolean;
}

declare class MorphModalViewController extends UIViewController {
  openMorphModal(view: UIView, options: MorphModalOptions): void;
}
