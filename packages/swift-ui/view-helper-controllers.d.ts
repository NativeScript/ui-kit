import type { IOSHelper, LayoutBase, Utils, View, ViewBase, ViewHelper } from '@nativescript/core';

export const UNSPECIFIED: number;

export class ViewLayoutWrapper extends UIView {}

export class AutoLayoutController extends UIViewController {
  static initWithOwner(owner: WeakRef<View>);
}

/**
 * This view is a proxy wrapper for any other view.
 * It can be used in the future for wrapping more complex views, if needed
 */
export class AutoLayoutView extends LayoutBase {}
