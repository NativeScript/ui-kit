import { CoreTypes, EventData } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { Flutter, FlutterChannelType } from '@nativescript/flutter';

export class DemoSharedFlutter extends DemoSharedBase {
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

  loadedFlutter(args: EventData) {
    this.flutter = <Flutter>args.object;
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
