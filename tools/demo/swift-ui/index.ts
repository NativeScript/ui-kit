import { DemoSharedBase } from '../utils';
import { UIDataDriver, registerSwiftUI, SwiftUI, SwiftUIEventData, WindowManager } from '@nativescript/swift-ui';

declare const BasicViewProvider: any;

registerSwiftUI('basicView', (view: any) => new UIDataDriver(BasicViewProvider.alloc().init(), view));

interface CountData {
  count: number;
}

export class DemoSharedSwiftUi extends DemoSharedBase {
  swiftui: SwiftUI;
  nativeCount = {
    count: 0,
  };

  loadedSwiftUI(args) {
    this.swiftui = args.object;
  }

  stepperCount = 0;

  stepperCountModifiers = [
    { contentTransition: 'numericText' },
    {
      animation: {
        type: 'spring',
        value: 0,
      },
    },
  ];

  swiftUIChange(args) {
    console.log('swiftUIEvent:', args?.data?.onValueChange);
    this.stepperCount = Number(args?.data?.onValueChange);
    this.notifyPropertyChange('stepperCount', this.stepperCount);
    this.stepperCountModifiers = [
      { contentTransition: 'numericText' },
      {
        animation: {
          type: 'spring',
          value: this.stepperCount,
        },
      },
    ];
    this.notifyPropertyChange('stepperCountModifiers', this.stepperCountModifiers);
  }

  onEvent(evt: SwiftUIEventData<CountData>) {
    this.set('nativeCount', { count: evt.data.count });
  }

  updateNativeScriptData() {
    this.set('nativeCount', { count: this.nativeCount.count - 1 });
  }

  updateSwiftData() {
    this.swiftui.updateData({ count: this.nativeCount.count - 1 });
  }

  openSceneWithOptions() {
    WindowManager.getWindow('Video').open({
      // big buck bunny
      // url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      // super bowl
      url: 'https://drive.usercontent.google.com/download?id=1MGUg4IblmT3zhWB8nYeGz1Ew7EqZQVYf',
      // tears of steel
      // url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    });
  }
}
