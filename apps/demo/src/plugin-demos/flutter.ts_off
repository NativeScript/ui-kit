import { Observable, EventData, Page, CoreTypes } from '@nativescript/core';
import { DemoSharedFlutter } from '@demo/shared';
import { Flutter, FlutterChannelType } from '@nativescript/flutter';
Flutter.DEBUG = true;

let vm: DemoModel;
export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  vm = new DemoModel();
  page.bindingContext = vm;
}

export function loadedFlutter(args: EventData) {
  vm.flutter = <Flutter>args.object;
}

export class DemoModel extends DemoSharedFlutter {
  messages = ['hello world', 'awesome!', 'this is great!', '{N} is wonderful'];
  currentIndex = 0;
  flutter: Flutter;
  channel: FlutterChannelType = {
    salutation: (value) => {
      console.log('Flutter sent message:', value);
      return Promise.resolve('hi');
    },
  };

  testIt() {
    this.flutter.sendMessage('salutation', this.messages[this.currentIndex]);
    this.currentIndex++;
    if (this.currentIndex === this.messages.length) {
      this.currentIndex = 0;
    }
    this._bounce().then(() => {
      this._bounce();
    });
  }

  private _bounce() {
    return new Promise<void>((resolve) => {
      this.flutter
        .animate({
          translate: { x: 0, y: 75 },
          duration: 500,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => {
          this.flutter
            .animate({
              translate: { x: 0, y: 0 },
              duration: 500,
              curve: CoreTypes.AnimationCurve.easeInOut,
            })
            .then(() => {
              resolve();
            });
        });
    });
  }
}
