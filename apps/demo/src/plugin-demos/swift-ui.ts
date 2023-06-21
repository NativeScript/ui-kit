import { Observable, EventData, Page, GridLayout, ContentView } from '@nativescript/core';
import { DemoSharedSwiftUi } from '@demo/shared';
import {} from '@nativescript/swift-ui';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.actionBarHidden = true;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSwiftUi {
  fontSize = 13;
  intervalTest;
  data = {
    label: '',
  };
  constructor() {
    super();
    // this.intervalTest = setInterval(() => {
    //   this.fontSize = this.fontSize + 3;
    //   this.notifyPropertyChange('fontSize', this.fontSize);
    //   if (this.fontSize > 25) {
    //     clearInterval(this.intervalTest);
    //   }
    // }, 1500);
  }

  updateData(args) {
    this.data = args.data;
    this.notifyPropertyChange('data', this.data);
  }

  onEvent(args) {
    console.log('onEvent');
  }

  loadedBlurSurface(args) {
    const view = args.object as ContentView;
    const uiView = view.ios as UIView;
    const effectView = UIVisualEffectView.alloc().init();
    effectView.frame = CGRectMake(0, 0, uiView.bounds.size.width, uiView.bounds.size.height);
    effectView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    uiView.addSubview(effectView);
    effectView.effect = UIBlurEffect.effectWithStyle(UIBlurEffectStyle.Dark);
  }
}
