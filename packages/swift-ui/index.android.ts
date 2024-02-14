import { OpenSceneOptions, SwiftUICommon } from './common';
export * from './common';

export function registerSwiftUI() {
  // noop
}

export class SwiftUI extends SwiftUICommon {}

export class UIDataDriver {}

export function openScene(options: OpenSceneOptions) {}

export function updateScene(options: OpenSceneOptions) {}
