import { dataProperty, SwiftUICommon, BaseUIDataDriver } from './common';
import type { ISwiftUIProvider, RegistryCallback } from '.';
import { Color, GridLayout, Label, Utils, View } from '@nativescript/core';
export * from './common';

let rootView: GridLayout;
const registry = new Map<string, RegistryCallback>();
const childViewRegistry = new Map<string, SwiftUIView>();
(NativeScriptViewRegistry as any).shared.callback = (id: string, containerView: UIKitContainerView) => {
  console.log('{N} registerCallback:', id, containerView);
  console.log('rootView:', rootView);
  // const swiftUIView = new SwiftUIView();
  // swiftUIView.uniqueId = id;
  // containerView.autoresizesSubviews = true;
  // containerView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;

  // const view = childViewRegistry.get('test')
  // containerView.updateData = view.updateData.bind(view);
  // view.setNativeView(containerView);
  // view.requestLayout();

  // swiftUIView.backgroundColor = new Color('yellow')
  // swiftUIView.createNativeView = () => {
  //   console.log('createNativeView...')
  //   return containerView;
  // }
  // const label = new Label();
  // label.text = 'hello';
  // label.style.fontWeight = 'bold';
  // label.style.fontSize = 22;
  // swiftUIView.width = 100;
  // swiftUIView.height = 100;
  // rootView.addChild(swiftUIView);
  // // rootView.requestLayout();
  // swiftUIView.addChild(label);
};

export function registerSwiftUI(id: string, callback: RegistryCallback) {
  registry.set(id, callback);
}

export class UIDataDriver extends BaseUIDataDriver<SwiftUI> {
  constructor(private swiftUIProvider: ISwiftUIProvider, owner: SwiftUI) {
    super(owner);
  }
  createNativeView(): UIView {
    const vc = this.swiftUIProvider;
    return vc.view;
  }
  registerEvents(callback): void {
    this.swiftUIProvider.onEvent = (data) => {
      callback(data);
    };
  }
  updateData(data) {
    this.swiftUIProvider.updateDataWithData(data);
  }
  onEvent(data) {
    const owner = this.owner.get();
    if (owner) {
      owner.notify({
        eventName: SwiftUICommon.swiftUIEventEvent,
        data: Utils.dataDeserialize(data),
      });
    }
  }
}

export class SwiftUI extends SwiftUICommon {
  private driver: BaseUIDataDriver;

  createNativeView() {
    const generator = registry.get(this.swiftId);
    // console.log('parent:', this.parent)
    rootView = this.parent as GridLayout;

    if (!generator) {
      console.warn('view not registered:', this.swiftId);
      return UIView.new();
    }
    this.driver = generator(this as any);
    return this.driver.createNativeView();
  }

  initNativeView(): void {
    if (!this.driver) {
      return;
    }
    // console.log('this.content', this.content);

    this.driver.registerEvents((data) => {
      if (this.driver.onEvent) {
        this.driver.onEvent(data);
      } else {
        this.notify({
          eventName: SwiftUI.swiftUIEventEvent,
          data,
        });
      }
    });
  }

  disposeNativeView(): void {
    super.disposeNativeView();
    if (this.driver) {
      this.driver.destroyNativeView?.();
    }
  }

  [dataProperty.setNative](data: any) {
    this.updateData(data);
  }

  updateData(data: Record<string, any>) {
    this.driver?.updateData?.(data);
  }

  onLoaded() {
    super.onLoaded();
    // console.log('this.content', this.content);
  }
}

export class SwiftUIView extends GridLayout {
  uniqueId: string;

  // @ts-ignore
  nativeView: UIKitContainerView;

  // createNativeView() {
  //   console.log('this.id:', this.id)
  //   childViewRegistry.set(this.id, this)
  //   return null;
  // }

  createNativeView() {
    const cv = UIKitContainerView.new();
    // const cv = NativeScriptViewRegistry.getWithId(this.uniqueId);
    cv.updateData = this.updateData.bind(this);
    console.log(' -- SwiftUIView:');
    console.log('id:', this.id);
    console.log('cv:', cv);
    console.log(' --');
    NativeScriptViewRegistry.registerWithIdContainerView(this.id, cv);
    // const parentView = <UIView>this.parent.ios;
    // console.log('parentView:', parentView);
    // NSLayoutConstraint.activateConstraints([cv.leadingAnchor.constraintEqualToAnchorConstant(parentView.leadingAnchor, 16), cv.trailingAnchor.constraintEqualToAnchorConstant(parentView.trailingAnchor, -16), cv.topAnchor.constraintEqualToAnchorConstant(parentView.topAnchor, 20), cv.bottomAnchor.constraintEqualToAnchorConstant(parentView.bottomAnchor, -20)]);

    cv.autoresizesSubviews = true;
    cv.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    console.log('cv.autoresizingMask:', cv.autoresizingMask);
    return cv;
  }

  updateData(data: NSDictionary<any, any>) {
    console.log(' -- SwiftUIView updateData:', data);
    // this.notify({
    //   eventName: 'updateData',
    //   object: this,
    //   data
    // })
  }

  public _addViewToNativeVisualTree(child: View, atIndex: number): boolean {
    super._addViewToNativeVisualTree(child, atIndex);
    this._isAddedToNativeVisualTree = true;
    console.log('_addViewToNativeVisualTree');

    // const parentNativeView = this.nativeViewProtected;
    // const childNativeView = child.nativeViewProtected;

    // if (parentNativeView && childNativeView) {
    // 	if (typeof atIndex !== 'number' || atIndex >= parentNativeView.subviews.count) {
    // 		parentNativeView.addSubview(childNativeView);
    // 	} else {
    // 		parentNativeView.insertSubviewAtIndex(childNativeView, atIndex);
    // 	}

    // 	return true;
    // }

    // return false;
    return true;
  }
}
