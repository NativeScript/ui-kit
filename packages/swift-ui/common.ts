import { View, Property } from '@nativescript/core';

export class SwiftUICommon extends View {
  static swiftUIEventEvent = 'swiftUIEvent';
  data: any;
  swiftId: string;
}

export abstract class BaseUIDataDriver<ViewType extends SwiftUICommon = SwiftUICommon, DataType = unknown, ReceivedDataType = unknown> {
  protected owner: WeakRef<ViewType>;
  constructor(view: ViewType) {
    this.owner = new WeakRef(view);
  }
  updateData?(data: DataType): void;
  onEvent?(data: ReceivedDataType): void;
  abstract createNativeView(): UIView;
  registerEvents?(callback: (data: ReceivedDataType) => void): void;
  destroyNativeView?(): void;
}

export const dataProperty = new Property<SwiftUICommon, any>({
  name: 'data',
});

dataProperty.register(SwiftUICommon);

export const swiftIdProperty = new Property<SwiftUICommon, string>({
  name: 'swiftId',
});

swiftIdProperty.register(SwiftUICommon);

export interface OpenSceneOptions {
  /**
   * The id of the scene to open
   */
  id: string;
  /**
   * Whether the scene is immersive or not.
   * Only set this when you know the WindowGroup is defined with immersive style.
   */
  isImmersive?: boolean;
  /**
   * Any data bindings to pass to the scene.
   */
  data?: any;
}
