import { Application, Utils, ViewBase } from '@nativescript/core';
import { FlutterCommon, IFlutterMessage } from './common';

let flutterEngineGroup: FlutterEngineGroup;

@NativeClass()
export class FlutterDelegate extends FlutterAppDelegate implements UIApplicationDelegate {
  static ObjCProtocols = [UIApplicationDelegate, FlutterAppLifeCycleProvider, FlutterPluginRegistry];

  applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary<string, any>): boolean {
    configureFlutterEngineGroup();
    return true;
  }
}

export function configureFlutterEngineGroup() {
  flutterEngineGroup = FlutterEngineGroup.alloc().initWithNameProject('ns_flutter_engine', null);
}

export function init() {
  if (global.isIOS) {
    Application.ios.delegate = FlutterDelegate;
  }
}

export class Flutter extends FlutterCommon {
  private _flutterViewController: FlutterViewController;
  private _platformChannel: FlutterBasicMessageChannel;
  private _engine: FlutterEngine;

  createNativeView() {
    if (!this.id) {
      throw new Error(`Flutter requires an 'id' property set to match your Dart entry point name.`);
    }
    if (!flutterEngineGroup) {
      throw new Error(`Ensure you have called @nativescript/flutter 'init' from you main bootstrap file.`);
    }
    this._engine = flutterEngineGroup.makeEngineWithEntrypointLibraryURI(this.id, null);
    GeneratedPluginRegistrant.registerWithRegistry(this._engine);
    this._flutterViewController = FlutterViewController.alloc().initWithEngineNibNameBundle(this._engine, null, null);
    return this._flutterViewController.view;
  }

  initNativeView() {
    this._platformChannel = FlutterBasicMessageChannel.messageChannelWithNameBinaryMessengerCodec('nativescript', this._flutterViewController.binaryMessenger, FlutterStringCodec.sharedInstance());
    this._platformChannel.setMessageHandler(this._methodCallHandler.bind(this));
  }

  disposeNativeView() {
    if (this._platformChannel) {
      this._platformChannel.setMessageHandler(null);
      this._platformChannel = null;
    }
  }

  sendMessage(type: string, data?: any, callback?: (value?: any) => void) {
    if (this._platformChannel) {
      const message: IFlutterMessage = {
        type,
      };
      if (data) {
        message.data = data;
      }
      try {
        const json = JSON.stringify(message, null, 0);

        if (callback) {
          this._platformChannel.sendMessageReply(json, (result) => {
            this.notify({
              eventName: Flutter.sendMessageReplyEvent,
              object: this,
              data: result,
            });
            if (callback) {
              callback(result);
            }
          });
        } else {
          this._platformChannel.sendMessage(json);
        }
        if (Flutter.DEBUG) {
          console.log('NativeScript sent message to Flutter:', json);
        }
      } catch (err) {
        console.log('Flutter message error:', err);
      }
    }
  }

  private _methodCallHandler(message: string, result: any) {
    try {
      const flutterMessage: IFlutterMessage = JSON.parse(message);
      if (flutterMessage) {
        if (Flutter.DEBUG) {
          console.log('Flutter called NativeScript with type:', flutterMessage.type);
          console.log('data:', flutterMessage.data);
        }

        if (this.channel?.[flutterMessage.type]) {
          this.channel[flutterMessage.type](flutterMessage.data);
        }
      }
    } catch (err) {
      console.log('Flutter message error:', err);
    }
  }

  onLoaded() {
    super.onLoaded();
    // we do this on onLoaded as the viewControllers are not properly setup on createNativeView
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let vcParent: ViewBase = this;
    while (vcParent && !vcParent.viewController) {
      vcParent = vcParent.parent;
    }
    const vc = vcParent?.viewController || Utils.ios.getRootViewController();
    if (vc) {
      vc.addChildViewController(this._flutterViewController);
      this._flutterViewController.didMoveToParentViewController(vc);
    }
  }
}
