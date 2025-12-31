declare namespace app {
  export namespace rive {
    export class Artboard {
      public static class: java.lang.Class<app.rive.Artboard>;
      public static $stable: number;
      public getName(): string;
      public 'getArtboardHandle-nSTdbJo$any_release'(): number;
      public getStateMachineNames($completion: any): any;
      public close(): void;
    }
    export namespace Artboard {
      export class Companion {
        public static class: java.lang.Class<app.rive.Artboard.Companion>;
        public fromFile(name: app.rive.RiveFile, $i$f$d: string): app.rive.Artboard;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export abstract class Asset<H> extends java.lang.AutoCloseable {
      public static class: java.lang.Class<app.rive.Asset<any>>;
      public static $stable: number;
      public unregister(tag$iv: string): void;
      public getCommandQueue(): app.rive.core.CommandQueue;
      public close(): void;
      public register(tag$iv: string): void;
      public getHandle(): any;
    }
    export namespace Asset {
      export class Companion {
        public static class: java.lang.Class<app.rive.Asset.Companion>;
        public fromBytes$any_release(ops: app.rive.AssetOps<any, any>, ops: app.rive.core.CommandQueue, ops: androidNative.Array<number>, ops: any): any;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class AssetOps<H, A> extends java.lang.Object {
      public static class: java.lang.Class<app.rive.AssetOps<any, any>>;
      /**
       * Constructs a new instance of the app.rive.AssetOps<any,any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { getTag(): string; getLabel(): string; decode(param0: app.rive.core.CommandQueue, param1: androidNative.Array<number>, param2: any): any; delete(param0: app.rive.core.CommandQueue, param1: H): void; register(param0: app.rive.core.CommandQueue, param1: string, param2: H): void; unregister(param0: app.rive.core.CommandQueue, param1: string): void; construct(param0: H, param1: app.rive.core.CommandQueue): A });
      public constructor();
      public getLabel(): string;
      public getTag(): string;
      public unregister(param0: app.rive.core.CommandQueue, param1: string): void;
      public register(param0: app.rive.core.CommandQueue, param1: string, param2: H): void;
      public decode(param0: app.rive.core.CommandQueue, param1: androidNative.Array<number>, param2: any): any;
      public delete(param0: app.rive.core.CommandQueue, param1: H): void;
      public construct(param0: H, param1: app.rive.core.CommandQueue): A;
    }
    export namespace AssetOps {
      export class DefaultImpls {
        public static class: java.lang.Class<app.rive.AssetOps.DefaultImpls>;
        public static register($this: app.rive.AssetOps<any, any>, queue: app.rive.core.CommandQueue, key: string, handle: any): void;
        public static unregister($this: app.rive.AssetOps<any, any>, queue: app.rive.core.CommandQueue, key: string): void;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class AudioAsset extends app.rive.Asset<app.rive.core.AudioHandle> {
      public static class: java.lang.Class<app.rive.AudioAsset>;
      public static $stable: number;
    }
    export namespace AudioAsset {
      export class Companion extends app.rive.AssetOps<app.rive.core.AudioHandle, app.rive.AudioAsset> {
        public static class: java.lang.Class<app.rive.AudioAsset.Companion>;
        public 'delete-4kKS7jM'(queue: app.rive.core.CommandQueue, handle: number): void;
        public getLabel(): string;
        public register(param0: app.rive.core.CommandQueue, param1: string, param2: any): void;
        public getTag(): string;
        public 'register-d3xxSlE'(queue: app.rive.core.CommandQueue, key: string, handle: number): void;
        public decode(param0: app.rive.core.CommandQueue, param1: androidNative.Array<number>, param2: any): any;
        public unregister(param0: app.rive.core.CommandQueue, param1: string): void;
        public 'construct-QxJutAs'(handle: number, queue: app.rive.core.CommandQueue): app.rive.AudioAsset;
        public 'decode-Z6pBmcA'(queue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public construct(param0: any, param1: app.rive.core.CommandQueue): any;
        public unregister(queue: app.rive.core.CommandQueue, key: string): void;
        public fromBytes(commandQueue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public delete(param0: app.rive.core.CommandQueue, param1: any): void;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class ExperimentalRiveComposeAPI {
      public static class: java.lang.Class<app.rive.ExperimentalRiveComposeAPI>;
      /**
       * Constructs a new instance of the app.rive.ExperimentalRiveComposeAPI interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {});
      public constructor();
    }
  }
}

declare namespace app {
  export namespace rive {
    export class FontAsset extends app.rive.Asset<app.rive.core.FontHandle> {
      public static class: java.lang.Class<app.rive.FontAsset>;
      public static $stable: number;
    }
    export namespace FontAsset {
      export class Companion extends app.rive.AssetOps<app.rive.core.FontHandle, app.rive.FontAsset> {
        public static class: java.lang.Class<app.rive.FontAsset.Companion>;
        public getLabel(): string;
        public 'decode-epMswW4'(queue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public register(param0: app.rive.core.CommandQueue, param1: string, param2: any): void;
        public getTag(): string;
        public 'register-AltPSKk'(queue: app.rive.core.CommandQueue, key: string, handle: number): void;
        public decode(param0: app.rive.core.CommandQueue, param1: androidNative.Array<number>, param2: any): any;
        public unregister(param0: app.rive.core.CommandQueue, param1: string): void;
        public 'construct-5E6tRKQ'(handle: number, queue: app.rive.core.CommandQueue): app.rive.FontAsset;
        public construct(param0: any, param1: app.rive.core.CommandQueue): any;
        public unregister(queue: app.rive.core.CommandQueue, key: string): void;
        public 'delete-8-RWjZU'(queue: app.rive.core.CommandQueue, handle: number): void;
        public fromBytes(commandQueue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public delete(param0: app.rive.core.CommandQueue, param1: any): void;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class ImageAsset extends app.rive.Asset<app.rive.core.ImageHandle> {
      public static class: java.lang.Class<app.rive.ImageAsset>;
      public static $stable: number;
    }
    export namespace ImageAsset {
      export class Companion extends app.rive.AssetOps<app.rive.core.ImageHandle, app.rive.ImageAsset> {
        public static class: java.lang.Class<app.rive.ImageAsset.Companion>;
        public getLabel(): string;
        public register(param0: app.rive.core.CommandQueue, param1: string, param2: any): void;
        public getTag(): string;
        public decode(param0: app.rive.core.CommandQueue, param1: androidNative.Array<number>, param2: any): any;
        public 'decode-Gs2_IdU'(queue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public unregister(param0: app.rive.core.CommandQueue, param1: string): void;
        public 'delete-QieQ09U'(queue: app.rive.core.CommandQueue, handle: number): void;
        public 'register-jp8Sumo'(queue: app.rive.core.CommandQueue, key: string, handle: number): void;
        public 'construct-adYM1ho'(handle: number, queue: app.rive.core.CommandQueue): app.rive.ImageAsset;
        public construct(param0: any, param1: app.rive.core.CommandQueue): any;
        public unregister(queue: app.rive.core.CommandQueue, key: string): void;
        public fromBytes(commandQueue: app.rive.core.CommandQueue, bytes: androidNative.Array<number>, $completion: any): any;
        public delete(param0: app.rive.core.CommandQueue, param1: any): void;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class Result<T> extends java.lang.Object {
      public static class: java.lang.Class<app.rive.Result<any>>;
      /**
       * Constructs a new instance of the app.rive.Result<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { andThen(param0: app.rive.Result<any>, param1: any, param2: androidx.compose.runtime.Composer, param3: number): app.rive.Result<any> });
      public constructor();
      public andThen(param0: app.rive.Result<any>, param1: any, param2: androidx.compose.runtime.Composer, param3: number): app.rive.Result<any>;
    }
    export namespace Result {
      export class DefaultImpls {
        public static class: java.lang.Class<app.rive.Result.DefaultImpls>;
        public static andThen($this: app.rive.Result<any>, $receiver: app.rive.Result<any>, onSuccess: any, $composer: androidx.compose.runtime.Composer, $changed: number): app.rive.Result<any>;
      }
      export class Error extends app.rive.Result<any> {
        public static class: java.lang.Class<app.rive.Result.Error>;
        public static $stable: number;
        public andThen($this$andThen: app.rive.Result<any>, onSuccess: any, $composer: androidx.compose.runtime.Composer, $changed: number): app.rive.Result<any>;
        public copy(throwable: java.lang.Throwable): app.rive.Result.Error;
        public constructor(throwable: java.lang.Throwable);
        public equals(other: any): boolean;
        public component1(): java.lang.Throwable;
        public hashCode(): number;
        public andThen(param0: app.rive.Result<any>, param1: any, param2: androidx.compose.runtime.Composer, param3: number): app.rive.Result<any>;
        public toString(): string;
        public getThrowable(): java.lang.Throwable;
      }
      export class Loading extends app.rive.Result<any> {
        public static class: java.lang.Class<app.rive.Result.Loading>;
        public static INSTANCE: app.rive.Result.Loading;
        public static $stable: number;
        public andThen($this$andThen: app.rive.Result<any>, onSuccess: any, $composer: androidx.compose.runtime.Composer, $changed: number): app.rive.Result<any>;
        public andThen(param0: app.rive.Result<any>, param1: any, param2: androidx.compose.runtime.Composer, param3: number): app.rive.Result<any>;
      }
      export class Success<T> extends app.rive.Result<any> {
        public static class: java.lang.Class<app.rive.Result.Success<any>>;
        public static $stable: number;
        public andThen($this$andThen: app.rive.Result<any>, onSuccess: any, $composer: androidx.compose.runtime.Composer, $changed: number): app.rive.Result<any>;
        public equals(other: any): boolean;
        public hashCode(): number;
        public constructor(value: any);
        public andThen(param0: app.rive.Result<any>, param1: any, param2: androidx.compose.runtime.Composer, param3: number): app.rive.Result<any>;
        public copy(value: any): app.rive.Result.Success<any>;
        public component1(): any;
        public getValue(): any;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class RiveFile {
      public static class: java.lang.Class<app.rive.RiveFile>;
      public static $stable: number;
      public 'getFileHandle-ENT3xMk$any_release'(): number;
      public getViewModelNames($completion: any): any;
      public getArtboardNames($completion: any): any;
      public getEnums($completion: any): any;
      public getViewModelProperties(answer$iv: string, $i$f$getOrPut: any): any;
      public close(): void;
      public getCommandQueue$any_release(): app.rive.core.CommandQueue;
      public getViewModelInstanceNames(answer$iv: string, $i$f$getOrPut: any): any;
    }
    export namespace RiveFile {
      export class Companion {
        public static class: java.lang.Class<app.rive.RiveFile.Companion>;
        public fromSource(source: app.rive.RiveFileSource, source: app.rive.core.CommandQueue, source: any): any;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class RiveFileSource {
      public static class: java.lang.Class<app.rive.RiveFileSource>;
      /**
       * Constructs a new instance of the app.rive.RiveFileSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {});
      public constructor();
    }
    export namespace RiveFileSource {
      export class Bytes extends app.rive.RiveFileSource {
        public static class: java.lang.Class<app.rive.RiveFileSource.Bytes>;
        public static 'toString-impl'(arg0: androidNative.Array<number>): string;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: androidNative.Array<number>): number;
        public hashCode(): number;
        public getData(): androidNative.Array<number>;
        public static 'equals-impl'(arg0: androidNative.Array<number>, other: any): boolean;
        public static 'equals-impl0'(p1: androidNative.Array<number>, p2: androidNative.Array<number>): boolean;
        public toString(): string;
        public static 'constructor-impl'(data: androidNative.Array<number>): androidNative.Array<number>;
      }
      export class RawRes extends app.rive.RiveFileSource {
        public static class: java.lang.Class<app.rive.RiveFileSource.RawRes>;
        public static $stable: number;
        public component2(): globalAndroid.content.res.Resources;
        public equals(other: any): boolean;
        public getResources(): globalAndroid.content.res.Resources;
        public hashCode(): number;
        public component1(): number;
        public constructor(resId: number, resources: globalAndroid.content.res.Resources);
        public getResId(): number;
        public copy(resId: number, resources: globalAndroid.content.res.Resources): app.rive.RiveFileSource.RawRes;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class RiveLog {
      public static class: java.lang.Class<app.rive.RiveLog>;
      public static INSTANCE: app.rive.RiveLog;
      public static $stable: number;
      public getLogger(): app.rive.RiveLog.Logger;
      public setLogger(value: app.rive.RiveLog.Logger): void;
      public static v($i$f$v: string, tag: any): void;
      public static d($i$f$d: string, tag: any): void;
      public static i($i$f$i: string, tag: any): void;
      public static w($i$f$w: string, tag: any): void;
      public static e($i$f$e: string, tag: java.lang.Throwable, t: any): void;
    }
    export namespace RiveLog {
      export class LogcatLogger extends app.rive.RiveLog.Logger {
        public static class: java.lang.Class<app.rive.RiveLog.LogcatLogger>;
        public static $stable: number;
        public d(tag: string, msg: any): void;
        public i(tag: string, msg: any): void;
        public i(param0: string, param1: any): void;
        public w(param0: string, param1: any): void;
        public v(tag: string, msg: any): void;
        public e(param0: string, param1: java.lang.Throwable, param2: any): void;
        public w(tag: string, msg: any): void;
        public v(param0: string, param1: any): void;
        public d(param0: string, param1: any): void;
        public constructor();
        public e(tag: string, t: java.lang.Throwable, msg: any): void;
      }
      export class Logger {
        public static class: java.lang.Class<app.rive.RiveLog.Logger>;
        /**
         * Constructs a new instance of the app.rive.RiveLog$Logger interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { v(param0: string, param1: any): void; d(param0: string, param1: any): void; i(param0: string, param1: any): void; w(param0: string, param1: any): void; e(param0: string, param1: java.lang.Throwable, param2: any): void });
        public constructor();
        public i(param0: string, param1: any): void;
        public w(param0: string, param1: any): void;
        public e(param0: string, param1: java.lang.Throwable, param2: any): void;
        public v(param0: string, param1: any): void;
        public d(param0: string, param1: any): void;
      }
      export namespace Logger {
        export class DefaultImpls {
          public static class: java.lang.Class<app.rive.RiveLog.Logger.DefaultImpls>;
          public static v($this: app.rive.RiveLog.Logger, tag: string, msg: any): void;
          public static w($this: app.rive.RiveLog.Logger, tag: string, msg: any): void;
          public static d($this: app.rive.RiveLog.Logger, tag: string, msg: any): void;
          public static i($this: app.rive.RiveLog.Logger, tag: string, msg: any): void;
          public static e($this: app.rive.RiveLog.Logger, tag: string, t: java.lang.Throwable, msg: any): void;
        }
      }
      export class NoOpLogger extends app.rive.RiveLog.Logger {
        public static class: java.lang.Class<app.rive.RiveLog.NoOpLogger>;
        public static INSTANCE: app.rive.RiveLog.NoOpLogger;
        public static $stable: number;
        public d(tag: string, msg: any): void;
        public i(tag: string, msg: any): void;
        public i(param0: string, param1: any): void;
        public w(param0: string, param1: any): void;
        public v(tag: string, msg: any): void;
        public e(param0: string, param1: java.lang.Throwable, param2: any): void;
        public w(tag: string, msg: any): void;
        public v(param0: string, param1: any): void;
        public d(param0: string, param1: any): void;
        public e(tag: string, t: java.lang.Throwable, msg: any): void;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class RiveUIView {
      public static class: java.lang.Class<app.rive.RiveUIView>;
      public static $stable: number;
      public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
      public constructor(context: globalAndroid.content.Context);
      public constructor($this$textureView_u24lambda_u240: globalAndroid.content.Context, this_: globalAndroid.util.AttributeSet, context: number);
      public getTextureView(): globalAndroid.view.TextureView;
      public onAttachedToWindow(): void;
      public setRiveFile(file: app.rive.RiveFile, artboard: app.rive.Artboard, stateMachineName: string): void;
      public onDetachedFromWindow(): void;
    }
  }
}

declare namespace app {
  export namespace rive {
    export class ViewModelInstance {
      public static class: java.lang.Class<app.rive.ViewModelInstance>;
      public static $stable: number;
      public getColorFlow(propertyPath: string): kotlinx.coroutines.flow.Flow<java.lang.Integer>;
      public setString(propertyPath: string, value: string): void;
      public 'getInstanceHandle-VPLto4w$any_release'(): number;
      public getBooleanFlow(propertyPath: string): kotlinx.coroutines.flow.Flow<java.lang.Boolean>;
      public setNumber(propertyPath: string, value: number): void;
      public setBoolean(propertyPath: string, value: boolean): void;
      public getDirtyFlow$any_release(): kotlinx.coroutines.flow.SharedFlow<any>;
      public fireTrigger(propertyPath: string): void;
      public getTriggerFlow($i$f$unsafeTransform: string): kotlinx.coroutines.flow.Flow<any>;
      public setEnum(propertyPath: string, value: string): void;
      public setColor(propertyPath: string, value: number): void;
      public getNumberFlow(propertyPath: string): kotlinx.coroutines.flow.Flow<java.lang.Float>;
      public getStringFlow(propertyPath: string): kotlinx.coroutines.flow.Flow<string>;
      public getEnumFlow(propertyPath: string): kotlinx.coroutines.flow.Flow<string>;
      public close(): void;
    }
    export namespace ViewModelInstance {
      export class Companion {
        public static class: java.lang.Class<app.rive.ViewModelInstance.Companion>;
        public fromFile(tag$iv: app.rive.RiveFile, msg$iv: app.rive.ViewModelInstanceSource): app.rive.ViewModelInstance;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class ViewModelInstanceSource {
      public static class: java.lang.Class<app.rive.ViewModelInstanceSource>;
      /**
       * Constructs a new instance of the app.rive.ViewModelInstanceSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: {});
      public constructor();
    }
    export namespace ViewModelInstanceSource {
      export class Blank extends app.rive.ViewModelInstanceSource {
        public static class: java.lang.Class<app.rive.ViewModelInstanceSource.Blank>;
        public static 'equals-impl0'(p1: app.rive.ViewModelSource, p2: app.rive.ViewModelSource): boolean;
        public getVmSource(): app.rive.ViewModelSource;
        public static 'hashCode-impl'(arg0: app.rive.ViewModelSource): number;
        public static 'constructor-impl'(vmSource: app.rive.ViewModelSource): app.rive.ViewModelSource;
        public equals(other: any): boolean;
        public static 'toString-impl'(arg0: app.rive.ViewModelSource): string;
        public hashCode(): number;
        public toString(): string;
        public static 'equals-impl'(arg0: app.rive.ViewModelSource, other: any): boolean;
      }
      export class Default extends app.rive.ViewModelInstanceSource {
        public static class: java.lang.Class<app.rive.ViewModelInstanceSource.Default>;
        public static 'equals-impl0'(p1: app.rive.ViewModelSource, p2: app.rive.ViewModelSource): boolean;
        public getVmSource(): app.rive.ViewModelSource;
        public static 'hashCode-impl'(arg0: app.rive.ViewModelSource): number;
        public static 'constructor-impl'(vmSource: app.rive.ViewModelSource): app.rive.ViewModelSource;
        public equals(other: any): boolean;
        public static 'toString-impl'(arg0: app.rive.ViewModelSource): string;
        public hashCode(): number;
        public toString(): string;
        public static 'equals-impl'(arg0: app.rive.ViewModelSource, other: any): boolean;
      }
      export class Named extends app.rive.ViewModelInstanceSource {
        public static class: java.lang.Class<app.rive.ViewModelInstanceSource.Named>;
        public static $stable: number;
        public getVmSource(): app.rive.ViewModelSource;
        public constructor(vmSource: app.rive.ViewModelSource, instanceName: string);
        public equals(other: any): boolean;
        public component1(): app.rive.ViewModelSource;
        public getInstanceName(): string;
        public hashCode(): number;
        public component2(): string;
        public copy(vmSource: app.rive.ViewModelSource, instanceName: string): app.rive.ViewModelInstanceSource.Named;
        public toString(): string;
      }
      export class Reference extends app.rive.ViewModelInstanceSource {
        public static class: java.lang.Class<app.rive.ViewModelInstanceSource.Reference>;
        public static $stable: number;
        public getInstance(): app.rive.ViewModelInstance;
        public equals(other: any): boolean;
        public copy(instance: app.rive.ViewModelInstance, path: string): app.rive.ViewModelInstanceSource.Reference;
        public hashCode(): number;
        public component2(): string;
        public constructor(instance: app.rive.ViewModelInstance, path: string);
        public component1(): app.rive.ViewModelInstance;
        public getPath(): string;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export class ViewModelSource {
      public static class: java.lang.Class<app.rive.ViewModelSource>;
      /**
       * Constructs a new instance of the app.rive.ViewModelSource interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
       */
      public constructor(implementation: { blankInstance(): app.rive.ViewModelInstanceSource; defaultInstance(): app.rive.ViewModelInstanceSource; namedInstance(param0: string): app.rive.ViewModelInstanceSource });
      public constructor();
      public blankInstance(): app.rive.ViewModelInstanceSource;
      public defaultInstance(): app.rive.ViewModelInstanceSource;
      public namedInstance(param0: string): app.rive.ViewModelInstanceSource;
    }
    export namespace ViewModelSource {
      export class DefaultForArtboard extends app.rive.ViewModelSource {
        public static class: java.lang.Class<app.rive.ViewModelSource.DefaultForArtboard>;
        public static 'constructor-impl'(artboard: app.rive.Artboard): app.rive.Artboard;
        public static 'blankInstance-impl'(arg0: app.rive.Artboard): app.rive.ViewModelInstanceSource;
        public static 'equals-impl'(arg0: app.rive.Artboard, other: any): boolean;
        public blankInstance(): app.rive.ViewModelInstanceSource;
        public static 'toString-impl'(arg0: app.rive.Artboard): string;
        public static 'defaultInstance-impl'(arg0: app.rive.Artboard): app.rive.ViewModelInstanceSource;
        public static 'namedInstance-impl'(arg0: app.rive.Artboard, instanceName: string): app.rive.ViewModelInstanceSource;
        public toString(): string;
        public namedInstance(instanceName: string): app.rive.ViewModelInstanceSource;
        public defaultInstance(): app.rive.ViewModelInstanceSource;
        public equals(other: any): boolean;
        public getArtboard(): app.rive.Artboard;
        public static 'equals-impl0'(p1: app.rive.Artboard, p2: app.rive.Artboard): boolean;
        public hashCode(): number;
        public static 'hashCode-impl'(arg0: app.rive.Artboard): number;
        public namedInstance(param0: string): app.rive.ViewModelInstanceSource;
      }
      export class DefaultImpls {
        public static class: java.lang.Class<app.rive.ViewModelSource.DefaultImpls>;
        public static defaultInstance($this: app.rive.ViewModelSource): app.rive.ViewModelInstanceSource;
        public static namedInstance($this: app.rive.ViewModelSource, instanceName: string): app.rive.ViewModelInstanceSource;
        public static blankInstance($this: app.rive.ViewModelSource): app.rive.ViewModelInstanceSource;
      }
      export class Named extends app.rive.ViewModelSource {
        public static class: java.lang.Class<app.rive.ViewModelSource.Named>;
        public static 'constructor-impl'(viewModelName: string): string;
        public getViewModelName(): string;
        public static 'toString-impl'(arg0: string): string;
        public static 'hashCode-impl'(arg0: string): number;
        public blankInstance(): app.rive.ViewModelInstanceSource;
        public static 'equals-impl'(arg0: string, other: any): boolean;
        public toString(): string;
        public namedInstance(instanceName: string): app.rive.ViewModelInstanceSource;
        public static 'equals-impl0'(p1: string, p2: string): boolean;
        public static 'blankInstance-impl'(arg0: string): app.rive.ViewModelInstanceSource;
        public defaultInstance(): app.rive.ViewModelInstanceSource;
        public equals(other: any): boolean;
        public static 'defaultInstance-impl'(arg0: string): app.rive.ViewModelInstanceSource;
        public hashCode(): number;
        public static 'namedInstance-impl'(arg0: string, instanceName: string): app.rive.ViewModelInstanceSource;
        public namedInstance(param0: string): app.rive.ViewModelInstanceSource;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class ArtboardHandle {
        public static class: java.lang.Class<app.rive.core.ArtboardHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class AudioHandle {
        public static class: java.lang.Class<app.rive.core.AudioHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class CloseOnce {
        public static class: java.lang.Class<app.rive.core.CloseOnce>;
        public static $stable: number;
        public close(): void;
        public constructor(onClose: any);
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class CommandQueue {
        public static class: java.lang.Class<app.rive.core.CommandQueue>;
        public static $stable: number;
        public static NULL_POINTER = 0;
        public static MAX_CONCURRENT_SUBSCRIBERS = 32;
        public 'registerAudio-4kKS7jM'(name: string, audioHandle: number): void;
        public 'setNumberProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, value: number): void;
        public 'getStringProperty-iFQtAB8'(this_$iv: number, this_: string, viewModelInstanceHandle: any): any;
        public getNumberPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<java.lang.Float>>;
        public 'setEnumProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, value: string): void;
        public 'pointerExit-OV3vCas'(stateMachineHandle: number, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, surfaceWidth: number, surfaceHeight: number, pointerID: number, pointerX: number, pointerY: number): void;
        public onAudioDecoded(requestID: number, audioHandle: number): void;
        public 'deleteFont-wK5q9OY'(fontHandle: number): void;
        public 'draw-POUf8go'(artboardHandle: number, stateMachineHandle: number, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, surface: app.rive.core.RiveSurface, clearColor: number): void;
        public getSettledFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.StateMachineHandle>;
        public 'decodeAudio-WLIIakE'(this_$iv: androidNative.Array<number>, this_: any): any;
        public constructor();
        public 'getArtboardNames-evklBmw'(this_$iv: number, this_: any): any;
        public 'getViewModelInstanceNames-mgMojzc'(this_$iv: number, this_: string, fileHandle: any): any;
        public 'decodeImage-f0BlWSU'(this_$iv: androidNative.Array<number>, this_: any): any;
        public onFileError(requestID: number, error: string): void;
        public 'deleteImage-JwfOFvA'(imageHandle: number): void;
        public 'deleteAudio-QAnvCWo'(audioHandle: number): void;
        public 'advanceStateMachine-OFH3VyA'(stateMachineHandle: number, deltaTimeNs: number): void;
        public createRiveSurface(tag$iv: globalAndroid.view.Surface): app.rive.core.RiveSurface;
        public onImageDecoded(requestID: number, imageHandle: number): void;
        public onFontDecoded(requestID: number, fontHandle: number): void;
        public getStringPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<string>>;
        public 'pointerDown-OV3vCas'(stateMachineHandle: number, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, surfaceWidth: number, surfaceHeight: number, pointerID: number, pointerX: number, pointerY: number): void;
        public 'fireTriggerProperty-ippgHXQ'(viewModelInstanceHandle: number, propertyPath: string): void;
        public onAudioError(requestID: number, error: string): void;
        public onFileLoaded(requestID: number, fileHandle: number): void;
        public onNumberPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string, value: number): void;
        public 'getColorProperty-iFQtAB8'(this_$iv: number, this_: string, viewModelInstanceHandle: any): any;
        public 'subscribeToProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, propertyType: app.rive.runtime.any): void;
        public 'setStringProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, value: string): void;
        public 'setColorProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, value: number): void;
        public onEnumsListed(requestID: number, enums: java.util.List<app.rive.runtime.any>): void;
        public 'registerFont-8-RWjZU'(name: string, fontHandle: number): void;
        public getColorPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<java.lang.Integer>>;
        public 'createDefaultStateMachine-xY8vNfM'(artboardHandle: number): number;
        public getEnumPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<string>>;
        public 'setBooleanProperty-iFQtAB8'(viewModelInstanceHandle: number, propertyPath: string, value: boolean): void;
        public onFontError(requestID: number, error: string): void;
        public onViewModelInstancesListed(requestID: number, names: java.util.List<string>): void;
        public onStateMachinesListed(requestID: number, names: java.util.List<string>): void;
        public 'deleteFile-dJ1Evnk'(fileHandle: number): void;
        public unregisterFont(name: string): void;
        public onBooleanPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string, value: boolean): void;
        public 'decodeFont-sOckvAc'(this_$iv: androidNative.Array<number>, this_: any): any;
        public onEnumPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string, value: string): void;
        public unregisterImage(name: string): void;
        public 'getViewModelNames-evklBmw'(this_$iv: number, this_: any): any;
        public withLifecycle(observer: androidx.lifecycle.LifecycleOwner, this_: string): java.lang.AutoCloseable;
        public 'loadFile-xVnc2tA'(this_$iv: androidNative.Array<number>, this_: any): any;
        public onStringPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string, value: string): void;
        public unregisterAudio(name: string): void;
        public 'deleteArtboard-uiJWFY8'(artboardHandle: number): void;
        public getBooleanPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<java.lang.Boolean>>;
        public acquire(source: string): void;
        public 'getViewModelProperties-mgMojzc'(this_$iv: number, this_: string, fileHandle: any): any;
        public onStateMachineError(requestID: number, error: string): void;
        public onArtboardError(requestID: number, error: string): void;
        public 'createDefaultArtboard-6NrLy0M'(fileHandle: number): number;
        public pollMessages(): void;
        public onViewModelsListed(requestID: number, names: java.util.List<string>): void;
        public 'deleteStateMachine-AkTCgDQ'(stateMachineHandle: number): void;
        public onStateMachineSettled(stateMachineHandle: number): void;
        public 'pointerMove-OV3vCas'(stateMachineHandle: number, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, surfaceWidth: number, surfaceHeight: number, pointerID: number, pointerX: number, pointerY: number): void;
        public 'createViewModelInstance-j73Dd8U'(vm: number, vm: app.rive.ViewModelInstanceSource): number;
        public release(source: string, reason: string): void;
        public 'bindViewModelInstance-ei-yHz8'(stateMachineHandle: number, viewModelInstanceHandle: number): void;
        public onImageError(requestID: number, error: string): void;
        public onTriggerPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string): void;
        public onViewModelPropertiesListed(requestID: number, properties: java.util.List<app.rive.runtime.any>): void;
        public getTriggerPropertyFlow(): kotlinx.coroutines.flow.SharedFlow<app.rive.core.CommandQueue.PropertyUpdate<any>>;
        public 'createArtboardByName-2ZIOzHc'(fileHandle: number, name: string): number;
        public 'pointerUp-OV3vCas'(stateMachineHandle: number, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, surfaceWidth: number, surfaceHeight: number, pointerID: number, pointerX: number, pointerY: number): void;
        public 'getNumberProperty-iFQtAB8'(this_$iv: number, this_: string, viewModelInstanceHandle: any): any;
        public onColorPropertyUpdated(requestID: number, viewModelInstanceHandle: number, propertyName: string, value: number): void;
        public 'getEnumProperty-iFQtAB8'(this_$iv: number, this_: string, viewModelInstanceHandle: any): any;
        public onViewModelInstanceError(requestID: number, error: string): void;
        public 'createStateMachineByName-ItmKBmM'(artboardHandle: number, name: string): number;
        public 'getEnums-evklBmw'(this_$iv: number, this_: any): any;
        public 'deleteViewModelInstance-mBajs_U'(viewModelInstanceHandle: number): void;
        public 'getBooleanProperty-iFQtAB8'(this_$iv: number, this_: string, viewModelInstanceHandle: any): any;
        public 'registerImage-QieQ09U'(name: string, imageHandle: number): void;
        public onArtboardsListed(requestID: number, names: java.util.List<string>): void;
        public 'getStateMachineNames-b88yb0A'(this_$iv: number, this_: any): any;
        public beginPolling(lifecycle: androidx.lifecycle.Lifecycle, ticker: app.rive.core.FrameTicker, $completion: any): any;
      }
      export namespace CommandQueue {
        export class Companion {
          public static class: java.lang.Class<app.rive.core.CommandQueue.Companion>;
        }
        export class PropertyUpdate<T> extends java.lang.Object {
          public static class: java.lang.Class<app.rive.core.CommandQueue.PropertyUpdate<any>>;
          public static $stable: number;
          public 'copy-iFQtAB8'(handle: number, propertyPath: string, value: T): app.rive.core.CommandQueue.PropertyUpdate<T>;
          public getPropertyPath(): string;
          public 'getHandle-VPLto4w'(): number;
          public toString(): string;
          public 'component1-VPLto4w'(): number;
          public component2(): string;
          public component3(): T;
          public getValue(): T;
          public equals(other: any): boolean;
          public hashCode(): number;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class CommandQueueBridge {
        public static class: java.lang.Class<app.rive.core.CommandQueueBridge>;
        /**
         * Constructs a new instance of the app.rive.core.CommandQueueBridge interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { 'loadFile-xVnc2tA'(param0: number, param1: androidNative.Array<number>): number });
        public constructor();
        public 'loadFile-xVnc2tA'(param0: number, param1: androidNative.Array<number>): number;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class DeferredResult<T> extends java.lang.Object {
        public static class: java.lang.Class<app.rive.core.DeferredResult<any>>;
        /**
         * Constructs a new instance of the app.rive.core.DeferredResult<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {});
        public constructor();
      }
      export namespace DeferredResult {
        export class Failure extends app.rive.core.DeferredResult<any> {
          public static class: java.lang.Class<app.rive.core.DeferredResult.Failure>;
          public static $stable: number;
          public constructor(error: java.lang.Throwable);
          public toString(): string;
          public component1(): java.lang.Throwable;
          public equals(other: any): boolean;
          public hashCode(): number;
          public copy(error: java.lang.Throwable): app.rive.core.DeferredResult.Failure;
          public getError(): java.lang.Throwable;
        }
        export class Success<T> extends app.rive.core.DeferredResult<any> {
          public static class: java.lang.Class<app.rive.core.DeferredResult.Success<any>>;
          public static $stable: number;
          public getValue(): any;
          public toString(): string;
          public component1(): any;
          public copy(value: any): app.rive.core.DeferredResult.Success<any>;
          public equals(other: any): boolean;
          public hashCode(): number;
          public constructor(value: any);
        }
        export class Uninitialized extends app.rive.core.DeferredResult<any> {
          public static class: java.lang.Class<app.rive.core.DeferredResult.Uninitialized>;
          public static INSTANCE: app.rive.core.DeferredResult.Uninitialized;
          public static $stable: number;
          public toString(): string;
          public equals(other: any): boolean;
          public hashCode(): number;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class DrawKey {
        public static class: java.lang.Class<app.rive.core.DrawKey>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class FileHandle {
        public static class: java.lang.Class<app.rive.core.FileHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class FontHandle {
        public static class: java.lang.Class<app.rive.core.FontHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class FrameTicker {
        public static class: java.lang.Class<app.rive.core.FrameTicker>;
        /**
         * Constructs a new instance of the app.rive.core.FrameTicker interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { withFrame(param0: any, param1: any): any });
        public constructor();
        public withFrame(param0: any, param1: any): any;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class ImageHandle {
        public static class: java.lang.Class<app.rive.core.ImageHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class Listeners {
        public static class: java.lang.Class<app.rive.core.Listeners>;
        public static $stable: number;
        public getAudioListener(): number;
        public component4(): number;
        public component2(): number;
        public dispose$any_release(): void;
        public component1(): number;
        public component7(): number;
        public toString(): string;
        public copy(fileListener: number, artboardListener: number, stateMachineListener: number, viewModelInstanceListener: number, imageListener: number, audioListener: number, fontListener: number): app.rive.core.Listeners;
        public component3(): number;
        public getViewModelInstanceListener(): number;
        public component5(): number;
        public equals(other: any): boolean;
        public getArtboardListener(): number;
        public getImageListener(): number;
        public hashCode(): number;
        public getFontListener(): number;
        public component6(): number;
        public getFileListener(): number;
        public constructor(fileListener: number, artboardListener: number, stateMachineListener: number, viewModelInstanceListener: number, imageListener: number, audioListener: number, fontListener: number);
        public getStateMachineListener(): number;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class RCPointer {
        public static class: java.lang.Class<app.rive.core.RCPointer>;
        public static $stable: number;
        public getLabel(): string;
        public acquire($i$f$v: string): void;
        public getPointer(): number;
        public getOnDelete(): any;
        public constructor(cppPointer: number, onDelete: any, label: string);
        public release(tag$iv: string, msg$iv: string): void;
      }
      export namespace RCPointer {
        export class Companion {
          public static class: java.lang.Class<app.rive.core.RCPointer.Companion>;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class RiveSurface {
        public static class: java.lang.Class<app.rive.core.RiveSurface>;
        public static $stable: number;
        public getHeight(): number;
        public component4(): number;
        public getEglSurface(): globalAndroid.opengl.EGLSurface;
        public 'component5-DhFih_o'(): number;
        public component7(): number;
        public toString(): string;
        public 'getDrawKey-DhFih_o'(): number;
        public component1(): globalAndroid.view.Surface;
        public getWidth(): number;
        public equals(other: any): boolean;
        public getSurface(): globalAndroid.view.Surface;
        public getRenderTargetPointer(): number;
        public component2(): globalAndroid.opengl.EGLSurface;
        public hashCode(): number;
        public dispose(): void;
        public 'copy-__Kf5Qc'(surface: globalAndroid.view.Surface, eglSurface: globalAndroid.opengl.EGLSurface, display: globalAndroid.opengl.EGLDisplay, renderTargetPointer: number, drawKey: number, width: number, height: number): app.rive.core.RiveSurface;
        public component6(): number;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class StateMachineHandle {
        public static class: java.lang.Class<app.rive.core.StateMachineHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class SuspendLazy<T> extends java.lang.Object {
        public static class: java.lang.Class<app.rive.core.SuspendLazy<any>>;
        public static $stable: number;
        public constructor(block: any);
        public await(this_: any): any;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace core {
      export class ViewModelInstanceHandle {
        public static class: java.lang.Class<app.rive.core.ViewModelInstanceHandle>;
        public static 'constructor-impl'(handle: number): number;
        public equals(other: any): boolean;
        public static 'hashCode-impl'(arg0: number): number;
        public static 'toString-impl'(arg0: number): string;
        public getHandle(): number;
        public hashCode(): number;
        public static 'equals-impl'(arg0: number, other: any): boolean;
        public static 'equals-impl0'(p1: number, p2: number): boolean;
        public toString(): string;
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class ChangedInput {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public getValue(): any;
          public copy(stateMachineName: string, name: string, value: any, nestedArtboardPath: string): app.rive.runtime.any;
          public component2(): string;
          public equals(other: any): boolean;
          public component3(): any;
          public toString(): string;
          public component1(): string;
          public getName(): string;
          public component4(): string;
          public constructor(stateMachineName: string, name: string, value: any, nestedArtboardPath: string);
          public getNestedArtboardPath(): string;
          public hashCode(): number;
          public getStateMachineName(): string;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class Observable<ListenerType> extends java.lang.Object {
          public static class: java.lang.Class<app.rive.runtime.any>;
          /**
           * Constructs a new instance of the app.rive.runtime.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { registerListener(param0: ListenerType): void; unregisterListener(param0: ListenerType): void });
          public constructor();
          public registerListener(param0: ListenerType): void;
          public unregisterListener(param0: ListenerType): void;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export abstract class ResourceType {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
        }
        export namespace ResourceType {
          export class Companion {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public makeMaybeResource(value: any): app.rive.runtime.any;
          }
          export class ResourceBytes extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(bytes: androidNative.Array<number>);
            public getBytes(): androidNative.Array<number>;
          }
          export class ResourceId extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(id: number);
            public getId(): number;
          }
          export class ResourceRiveFile extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getFile(): app.rive.runtime.any;
            public constructor(file: app.rive.runtime.any);
          }
          export class ResourceUrl extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(url: string);
            public getUrl(): string;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class RiveAnimationView extends app.rive.runtime.any implements app.rive.runtime.any {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public static TAG = 'RiveAnimationView';
          public static SINGLE_TOUCH_ID = 0;
          public static traceAnimationsDefault: boolean = 0;
          public static shouldLoadCDNAssetsDefault: boolean = 1;
          public constructor(ctx$iv: globalAndroid.content.Context, this_$iv: globalAndroid.util.AttributeSet);
          public getStateMachines(): java.util.List<app.rive.runtime.any>;
          public getTouchPassThrough(): boolean;
          public getFit(): app.rive.runtime.any;
          public onAttachedToWindow(): void;
          public setNumberStateAtPath(inputName: string, value: number, path: string): void;
          public setRiveResource($this$setRiveResource_u24lambda_u249: number, this_: string, resId: string, artboardName: string, animationName: boolean, stateMachineName: boolean, autoplay: app.rive.runtime.any, autoBind: app.rive.runtime.any, fit: app.rive.runtime.any): void;
          public fireState(stateMachineName: string, inputName: string): void;
          public onTouchEvent(x: globalAndroid.view.MotionEvent): boolean;
          public pause(): void;
          public setLayoutScaleFactorAutomatic$any_release(value: number): void;
          public getController(): app.rive.runtime.any;
          public setController(value: app.rive.runtime.any): void;
          public createRenderer(): app.rive.runtime.any;
          public getAutoplay(): boolean;
          public pause(animationNames: java.util.List<string>, areStateMachines: boolean): void;
          public setAutoplay(value: boolean): void;
          public unregisterListener(listener: app.rive.runtime.any): void;
          public removeEventListener(listener: app.rive.runtime.any): void;
          public stop(animationNames: java.util.List<string>, areStateMachines: boolean): void;
          public setNumberState(stateMachineName: string, inputName: string, value: number): void;
          public getLayoutScaleFactor(): java.lang.Float;
          public onSurfaceTextureSizeChanged(surface: globalAndroid.graphics.SurfaceTexture, width: number, height: number): void;
          public play($this$play_u24lambda_u247: java.util.List<string>, this_: app.rive.runtime.any, animationNames: app.rive.runtime.any, loop: boolean, direction: boolean): void;
          public setTextRunValue(textRunName: string, textValue: string): void;
          public addEventListener(listener: app.rive.runtime.any): void;
          public setMultiTouchEnabled(pointers: boolean): void;
          public restoreControllerState(state: app.rive.runtime.any): void;
          public registerListener(listener: app.rive.runtime.any): void;
          public stop(): void;
          public getTextRunValue(textRunName: string): string;
          public constructor($this$_init__u24lambda_u242: app.rive.runtime.any);
          public getArtboardRenderer(): app.rive.runtime.any;
          public setLayoutScaleFactor(value: java.lang.Float): void;
          public getAnimations(): java.util.List<app.rive.runtime.any>;
          public getFile(): app.rive.runtime.any;
          public getRendererAttributes(): app.rive.runtime.any;
          public getLayoutScaleFactorAutomatic(): number;
          public saveControllerState(): app.rive.runtime.any;
          public unregisterListener(param0: any): void;
          public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
          public onMeasure(providedWidth: number, heightMode: number): void;
          public setArtboardName(name: string): void;
          public getTextRunValue(textRunName: string, path: string): string;
          public getVolume(): java.lang.Float;
          public onSurfaceTextureAvailable(surfaceTexture: globalAndroid.graphics.SurfaceTexture, width: number, height: number): void;
          public isPlaying(): boolean;
          public setRiveBytes(data: androidNative.Array<number>, artboardName: string, animationName: string, stateMachineName: string, autoplay: boolean, autoBind: boolean, fit: app.rive.runtime.kotlin.core.Fit, alignment: app.rive.runtime.kotlin.core.Alignment, loop: app.rive.runtime.kotlin.core.Loop): void;
          public setTouchPassThrough(value: boolean): void;
          public createObserver(): androidx.lifecycle.LifecycleObserver;
          public setFit(value: app.rive.runtime.any): void;
          public setAlignment(value: app.rive.runtime.any): void;
          public setAssetLoader(old: app.rive.runtime.any): void;
          public stop(animationName: string, isStateMachine: boolean): void;
          public onDetachedFromWindow(): void;
          public pause(animationName: string, isStateMachine: boolean): void;
          public reset(): void;
          public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
          public setTextRunValue(textRunName: string, textValue: string, path: string): void;
          public getArtboardName(): string;
          public setRiveFile($this$setRiveFile_u24lambda_u2411: app.rive.runtime.any, this_: string, file: string, artboardName: string, animationName: boolean, stateMachineName: boolean, autoplay: app.rive.runtime.any, autoBind: app.rive.runtime.any, fit: app.rive.runtime.any): void;
          public getMultiTouchEnabled(): boolean;
          public play($this$play_u24lambda_u246: app.rive.runtime.any, this_: app.rive.runtime.any, loop: boolean): void;
          public setBooleanState(stateMachineName: string, inputName: string, value: boolean): void;
          public setVolume(value: number): void;
          public fireStateAtPath(inputName: string, path: string): void;
          public setMultipleStates(inputs: androidNative.Array<app.rive.runtime.any>): void;
          public getAlignment(): app.rive.runtime.any;
          public setBooleanStateAtPath(inputName: string, value: boolean, path: string): void;
          public play($this$play_u24lambda_u248: string, this_: app.rive.runtime.any, animationName: app.rive.runtime.any, loop: boolean, direction: boolean): void;
          public getDefaultAutoplay(): boolean;
          public registerListener(param0: any): void;
        }
        export namespace RiveAnimationView {
          export class Builder {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public setArtboardName$any_release(value: string): void;
            public setRendererType($this$setRendererType_u24lambda_u243: app.rive.runtime.any): app.rive.runtime.any;
            public setTraceAnimations$any_release(value: java.lang.Boolean): void;
            public setStateMachineName$any_release(value: string): void;
            public setTraceAnimations($this$setTraceAnimations_u24lambda_u246: boolean): app.rive.runtime.any;
            public getLoop$any_release(): app.rive.runtime.any;
            public setArtboardName($this$setArtboardName_u24lambda_u247: string): app.rive.runtime.any;
            public setResource$any_release(value: any): void;
            public getResourceType$any_release(): app.rive.runtime.any;
            public setResource($this$setResource_u24lambda_u2410: any): app.rive.runtime.any;
            public setFit($this$setFit_u24lambda_u241: app.rive.runtime.any): app.rive.runtime.any;
            public getResource$any_release(): any;
            public setLoop$any_release(value: app.rive.runtime.any): void;
            public setAutoplay($this$setAutoplay_u24lambda_u244: boolean): app.rive.runtime.any;
            public build(): app.rive.runtime.any;
            public setShouldLoadCDNAssets($this$setShouldLoadCDNAssets_u24lambda_u2412: boolean): app.rive.runtime.any;
            public setFit$any_release(value: app.rive.runtime.any): void;
            public setShouldLoadCDNAssets$any_release(value: boolean): void;
            public setAlignment$any_release(value: app.rive.runtime.any): void;
            public getShouldLoadCDNAssets$any_release(): boolean;
            public setResourceType$any_release(value: app.rive.runtime.any): void;
            public setRendererType$any_release(value: app.rive.runtime.any): void;
            public getContext$any_release(): globalAndroid.content.Context;
            public getMultiTouchEnabled$any_release(): boolean;
            public setAlignment($this$setAlignment_u24lambda_u240: app.rive.runtime.any): app.rive.runtime.any;
            public getTouchPassThrough$any_release(): boolean;
            public setTouchPassThrough$any_release(value: boolean): void;
            public getAnimationName$any_release(): string;
            public getTraceAnimations$any_release(): java.lang.Boolean;
            public getAlignment$any_release(): app.rive.runtime.any;
            public setAssetLoader$any_release(value: app.rive.runtime.any): void;
            public setTouchPassThrough($this$setTouchPassThrough_u24lambda_u2413: boolean): app.rive.runtime.any;
            public setAnimationName($this$setAnimationName_u24lambda_u248: string): app.rive.runtime.any;
            public getStateMachineName$any_release(): string;
            public setMultiTouchEnabled($this$setMultiTouchEnabled_u24lambda_u2414: boolean): app.rive.runtime.any;
            public setAnimationName$any_release(value: string): void;
            public setAutoBind($this$setAutoBind_u24lambda_u245: boolean): app.rive.runtime.any;
            public getRendererType$any_release(): app.rive.runtime.any;
            public getArtboardName$any_release(): string;
            public getAssetLoader$any_release(): app.rive.runtime.any;
            public setStateMachineName($this$setStateMachineName_u24lambda_u249: string): app.rive.runtime.any;
            public setAutoBind$any_release(value: boolean): void;
            public setAssetLoader($this$setAssetLoader_u24lambda_u2411: app.rive.runtime.any): app.rive.runtime.any;
            public setLoop($this$setLoop_u24lambda_u242: app.rive.runtime.any): app.rive.runtime.any;
            public getAutoBind$any_release(): boolean;
            public getFit$any_release(): app.rive.runtime.any;
            public setMultiTouchEnabled$any_release(value: boolean): void;
            public constructor(context: globalAndroid.content.Context);
            public getAutoplay$any_release(): java.lang.Boolean;
            public setAutoplay$any_release(value: java.lang.Boolean): void;
          }
          export class Companion {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getFitIndexDefault(): number;
            public getLoopIndexDefault(): number;
            public getRendererIndexDefault(): number;
            public getAlignmentIndexDefault(): number;
          }
          export class RendererAttributes {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getAssetLoader(): app.rive.runtime.any;
            public getAutoBind(): boolean;
            public setRiveTraceAnimations(value: boolean): void;
            public getAnimationName(): string;
            public getAutoplay(): boolean;
            public setAutoBind(value: boolean): void;
            public setLoop(value: app.rive.runtime.any): void;
            public getStateMachineName(): string;
            public setRendererType(value: app.rive.runtime.any): void;
            public setAutoplay(value: boolean): void;
            public getFit(): app.rive.runtime.any;
            public setAssetLoader(value: app.rive.runtime.any): void;
            public constructor(alignmentIndex: number, fitIndex: number, loopIndex: number, rendererIndex: number, autoplay: boolean, autoBind: boolean, riveTraceAnimations: boolean, artboardName: string, animationName: string, stateMachineName: string, resource: app.rive.runtime.any, assetLoader: app.rive.runtime.any);
            public getRiveTraceAnimations(): boolean;
            public getRendererType(): app.rive.runtime.any;
            public setAnimationName(value: string): void;
            public setArtboardName(value: string): void;
            public setResource(value: app.rive.runtime.any): void;
            public setAlignment(value: app.rive.runtime.any): void;
            public getArtboardName(): string;
            public getResource(): app.rive.runtime.any;
            public setFit(value: app.rive.runtime.any): void;
            public getAlignment(): app.rive.runtime.any;
            public getLoop(): app.rive.runtime.any;
            public setStateMachineName(value: string): void;
          }
          export namespace RendererAttributes {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public assetLoaderFrom(it: string, context: globalAndroid.content.Context): app.rive.runtime.any;
            }
          }
          export namespace onTouchEvent {
            export class PointerInfo {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public copy(id: number, x: number, y: number): app.rive.runtime.any;
              public getY(): number;
              public component1(): number;
              public constructor(id: number, x: number, y: number);
              public hashCode(): number;
              public component2(): number;
              public equals(other: any): boolean;
              public getId(): number;
              public component3(): number;
              public toString(): string;
              public getX(): number;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class RiveFileRequest extends com.android.volley.Request<app.rive.runtime.any> {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public parseNetworkResponse(file: com.android.volley.NetworkResponse): com.android.volley.Response<app.rive.runtime.any>;
          public constructor(url: string, rendererType: app.rive.runtime.any, listener: com.android.volley.Response.Listener<app.rive.runtime.any>, errorListener: com.android.volley.Response.ErrorListener, assetLoader: app.rive.runtime.any);
          public deliverResponse(response: app.rive.runtime.any): void;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class RiveInitializer extends androidx.startup.Initializer<any> {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public constructor();
          public dependencies(): java.util.List<java.lang.Class<any>>;
          public create(context: globalAndroid.content.Context): void;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export abstract class RiveTextureView {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public onDetachedFromWindow(): void;
          public getLifecycleObserver(): androidx.lifecycle.LifecycleObserver;
          public onSurfaceTextureAvailable(viewSurface: globalAndroid.graphics.SurfaceTexture, $this$onSurfaceTextureAvailable_u24lambda_u241: number, this_: number): void;
          public constructor(context: globalAndroid.content.Context, attrs: globalAndroid.util.AttributeSet);
          public setRenderer(value: app.rive.runtime.any): void;
          public onSurfaceTextureSizeChanged(surface: globalAndroid.graphics.SurfaceTexture, width: number, height: number): void;
          public onAttachedToWindow(): void;
          public getActivity(): globalAndroid.app.Activity;
          public onVisibilityChanged(changedView: globalAndroid.view.View, visibility: number): void;
          public getRenderer(): app.rive.runtime.any;
          public createObserver(): androidx.lifecycle.LifecycleObserver;
          public createRenderer(): app.rive.runtime.any;
          public onSurfaceTextureDestroyed(surface: globalAndroid.graphics.SurfaceTexture): boolean;
          public onSurfaceTextureUpdated(surface: globalAndroid.graphics.SurfaceTexture): void;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class RiveViewLifecycleObserver {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public onDestroy(it: androidx.lifecycle.LifecycleOwner): void;
          public onStart(owner: androidx.lifecycle.LifecycleOwner): void;
          public onResume(owner: androidx.lifecycle.LifecycleOwner): void;
          public insert(dependency: app.rive.runtime.any): void;
          public constructor(dependencies: java.util.List<app.rive.runtime.any>);
          public getDependencies(): java.util.List<app.rive.runtime.any>;
          public remove(dependency: app.rive.runtime.any): boolean;
          public onCreate(owner: androidx.lifecycle.LifecycleOwner): void;
          public onStop(owner: androidx.lifecycle.LifecycleOwner): void;
          public onPause(owner: androidx.lifecycle.LifecycleOwner): void;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export class SharedSurface extends app.rive.runtime.any {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static $stable: number;
          public constructor(surface: globalAndroid.view.Surface);
          public setRefs(value: java.util.concurrent.atomic.AtomicInteger): void;
          public getRefCount(): number;
          public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
          public acquire(): number;
          public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          public getSurface(): globalAndroid.view.Surface;
          public release(): number;
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace controllers {
          export class ControllerState {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getFile(): app.rive.runtime.any;
            public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
            public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
            public constructor(file: app.rive.runtime.any, activeArtboard: app.rive.runtime.any, animations: java.util.List<app.rive.runtime.any>, playingAnimations: java.util.HashSet<app.rive.runtime.any>, stateMachines: java.util.List<app.rive.runtime.any>, playingStateMachines: java.util.HashSet<app.rive.runtime.any>, isActive: boolean);
            public getActiveArtboard(): app.rive.runtime.any;
            public getStateMachines(): java.util.List<app.rive.runtime.any>;
            public getAnimations(): java.util.List<app.rive.runtime.any>;
            public isActive(): boolean;
            public dispose(): void;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace controllers {
          export class ControllerStateManagement {
            public static class: java.lang.Class<app.rive.runtime.any>;
            /**
             * Constructs a new instance of the app.rive.runtime.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace controllers {
          export class RiveFileController extends java.lang.Object {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public static TAG = 'RiveFileController';
            public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
            public setRiveFile(file: app.rive.runtime.any, artboardName: string): void;
            public getTextRunValue(textRunName: string, path: string): string;
            public stopAnimations(it: string, element$iv: boolean): void;
            public getPausedAnimations(): java.util.Set<app.rive.runtime.any>;
            public getRequireArtboardResize$any_release(): java.util.concurrent.atomic.AtomicBoolean;
            public setBooleanState(stateMachineName: string, inputName: string, value: boolean, path: string): void;
            public pause(): void;
            public getChangedInputs$any_release(): java.util.concurrent.ConcurrentLinkedQueue<app.rive.runtime.any>;
            public stopAnimations(): void;
            public getAnimations(): java.util.List<app.rive.runtime.any>;
            public setTargetBounds(value: globalAndroid.graphics.RectF): void;
            public getTargetBounds(): globalAndroid.graphics.RectF;
            public setTextRunValue(it: string, element$iv: string, $i$f$forEach: string): void;
            public getAutoplay(): boolean;
            public setLoop(value: app.rive.runtime.any): void;
            public reset$any_release(): void;
            public setNumberStateAtPath(inputName: string, value: number, path: string): void;
            public queueInputs$any_release(this_: androidNative.Array<app.rive.runtime.any>): void;
            public setRefs(value: java.util.concurrent.atomic.AtomicInteger): void;
            public getFit(): app.rive.runtime.any;
            public saveControllerState(): app.rive.runtime.any;
            public pause(it: string, element$iv: boolean): void;
            public setActive(value: boolean): void;
            public registerListener(param0: any): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public removeEventListener(this_: app.rive.runtime.any): void;
            public pause(it: java.util.List<string>, element$iv: boolean): void;
            public selectArtboard(artboard: string): void;
            public fireState(stateMachineName: string, inputName: string, path: string): void;
            public constructor();
            public release(): number;
            public unregisterListener(param0: any): void;
            public play(it: app.rive.runtime.any, element$iv: app.rive.runtime.any, $i$f$forEach: boolean): void;
            public fireStateAtPath(inputName: string, path: string): void;
            public advance(value: number): void;
            public getTextRunValue(textRunName: string): string;
            public play(it: java.util.List<string>, element$iv: app.rive.runtime.any, $i$f$forEach: app.rive.runtime.any, $this$forEach$iv: boolean, this_: boolean): void;
            public setActiveArtboard(it: app.rive.runtime.any): void;
            public getVolume(): java.lang.Float;
            public setFile(it: app.rive.runtime.any): void;
            public play$any_release(appliedLoop: app.rive.runtime.any, this_: app.rive.runtime.any, animationInstance: app.rive.runtime.any): void;
            public constructor(loop: app.rive.runtime.any, autoplay: boolean, file: app.rive.runtime.any, activeArtboard: app.rive.runtime.any, onStart: any);
            public getAlignment(): app.rive.runtime.any;
            public getLayoutScaleFactor(): java.lang.Float;
            public getStartStopLock$any_release(): java.util.concurrent.locks.ReentrantLock;
            public play$any_release(this_: app.rive.runtime.any, stateMachineInstance: boolean): void;
            public setFit(this_: app.rive.runtime.any): void;
            public unregisterListener(this_: app.rive.runtime.any): void;
            public addEventListener(this_: app.rive.runtime.any): void;
            public getPausedStateMachines(): java.util.Set<app.rive.runtime.any>;
            public getEventListeners(): java.util.HashSet<app.rive.runtime.any>;
            public getLayoutScaleFactorAutomatic(): number;
            public getOnStart(): any;
            public getStateMachines(): java.util.List<app.rive.runtime.any>;
            public stopAnimations(it: java.util.List<string>, element$iv: boolean): void;
            public setAlignment(this_: app.rive.runtime.any): void;
            public setNumberState(stateMachineName: string, inputName: string, value: number, path: string): void;
            public setTextRunValue(it: string, element$iv: string): void;
            public pointerEvent(it: app.rive.runtime.any, element$iv: number, $i$f$forEach: number, $this$forEach$iv: number): void;
            public setLayoutScaleFactorAutomatic$any_release(this_: number): void;
            public setVolume(value: number): void;
            public constructor(loop: app.rive.runtime.any, autoplay: boolean, file: app.rive.runtime.any, activeArtboard: app.rive.runtime.any, onStart: any, changedInputs: java.util.concurrent.ConcurrentLinkedQueue<app.rive.runtime.any>);
            public getFile(): app.rive.runtime.any;
            public getListeners(): java.util.HashSet<app.rive.runtime.any>;
            public getRefCount(): number;
            public isAdvancing(): boolean;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public setAutoplay(value: boolean): void;
            public registerListener(this_: app.rive.runtime.any): void;
            public acquire(): number;
            public isActive(): boolean;
            public setRequireArtboardResize$any_release(value: java.util.concurrent.atomic.AtomicBoolean): void;
            public getLayoutScaleFactorActive$any_release(): number;
            public setLayoutScaleFactor(this_: java.lang.Float): void;
            public restoreControllerState(it: app.rive.runtime.any): void;
            public setOnStart(value: any): void;
            public play(animationName: string, loop: app.rive.runtime.any, direction: app.rive.runtime.any, isStateMachine: boolean, settleInitialState: boolean): void;
            public setupScene$any_release(it: app.rive.runtime.any): void;
            public setBooleanStateAtPath(inputName: string, value: boolean, path: string): void;
            public autoplay(): void;
            public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
            public getLoop(): app.rive.runtime.any;
            public getActiveArtboard(): app.rive.runtime.any;
            public getArtboardBounds(): globalAndroid.graphics.RectF;
          }
          export namespace RiveFileController {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
            export class Listener {
              public static class: java.lang.Class<app.rive.runtime.any>;
              /**
               * Constructs a new instance of the app.rive.runtime.any$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: { notifyPlay(param0: app.rive.runtime.any): void; notifyPause(param0: app.rive.runtime.any): void; notifyStop(param0: app.rive.runtime.any): void; notifyLoop(param0: app.rive.runtime.any): void; notifyStateChanged(param0: string, param1: string): void; notifyAdvance(param0: number): void });
              public constructor();
              public notifyPlay(param0: app.rive.runtime.any): void;
              public notifyStop(param0: app.rive.runtime.any): void;
              public notifyLoop(param0: app.rive.runtime.any): void;
              public notifyPause(param0: app.rive.runtime.any): void;
              public notifyStateChanged(param0: string, param1: string): void;
              public notifyAdvance(param0: number): void;
            }
            export namespace Listener {
              export class DefaultImpls {
                public static class: java.lang.Class<app.rive.runtime.any>;
                public static notifyAdvance($this: app.rive.runtime.any, elapsed: number): void;
              }
            }
            export class RiveEventListener {
              public static class: java.lang.Class<app.rive.runtime.any>;
              /**
               * Constructs a new instance of the app.rive.runtime.any$RiveEventListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
               */
              public constructor(implementation: { notifyEvent(param0: app.rive.runtime.any): void });
              public constructor();
              public notifyEvent(param0: app.rive.runtime.any): void;
            }
            export class WhenMappings {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class AdvanceResult {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static ADVANCED: app.rive.runtime.any;
            public static ONESHOT: app.rive.runtime.any;
            public static LOOP: app.rive.runtime.any;
            public static PINGPONG: app.rive.runtime.any;
            public static NONE: app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static valueOf(value: string): app.rive.runtime.any;
            public static getEntries(): any;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Alignment {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static TOP_LEFT: app.rive.runtime.any;
            public static TOP_CENTER: app.rive.runtime.any;
            public static TOP_RIGHT: app.rive.runtime.any;
            public static CENTER_LEFT: app.rive.runtime.any;
            public static CENTER: app.rive.runtime.any;
            public static CENTER_RIGHT: app.rive.runtime.any;
            public static BOTTOM_LEFT: app.rive.runtime.any;
            public static BOTTOM_CENTER: app.rive.runtime.any;
            public static BOTTOM_RIGHT: app.rive.runtime.any;
            public static getEntries(): any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static valueOf(value: string): app.rive.runtime.any;
          }
          export namespace Alignment {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(this_: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class AnimationState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getName(): string;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class AnyState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Artboard extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public setViewModelInstance(it: app.rive.runtime.any): void;
            public constructor(initialPointer: number);
            public getAnimationNames(): java.util.List<string>;
            public setVolume$any_release(value: number): void;
            public setTextRunValue(this_: string, name: string, textValue: string): void;
            public getStateMachineNames(): java.util.List<string>;
            public advance(this_: number): boolean;
            public animation(it: string): app.rive.runtime.any;
            public getName(): string;
            public getTextRunValue(name: string, path: string): string;
            public setHeight(value: number): void;
            public input(input: string, this_: string): app.rive.runtime.any;
            public textRun(run: string, this_: string): app.rive.runtime.any;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public getFirstAnimation(): app.rive.runtime.any;
            public setWidth(value: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public getAnimationCount(): number;
            public stateMachine(smi: number): app.rive.runtime.any;
            public stateMachine(smi: string): app.rive.runtime.any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getTextRunValue(name: string): string;
            public resetArtboardSize(): void;
            public release(): number;
            public receiveViewModelInstance(it: app.rive.runtime.any): app.rive.runtime.any;
            public getHeight(): number;
            public constructor(unsafeCppPointer: number, lock: java.util.concurrent.locks.ReentrantLock, file: app.rive.runtime.any);
            public setTextRunValue(this_: string, name: string): void;
            public getFirstStateMachine(): app.rive.runtime.any;
            public getWidth(): number;
            public getVolume(): number;
            public getStateMachineCount(): number;
            public animation(lai: number): app.rive.runtime.any;
            public cppDrawAligned(param0: number, param1: number, param2: app.rive.runtime.any, param3: app.rive.runtime.any, param4: number): void;
            public getFile$any_release(): app.rive.runtime.any;
            public getViewModelInstance(): app.rive.runtime.any;
            public draw(value: number): void;
            public draw(value: number, this_: app.rive.runtime.any, rendererAddress: app.rive.runtime.any, fit: number): void;
            public textRun(run: string): app.rive.runtime.any;
            public getBounds(): globalAndroid.graphics.RectF;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class AudioAsset extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(address: number, rendererTypeIdx: number);
            public acquire(): number;
            public getAudio(): app.rive.runtime.any;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public setAudio(value: app.rive.runtime.any): void;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class BindableArtboard extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public cppName(param0: number): string;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getName(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class BlendState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class BytesRequest extends com.android.volley.Request<androidNative.Array<number>> {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(url: string, onResponse: any, errorListener: com.android.volley.Response.ErrorListener);
            public parseNetworkResponse(e: com.android.volley.NetworkResponse): com.android.volley.Response<androidNative.Array<number>>;
            public deliverResponse(response: androidNative.Array<number>): void;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class CDNAssetLoader extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public loadContents(request: app.rive.runtime.any, this_: androidNative.Array<number>): boolean;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(context: globalAndroid.content.Context);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export abstract class ContextAssetLoader extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public getContext(): globalAndroid.content.Context;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(context: globalAndroid.content.Context);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Direction {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static BACKWARDS: app.rive.runtime.any;
            public static FORWARDS: app.rive.runtime.any;
            public static AUTO: app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static valueOf(value: string): app.rive.runtime.any;
            public static getEntries(): any;
            public getValue(): number;
          }
          export namespace Direction {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromInt(type: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class EntryState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class EventType {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static OpenURLEvent: app.rive.runtime.any;
            public static GeneralEvent: app.rive.runtime.any;
            public static getEntries(): any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static valueOf(value: string): app.rive.runtime.any;
            public getValue(): number;
          }
          export namespace EventType {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromInt(type: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ExitState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class FallbackAssetLoader extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
            public constructor(initialPointer: number);
            public release(): number;
            public resetWith$any_release(it: app.rive.runtime.any): void;
            public appendLoader(loader: app.rive.runtime.any): void;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public prependLoader(loader: app.rive.runtime.any): void;
            public constructor(it: globalAndroid.content.Context, this_: boolean, context: app.rive.runtime.any);
            public loadContents(it: app.rive.runtime.any, element$iv: androidNative.Array<number>): boolean;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getLoaders(): java.util.List<app.rive.runtime.any>;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class File extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public createDefaultBindableArtboard(): app.rive.runtime.any;
            public defaultViewModelForArtboard(it: app.rive.runtime.any): app.rive.runtime.any;
            public cppArtboardByIndex(param0: number, param1: number): number;
            public getViewModelCount(): number;
            public constructor(initialPointer: number);
            public artboard(it: string): app.rive.runtime.any;
            public getViewModelByName(it: string): app.rive.runtime.any;
            public release(): number;
            public getArtboardCount(): number;
            public getArtboardNames(): java.util.List<string>;
            public getRefCount(): number;
            public getViewModelByIndex(it: number): app.rive.runtime.any;
            public constructor(it: androidNative.Array<number>, this_: app.rive.runtime.any, bytes: app.rive.runtime.any);
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public artboard(ab: number): app.rive.runtime.any;
            public getEnums(): java.util.List<app.rive.runtime.any>;
            public createBindableArtboardByName(it: string): app.rive.runtime.any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getRendererType(): app.rive.runtime.any;
            public getLock(): java.util.concurrent.locks.ReentrantLock;
            public getFirstArtboard(): app.rive.runtime.any;
            public cppViewModelByName(param0: number, param1: string): number;
          }
          export namespace File {
            export class Enum {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): java.util.List<string>;
              public copy(name: string, values: java.util.List<string>): app.rive.runtime.any;
              public hashCode(): number;
              public getName(): string;
              public equals(other: any): boolean;
              public constructor(name: string, values: java.util.List<string>);
              public getValues(): java.util.List<string>;
              public toString(): string;
              public component1(): string;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export abstract class FileAsset extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getCdnUrl(): string;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public getUniqueFilename(): string;
            public acquire(): number;
            public decode(bytes: androidNative.Array<number>): boolean;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getName(): string;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export abstract class FileAssetLoader extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
            public constructor(): number;
            public cppRef(param0: number): void;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public setRendererType(rendererType: app.rive.runtime.any): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public loadContents(param0: app.rive.runtime.any, param1: androidNative.Array<number>): boolean;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Fit {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static FILL: app.rive.runtime.any;
            public static CONTAIN: app.rive.runtime.any;
            public static COVER: app.rive.runtime.any;
            public static FIT_WIDTH: app.rive.runtime.any;
            public static FIT_HEIGHT: app.rive.runtime.any;
            public static NONE: app.rive.runtime.any;
            public static SCALE_DOWN: app.rive.runtime.any;
            public static LAYOUT: app.rive.runtime.any;
            public static valueOf(value: string): app.rive.runtime.any;
            public static getEntries(): any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
          }
          export namespace Fit {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(this_: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class FontAsset extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getFont(): app.rive.runtime.any;
            public setFont(value: app.rive.runtime.any): void;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(address: number, rendererTypeIdx: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Helpers {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public static $stable: number;
            public convertToArtboardSpace(touchBounds: globalAndroid.graphics.RectF, touchLocation: globalAndroid.graphics.PointF, fit: app.rive.runtime.any, alignment: app.rive.runtime.any, artboardBounds: globalAndroid.graphics.RectF, scaleFactor: number): globalAndroid.graphics.PointF;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ImageAsset extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public setImage(value: app.rive.runtime.any): void;
            public getWidth(): number;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public getImage(): app.rive.runtime.any;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(address: number, rendererTypeIdx: number);
            public acquire(): number;
            public getHeight(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ImageDecoder {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public static $stable: number;
            public static decodeToBitmap(bitmap: androidNative.Array<number>): androidNative.Array<number>;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class LayerState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public isAnimationState(): boolean;
            public release(): number;
            public isBlendState(): boolean;
            public isEntryState(): boolean;
            public isAnyState(): boolean;
            public toString(): string;
            public getRefCount(): number;
            public isExitState(): boolean;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public isBlendStateDirect(): boolean;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public isBlendState1D(): boolean;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class LinearAnimationInstance extends app.rive.runtime.any implements app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public advanceAndGetResult(this_: number): app.rive.runtime.any;
            public constructor(initialPointer: number);
            public getTime(): number;
            public setDirection(this_: app.rive.runtime.any): void;
            public getName(): string;
            public getWorkEnd(): number;
            public getStartTime(): number;
            public getEndTime(): number;
            public getRefCount(): number;
            public setLoop(this_: app.rive.runtime.any): void;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public getEffectiveDurationInSeconds(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getEffectiveDuration(): number;
            public getFps(): number;
            public constructor(unsafeCppPointer: number, lock: java.util.concurrent.locks.ReentrantLock, mix: number);
            public getDuration(): number;
            public release(): number;
            public setMix(value: number): void;
            public time(this_: number): void;
            public getDirection(): app.rive.runtime.any;
            public getWorkStart(): number;
            /** @deprecated */
            public advance(this_: number): app.rive.runtime.any;
            public apply(result: number): boolean;
            public apply(): void;
            public getLoop(): app.rive.runtime.any;
            public getMix(): number;
          }
          export namespace LinearAnimationInstance {
            export class WhenMappings {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Loop {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static ONESHOT: app.rive.runtime.any;
            public static LOOP: app.rive.runtime.any;
            public static PINGPONG: app.rive.runtime.any;
            public static AUTO: app.rive.runtime.any;
            public static getEntries(): any;
            public static valueOf(value: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
          }
          export namespace Loop {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(this_: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export abstract class NativeObject extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public static NULL_POINTER = 0;
            public setCppPointer(value: number): void;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public getDependencies(): java.util.List<app.rive.runtime.any>;
            public release(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public setRefs(value: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public getHasCppObject(): boolean;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getCppPointer(): number;
            public cppDelete(pointer: number): void;
          }
          export namespace NativeObject {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class PlayableInstance {
            public static class: java.lang.Class<app.rive.runtime.any>;
            /**
             * Constructs a new instance of the app.rive.runtime.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getName(): string });
            public constructor();
            public getName(): string;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RefCount {
            public static class: java.lang.Class<app.rive.runtime.any>;
            /**
             * Constructs a new instance of the app.rive.runtime.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getRefs(): java.util.concurrent.atomic.AtomicInteger; setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void; getRefCount(): number; acquire(): number; release(): number });
            public constructor();
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
          export namespace RefCount {
            export class DefaultImpls {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static getRefCount($this: app.rive.runtime.any): number;
              public static acquire($this: app.rive.runtime.any): number;
              public static release($this: app.rive.runtime.any): number;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RendererType {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static Rive: app.rive.runtime.any;
            public static Canvas: app.rive.runtime.any;
            public static valueOf(value: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public getValue(): number;
            public static getEntries(): any;
          }
          export namespace RendererType {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(this_: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class Rive {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public static $stable: number;
            public initializeCppEnvironment(): void;
            public calculateRequiredBounds(this_: app.rive.runtime.any, fit: app.rive.runtime.any, alignment: globalAndroid.graphics.RectF, availableBounds: globalAndroid.graphics.RectF, artboardBounds: number): globalAndroid.graphics.RectF;
            /** @deprecated */
            public setFallbackFont(byteArray: androidNative.Array<number>): boolean;
            public getDefaultRendererType(): app.rive.runtime.any;
            /** @deprecated */
            public setFallbackFont(bytes: app.rive.runtime.any): boolean;
            public init(context: globalAndroid.content.Context, defaultRenderer: app.rive.runtime.any): void;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveAudio extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(address: number);
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
          export namespace RiveAudio {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public make(this_: androidNative.Array<number>, bytes: app.rive.runtime.any): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveEvent extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(initialPointer: number);
            public release(): number;
            public getType(): app.rive.runtime.any;
            public getName(): string;
            public toString(): string;
            public constructor(unsafeCppPointer: number, delay: number);
            public getDelay(): number;
            public getProperties(): java.util.HashMap<string, any>;
            public getData(): java.util.HashMap<string, any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveEventReport extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor(unsafeCppPointer: number, secondsDelay: number);
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public getEvent(): app.rive.runtime.any;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public getUnsafeCppPointer(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
          export namespace RiveEventReport {
            export class WhenMappings {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveFont extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(address: number);
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
          export namespace RiveFont {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public make(this_: androidNative.Array<number>, bytes: app.rive.runtime.any): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveGeneralEvent extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number, delay: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveOpenURLEvent extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(initialPointer: number);
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public getUrl(): string;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getTarget(): string;
            public toString(): string;
            public constructor(unsafeCppPointer: number, delay: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveRenderImage extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public constructor(address: number);
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          }
          export namespace RiveRenderImage {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              /** @deprecated */
              public make(bytes: androidNative.Array<number>, rendererType: app.rive.runtime.any): app.rive.runtime.any;
              public fromEncoded($this$fromEncoded_u24lambda_u240: androidNative.Array<number>, value: app.rive.runtime.any): app.rive.runtime.any;
              public fromARGBInts(value: androidNative.Array<number>, bitmap: number, address: number, address: app.rive.runtime.any, this_: boolean): app.rive.runtime.any;
              public fromBitmap(address: globalAndroid.graphics.Bitmap, address: app.rive.runtime.any): app.rive.runtime.any;
              public fromRGBABytes(value: androidNative.Array<number>, address: number, this_: number, pixelBytes: app.rive.runtime.any, width: boolean): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class RiveTextValueRun extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public setText(name: string): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getText(): string;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class SMIBoolean extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public getValue(): boolean;
            public setValue$any_release(value: boolean): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class SMIInput extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public isTrigger(): boolean;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public isBoolean(): boolean;
            public isNumber(): boolean;
            public getName(): string;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class SMINumber extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public setValue$any_release(value: number): void;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
            public getValue(): number;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class SMITrigger extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public fire$any_release(): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class StateMachineInstance extends app.rive.runtime.any implements app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public setViewModelInstance(it: app.rive.runtime.any): void;
            public constructor(initialPointer: number);
            public pointerUp(this_: number, pointerID: number, x: number): void;
            public getInputCount(): number;
            public input(i: string): app.rive.runtime.any;
            public advance(this_: number): boolean;
            public getName(): string;
            public input(input: number): app.rive.runtime.any;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public pointerDown(this_: number, pointerID: number, x: number): void;
            public pointerExit(this_: number, pointerID: number, x: number): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number, lock: java.util.concurrent.locks.ReentrantLock);
            public stateChanged(layerState: number): app.rive.runtime.any;
            public getEventsReported(): java.util.List<app.rive.runtime.any>;
            public receiveViewModelInstance(it: app.rive.runtime.any): app.rive.runtime.any;
            public release(): number;
            public pointerMove(this_: number, pointerID: number, x: number): void;
            public getInputNames(): java.util.List<string>;
            public eventAt(this_: number): app.rive.runtime.any;
            public getLayerCount(): number;
            public getStatesChanged(): java.util.List<app.rive.runtime.any>;
            public getInputs(): java.util.List<app.rive.runtime.any>;
            public getViewModelInstance(): app.rive.runtime.any;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModel extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public release(): number;
            public getPropertyCount(): number;
            public getInstanceCount(): number;
            public createInstanceFromName(it: string): app.rive.runtime.any;
            public getName(): string;
            public getProperties(): java.util.List<app.rive.runtime.any>;
            public createDefaultInstance(): app.rive.runtime.any;
            public createInstanceFromIndex(it: number): app.rive.runtime.any;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public createBlankInstance(): app.rive.runtime.any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public cppCreateBlankInstance(param0: number): number;
            public constructor(unsafeCppPointer: number);
          }
          export namespace ViewModel {
            export class Property {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): string;
              public component1(): app.rive.runtime.any;
              public hashCode(): number;
              public getName(): string;
              public equals(other: any): boolean;
              public getType(): app.rive.runtime.any;
              public copy(type: app.rive.runtime.any, name: string): app.rive.runtime.any;
              public constructor(type: app.rive.runtime.any, name: string);
              public toString(): string;
            }
            export class PropertyDataType {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static NONE: app.rive.runtime.any;
              public static STRING: app.rive.runtime.any;
              public static NUMBER: app.rive.runtime.any;
              public static BOOLEAN: app.rive.runtime.any;
              public static COLOR: app.rive.runtime.any;
              public static LIST: app.rive.runtime.any;
              public static ENUM: app.rive.runtime.any;
              public static TRIGGER: app.rive.runtime.any;
              public static VIEW_MODEL: app.rive.runtime.any;
              public static INTEGER: app.rive.runtime.any;
              public static SYMBOL_LIST_INDEX: app.rive.runtime.any;
              public static ASSET_IMAGE: app.rive.runtime.any;
              public static ARTBOARD: app.rive.runtime.any;
              public static fromInt(type: number): app.rive.runtime.any;
              public static getEntries(): any;
              public static values(): androidNative.Array<app.rive.runtime.any>;
              public getValue(): number;
              public static valueOf(value: string): app.rive.runtime.any;
            }
            export namespace PropertyDataType {
              export class Companion {
                public static class: java.lang.Class<app.rive.runtime.any>;
                public fromInt(type: number): app.rive.runtime.any;
              }
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelArtboardProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public set($i$f$filterIsInstanceTo: app.rive.runtime.any): void;
            public getRefCount(): number;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public nativeGetValue(): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            /** @deprecated */
            public set(artboard: app.rive.runtime.any): void;
            public nativeSetValue(value: any): void;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelBooleanProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public nativeSetValue(value: boolean): void;
            public getRefCount(): number;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
            public nativeGetValue(): java.lang.Boolean;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelColorProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public nativeGetValue(): java.lang.Integer;
            public getRefCount(): number;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public nativeSetValue(value: number): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelEnumProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public nativeGetValue(): string;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeSetValue(value: string): void;
            public nativeGetValue(): any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelImageProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public nativeGetValue(): void;
            public acquire(): number;
            public set(image: app.rive.runtime.any): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public nativeSetValue(value: any): void;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelInstance extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getProperties(): java.util.Map<any, any>;
            public getImageProperty(p0: string): app.rive.runtime.any;
            public pollChanges$any_release(): void;
            public setInstanceProperty(nestedParts: string, propertyName: app.rive.runtime.any): void;
            public getChildren(): java.util.Map<string, app.rive.runtime.any>;
            public getName(): string;
            public setProperties(value: java.util.Map<string, any>): void;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public setChildren(value: java.util.Map<string, app.rive.runtime.any>): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getBooleanProperty(p0: string): app.rive.runtime.any;
            public getArtboardProperty(p0: string): app.rive.runtime.any;
            public getNumberProperty(p0: string): app.rive.runtime.any;
            public release(): number;
            public getInstanceProperty(path: string): app.rive.runtime.any;
            public getEnumProperty(p0: string): app.rive.runtime.any;
            public getTriggerProperty(p0: string): app.rive.runtime.any;
            public cppDelete(pointer: number): void;
            public getColorProperty(p0: string): app.rive.runtime.any;
            public getListProperty(p0: string): app.rive.runtime.any;
            public getStringProperty(p0: string): app.rive.runtime.any;
            public transfer(): app.rive.runtime.any;
            public constructor(unsafeCppPointer: number);
          }
          export namespace ViewModelInstance {
            export class Transfer {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public end$any_release(): app.rive.runtime.any;
              public constructor(instance: app.rive.runtime.any);
              public dispose(): void;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelListProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public swap(index1: number, index2: number): void;
            public elementAt(newItem: number): app.rive.runtime.any;
            public nativeSetValue(param0: any): void;
            public release(): number;
            public get(index: number): app.rive.runtime.any;
            public nativeGetValue(): any;
            public nativeGetValue(): void;
            public add(value: app.rive.runtime.any): void;
            public remove(value: app.rive.runtime.any): void;
            public removeAt(it: number): void;
            public cppDelete(it: number): void;
            public getRefCount(): number;
            public getSize(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public add(value: number, answer$iv: app.rive.runtime.any): void;
            public nativeSetValue(value: any): void;
            public constructor(unsafeCppPointer: number);
          }
          export namespace ViewModelListProperty {
            export class CacheEntry {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public getInstance(): app.rive.runtime.any;
              public component1(): app.rive.runtime.any;
              public setCount(value: number): void;
              public hashCode(): number;
              public component2(): number;
              public equals(other: any): boolean;
              public copy(instance: app.rive.runtime.any, count: number): app.rive.runtime.any;
              public toString(): string;
              public getCount(): number;
              public constructor(instance: app.rive.runtime.any, count: number);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelNumberProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public nativeGetValue(): java.lang.Float;
            public getRefCount(): number;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public nativeSetValue(value: number): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export abstract class ViewModelProperty<T> extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public setValue(value: any): void;
            public cppName(param0: number): string;
            public pollChanges$any_release(): void;
            public getValue(): any;
            public nativeSetValue(param0: any): void;
            public release(): number;
            public nativeGetValue(): any;
            public getValueFlow(): kotlinx.coroutines.flow.StateFlow<any>;
            public getName(): string;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public cppHasChanged(param0: number): boolean;
            public isSubscribed$any_release(): boolean;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelStringProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public getRefCount(): number;
            public nativeGetValue(): string;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeSetValue(value: string): void;
            public nativeGetValue(): any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public constructor(unsafeCppPointer: number);
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export class ViewModelTriggerProperty extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public nativeSetValue(value: app.rive.runtime.any): void;
            public getRefCount(): number;
            public nativeGetValue(): app.rive.runtime.any;
            public nativeSetValue(param0: any): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public nativeGetValue(): any;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public trigger(): void;
            public constructor(unsafeCppPointer: number);
          }
          export namespace ViewModelTriggerProperty {
            export class TriggerUnit {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor();
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class AnimationException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class ArtboardException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class MalformedFileException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class RiveEventException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class RiveException {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class StateMachineException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class StateMachineInputException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class TextValueRunException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class UnsupportedRuntimeVersionException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace core {
          export namespace errors {
            export class ViewModelException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor(message: string);
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace fonts {
          export class FontFallbackStrategy {
            public static class: java.lang.Class<app.rive.runtime.any>;
            /**
             * Constructs a new instance of the app.rive.runtime.any interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { getFont(param0: app.rive.runtime.any): java.util.List<androidNative.Array<number>>; '<clinit>'(): void });
            public constructor();
            public getFont(param0: app.rive.runtime.any): java.util.List<androidNative.Array<number>>;
          }
          export namespace FontFallbackStrategy {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public cppResetFontCache(): void;
              public getStylePicker(): app.rive.runtime.any;
              public setStylePicker(it: app.rive.runtime.any): void;
              public pickFont(weight: number): java.util.List<androidNative.Array<number>>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace fonts {
          export class FontHelper {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
          }
          export namespace FontHelper {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              /** @deprecated */
              public getSystemFonts(): java.util.Map<string, app.rive.runtime.any>;
              public loadFontList$any_release(): java.util.List<app.rive.runtime.any>;
              public resetForTesting(): void;
              public findMatches$any_release(lang: java.util.List<app.rive.runtime.any>, matchingFamiliesSequence: app.rive.runtime.any): java.util.List<app.rive.runtime.any>;
              public getFallbackFonts(this_: app.rive.runtime.any): java.util.List<app.rive.runtime.any>;
              public getSystemFontList(): java.util.List<app.rive.runtime.any>;
              public getFallbackFont(opts: app.rive.runtime.any): app.rive.runtime.any;
              public findMatches$any_release(lang: java.util.Map<string, app.rive.runtime.any>, matchingFamiliesSequence: app.rive.runtime.any): java.util.List<app.rive.runtime.any>;
              public getFontFile(it: app.rive.runtime.any): java.io.File;
              public getFallbackFontBytes(it: app.rive.runtime.any): androidNative.Array<number>;
              public getFontBytes(font: app.rive.runtime.any): androidNative.Array<number>;
              public loadFonts$any_release(): java.util.Map<string, app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace fonts {
          export class Fonts {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
          }
          export namespace Fonts {
            export class Alias {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): string;
              public constructor(name: string, original: string, weight: app.rive.runtime.any);
              public component3(): app.rive.runtime.any;
              public hashCode(): number;
              public getName(): string;
              public equals(other: any): boolean;
              public toString(): string;
              public getOriginal(): string;
              public getWeight(): app.rive.runtime.any;
              public copy(name: string, original: string, weight: app.rive.runtime.any): app.rive.runtime.any;
              public component1(): string;
            }
            export class Axis {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): string;
              public getStyleValue(): string;
              public hashCode(): number;
              public equals(other: any): boolean;
              public constructor(tag: string, styleValue: string);
              public toString(): string;
              public getTag(): string;
              public component1(): string;
              public copy(tag: string, styleValue: string): app.rive.runtime.any;
            }
            export class Family {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): string;
              public hashCode(): number;
              public component4(): java.util.Map<app.rive.runtime.any, java.util.List<app.rive.runtime.any>>;
              public getVariant(): string;
              public toString(): string;
              public copy(name: string, variant: string, lang: string, fonts: java.util.Map<app.rive.runtime.any, any>): app.rive.runtime.any;
              public component3(): string;
              public component1(): string;
              public constructor(name: string, variant: string, lang: string, fonts: java.util.Map<app.rive.runtime.any, any>);
              public getName(): string;
              public equals(other: any): boolean;
              public getFonts(): java.util.Map<app.rive.runtime.any, java.util.List<app.rive.runtime.any>>;
              public getLang(): string;
            }
            export class FileFont {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public component2(): string;
              public hashCode(): number;
              public getName(): string;
              public equals(other: any): boolean;
              public constructor(name: string, variant: string, lang: string);
              public getVariant(): string;
              public toString(): string;
              public getLang(): string;
              public component3(): string;
              public component1(): string;
              public copy(name: string, variant: string, lang: string): app.rive.runtime.any;
            }
            export class Font {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public static STYLE_NORMAL = 'normal';
              public static STYLE_ITALIC = 'italic';
              public component2(): string;
              public component7(): string;
              public copy(weight: app.rive.runtime.any, style: string, name: string, axis: java.util.List<app.rive.runtime.any>, ttcIndex: number, postScriptName: string, fallbackFor: string): app.rive.runtime.any;
              public hashCode(): number;
              public getAxis(): java.util.List<app.rive.runtime.any>;
              public getFallbackFor(): string;
              public component5(): number;
              public constructor(weight: app.rive.runtime.any, style: string, name: string, axis: java.util.List<app.rive.runtime.any>, ttcIndex: number, postScriptName: string, fallbackFor: string);
              public toString(): string;
              public component3(): string;
              public getPostScriptName(): string;
              public getStyle(): string;
              public component4(): java.util.List<app.rive.runtime.any>;
              public getTtcIndex(): number;
              public getName(): string;
              public equals(other: any): boolean;
              public getWeight(): app.rive.runtime.any;
              public component6(): string;
              public component1(): app.rive.runtime.any;
            }
            export namespace Font {
              export class Companion {
                public static class: java.lang.Class<app.rive.runtime.any>;
              }
            }
            export class FontOpts {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor();
              public component2(): string;
              public component3(): app.rive.runtime.any;
              public hashCode(): number;
              public toString(): string;
              public constructor(familyName: string, lang: string, weight: app.rive.runtime.any, style: string);
              public component1(): string;
              public getStyle(): string;
              public copy(familyName: string, lang: string, weight: app.rive.runtime.any, style: string): app.rive.runtime.any;
              public equals(other: any): boolean;
              public component4(): string;
              public getLang(): string;
              public getWeight(): app.rive.runtime.any;
              public getFamilyName(): string;
            }
            export namespace FontOpts {
              export class Companion {
                public static class: java.lang.Class<app.rive.runtime.any>;
                public getDEFAULT(): app.rive.runtime.any;
              }
            }
            export class Weight extends java.lang.Comparable<app.rive.runtime.any> {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static $stable: number;
              public constructor();
              public component1(): number;
              public constructor(weight: number);
              public copy(weight: number): app.rive.runtime.any;
              public hashCode(): number;
              public equals(other: any): boolean;
              public toString(): string;
              public getWeight(): number;
              public compareTo(other: app.rive.runtime.any): number;
            }
            export namespace Weight {
              export class Companion {
                public static class: java.lang.Class<app.rive.runtime.any>;
                public getBOLD(): app.rive.runtime.any;
                public fromString(stringValue: string): app.rive.runtime.any;
                public fromInt(intValue: number): app.rive.runtime.any;
                public getNORMAL(): app.rive.runtime.any;
              }
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace fonts {
          export class NativeFontHelper {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public static $stable: number;
            public cppRegisterFallbackFont(param0: androidNative.Array<number>): boolean;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace fonts {
          export class SystemFontsParser {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public static FONTS_XML_PATH = '/system/etc/fonts.xml';
            public static SYSTEM_FONTS_XML_PATH = '/system/etc/system_fonts.xml';
            public static FALLBACK_FONTS_XML_PATH = '/system/etc/system_fallback.xml';
            public constructor();
          }
          export namespace SystemFontsParser {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public getSYSTEM_FONTS_PATHS$any_release(): java.util.List<string>;
              public parseFontsXMLMap$any_release($this$parseFontsXMLMap_u24lambda_u240: java.io.InputStream): java.util.Map<string, app.rive.runtime.any>;
              public parseFontsXML$any_release($this$parseFontsXML_u24lambda_u241: java.io.InputStream): java.util.List<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace renderers {
          export class PointerEvents {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static POINTER_DOWN: app.rive.runtime.any;
            public static POINTER_UP: app.rive.runtime.any;
            public static POINTER_MOVE: app.rive.runtime.any;
            public static POINTER_EXIT: app.rive.runtime.any;
            public static valueOf(value: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static getEntries(): any;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace renderers {
          export abstract class Renderer extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public delete(): void;
            public constructor(initialPointer: number);
            public isPlaying(): boolean;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public isAttached(): boolean;
            public scale(sx: number, sy: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public constructor(type: app.rive.runtime.any, trace: boolean);
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public draw(): void;
            public scheduleFrame(): void;
            public restore(): void;
            public doFrame(this_: number): void;
            public constructor();
            public getFrameLock(): any;
            /** @deprecated */
            public setSurface(surface: globalAndroid.view.Surface): void;
            public release(): number;
            public translate(dx: number, dy: number): void;
            public disposeDependencies(): void;
            public getType(): app.rive.runtime.any;
            public setSurface$any_release(this_: app.rive.runtime.any): void;
            public getHeight(): number;
            public align(fit: app.rive.runtime.any, alignment: app.rive.runtime.any, targetBounds: globalAndroid.graphics.RectF, sourceBounds: globalAndroid.graphics.RectF, scaleFactor: number): void;
            public stop(): void;
            public advance(param0: number): void;
            public getTrace(): boolean;
            public getWidth(): number;
            public make(): void;
            public start(): void;
            public getAverageFps(): number;
            public setRendererType(newType: number): void;
            public stopThread$any_release(): void;
            public save(): void;
            public transform(x: number, sy: number, sx: number, y: number, tx: number, ty: number): void;
            public setAttached(value: boolean): void;
            public setType(value: app.rive.runtime.any): void;
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace renderers {
          export class RendererMetrics {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public static SAMPLES = 30;
            public onFrameMetricsAvailable(swapBuffersMs: globalAndroid.view.Window, issueGPUCommandsMs: globalAndroid.view.FrameMetrics, frameValues: number): void;
            public constructor(refreshRateHz: globalAndroid.app.Activity);
          }
          export namespace RendererMetrics {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare namespace app {
  export namespace rive {
    export namespace runtime {
      export namespace kotlin {
        export namespace renderers {
          export class RiveArtboardRenderer extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static $stable: number;
            public constructor();
            public resizeArtboard(): void;
            public constructor(initialPointer: number);
            public constructor(it: boolean, this_: app.rive.runtime.any, trace: app.rive.runtime.any);
            public release(): number;
            public disposeDependencies(): void;
            public advance(this_: number): void;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public constructor(type: app.rive.runtime.any, trace: boolean);
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public draw(): void;
            public reset(): void;
          }
        }
      }
    }
  }
}

//Generics information:
//app.rive.Asset:1
//app.rive.AssetOps:2
//app.rive.Result:1
//app.rive.Result.Success:1
//app.rive.core.CommandQueue.PropertyUpdate:1
//app.rive.core.DeferredResult:1
//app.rive.core.DeferredResult.Success:1
//app.rive.core.SuspendLazy:1
//app.rive.runtime.kotlin.Observable:1
//app.rive.runtime.kotlin.core.ViewModelProperty:1
