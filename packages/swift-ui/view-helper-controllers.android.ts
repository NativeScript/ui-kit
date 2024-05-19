import { LayoutBase } from '@nativescript/core';

export const UNSPECIFIED = 0;

export class ViewLayoutWrapper {}

export class AutoLayoutController {}

/**
 * This view is a proxy wrapper for any other view.
 * It can be used in the future for wrapping more complex views, if needed
 */
export class AutoLayoutView extends LayoutBase {}
