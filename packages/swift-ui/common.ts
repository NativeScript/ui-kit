import { EventData, View, Property, Utils } from '@nativescript/core';

export * from './view-helper';

export type RegistryCallback = (view: SwiftUICommon) => BaseUIDataDriver<SwiftUICommon>;
export declare function registerSwiftUI(id: string, callback: RegistryCallback);
export declare interface SwiftUIEventData<T> extends EventData {
  data: T;
}

/**
 * Custom view lifecycle for flavor integrations.
 */
export type CustomViewLifeCycle = { create: (id: string, component: any) => View; destroy: (id: string) => void };

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

export interface NativeScriptWindowCommon {
  id: string;

  open(props?: any): Promise<void>;

  close(): Promise<void>;

  update(props?: any): Promise<void>;
}

export type SwiftUIComponentModifiers = Array<{ [key: string]: any }>;
export type BaseSwiftUIComponentProps = {
  children?: Array<UIView>;
  modifiers?: SwiftUIComponentModifiers;
};
const modifiersProperty = new Property<SwiftUIViewBase, SwiftUIComponentModifiers>({
  name: 'modifiers',
});

export class SwiftUIViewBase extends View {
  provider: UIViewController & any;
  props: BaseSwiftUIComponentProps & any = {
    children: [],
    modifiers: [],
  };

  constructor() {
    super();
    this.initProps();
  }

  initNativeView() {
    this.provider.onEvent = (data) => {
      this.notify({
        eventName: 'onEvent',
        data: Utils.dataDeserialize(data),
      });
    };
    this.updateData();
  }

  initProps(props: any = {}) {
    this.props = {
      children: [],
      modifiers: [],
      ...props,
    };
  }
  [modifiersProperty.setNative](value: any) {
    this.props.modifiers = value;
    this.updateData();
  }
  updateModifiers(modifiers: Array<{ [key: string]: any }>, force?: boolean) {
    if (force) {
      // just accept as-is, helps when duplicates are desired and order needs to be guaranteed
      this.props.modifiers = modifiers;
    } else {
      for (const modifier of modifiers) {
        const keys = Object.keys(modifier);
        for (const key of keys) {
          const value = modifier[key];
          const index = this.props.modifiers.findIndex((m) => !!m[key]);
          if (index > -1) {
            // update existing modifier
            this.props.modifiers[index][key] = value;
            this.props.modifiers = [...this.props.modifiers];
          } else {
            const newModifier = {};
            newModifier[key] = value;
            // console.log('value:', value);
            this.props.modifiers.push(newModifier);
          }
        }
      }
    }
    this.updateData();
  }

  updateData() {
    this.provider.updateDataWithData(this.props);
  }
}

modifiersProperty.register(SwiftUIViewBase);
