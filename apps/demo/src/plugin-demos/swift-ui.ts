import { Observable, EventData, Page, GridLayout, ContentView, View, CoreTypes } from '@nativescript/core';
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
  cardBg: { [key: string]: View } = {};
  blurViews: { [key: string]: View } = {};
  logos: { [key: string]: View } = {};

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

  loadedLogo(args) {
    this.logos[args.object.id] = args.object;
  }

  loadedBlurSurface(args) {
    this.blurViews[args.object.id] = args.object as ContentView;
    const uiView = this.blurViews[args.object.id].ios as UIView;
    const effectView = UIVisualEffectView.alloc().init();
    effectView.frame = CGRectMake(0, 0, uiView.bounds.size.width, uiView.bounds.size.height);
    effectView.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    uiView.addSubview(effectView);
    effectView.effect = UIBlurEffect.effectWithStyle(UIBlurEffectStyle.Dark);
  }

  loadedCardBg(args) {
    this.cardBg[args.object.id] = args.object;
  }

  tapCard(args) {
    const keys = Object.keys(this.blurViews);
    for (const key of keys) {
      const id = parseInt(key).toString();
      if (id === args.object.id) {
        this.pulseCard(id);
        break;
      }
    }
  }

  pulseCard(id: string) {
    this.cardBg[`${id}cardbg`]
      .animate({
        opacity: 0.2,
        duration: 1000,
        curve: CoreTypes.AnimationCurve.easeInOut,
      })
      .then(() => {
        this.cardBg[`${id}cardbg`]
          .animate({
            opacity: 0.9,
            duration: 1000,
            curve: CoreTypes.AnimationCurve.easeInOut,
          })
          .then(() => {
            this.pulseCard(id);
          });
      });
    this.logos[`${id}cardlogo`]
      .animate({
        translate: { x: 0, y: 55 },
        duration: 900,
        curve: CoreTypes.AnimationCurve.easeInOut,
      })
      .then(() => {
        this.logos[`${id}cardlogo`]
          .animate({
            translate: { x: 0, y: 0 },
            duration: 900,
            curve: CoreTypes.AnimationCurve.easeInOut,
          })
          .then(() => {});
      });
  }
}
