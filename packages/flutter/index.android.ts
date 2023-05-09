import { Utils } from '@nativescript/core';
import { FlutterCommon, IFlutterMessage } from './common';

function makeFragmentName(viewId: number): string {
  return 'android:flutter:' + viewId;
}

let initialized = false;
let flutterEngine: io.flutter.embedding.engine.FlutterEngine;
const ReplyMethod = io.flutter.plugin.common.BasicMessageChannel.Reply<string>;

export function init() {
  if (!initialized) {
    initialized = true;

    flutterEngine = new io.flutter.embedding.engine.FlutterEngine(Utils.android.getApplicationContext());
    flutterEngine.getDartExecutor().executeDartEntrypoint(io.flutter.embedding.engine.dart.DartExecutor.DartEntrypoint.createDefault());
    io.flutter.embedding.engine.FlutterEngineCache.getInstance().put('default_nativescript', flutterEngine);
    io.flutter.embedding.engine.plugins.util.GeneratedPluginRegister.registerGeneratedPlugins(flutterEngine);
  }
}

@NativeClass()
@Interfaces([io.flutter.plugin.common.BasicMessageChannel.MessageHandler<string>])
class BasicMessageChannelHandler extends java.lang.Object implements io.flutter.plugin.common.BasicMessageChannel.MessageHandler<string> {
  owner: WeakRef<Flutter>;

  constructor() {
    super();
    return global.__native(this);
  }

  static initWithOwner(owner: WeakRef<Flutter>) {
    const instance = new BasicMessageChannelHandler();
    instance.owner = owner;
    return instance;
  }

  public onMessage(message: string, reply: io.flutter.plugin.common.BasicMessageChannel.Reply<string>): void {
    try {
      const flutterMessage: IFlutterMessage = JSON.parse(message);
      if (flutterMessage) {
        if (Flutter.DEBUG) {
          console.log('Flutter called NativeScript with type:', flutterMessage.type);
          console.log('data:', flutterMessage.data);
        }

        const owner: Flutter = this.owner?.deref();
        if (owner) {
          if (owner.channel?.[flutterMessage.type]) {
            owner.channel[flutterMessage.type](flutterMessage.data);
          }
        }
      }
    } catch (err) {
      console.log('Flutter message error:', err);
    }
  }
}

export class Flutter extends FlutterCommon {
  private _fragment: io.flutter.embedding.android.FlutterFragment.CachedEngineFragmentBuilder;
  private _platformChannel: io.flutter.plugin.common.BasicMessageChannel<string>;
  private _listener: BasicMessageChannelHandler;
  private _androidViewId: number = -1;

  createNativeView() {
    this._platformChannel = new io.flutter.plugin.common.BasicMessageChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), 'nativescript', io.flutter.plugin.common.StringCodec.INSTANCE);
    this._listener = BasicMessageChannelHandler.initWithOwner(new WeakRef(this));
    this._platformChannel.setMessageHandler(this._listener);
    return new android.widget.FrameLayout(this._context);
  }

  initNativeView() {
    super.initNativeView();
    if (this._androidViewId < 0) {
      this._androidViewId = android.view.View.generateViewId();
    }

    this.nativeViewProtected.setId(this._androidViewId);

    const fm = this._getFragmentManager() as androidx.fragment.app.FragmentManager;
    this._fragment = io.flutter.embedding.android.FlutterFragment.withCachedEngine('default_nativescript').build() as any;

    const name = makeFragmentName(this._androidViewId);
    const tr = fm.beginTransaction();
    tr.replace(this._androidViewId, this._fragment as any, name);
    tr.commit();
  }

  disposeNativeView(): void {
    if (this._platformChannel) {
      this._platformChannel.setMessageHandler(null);
    }
    this._platformChannel = null;
    this._listener = null;
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

        this._platformChannel.send(
          json,
          new ReplyMethod({
            reply: (result) => {
              this.notify({
                eventName: Flutter.sendMessageReplyEvent,
                object: this,
                data: result,
              });
              if (callback) {
                callback(result);
              }
            },
          })
        );

        if (Flutter.DEBUG) {
          console.log('NativeScript sent message to Flutter:', json);
        }
      } catch (err) {
        console.log('Flutter message error:', err);
      }
    }
  }
}
