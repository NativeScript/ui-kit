declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
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

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class PointerEvents {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static POINTER_DOWN: app.rive.runtime.any;
          public static POINTER_UP: app.rive.runtime.any;
          public static POINTER_MOVE: app.rive.runtime.any;
          public static valueOf(param0: string): app.rive.runtime.any;
          public static values(): androidNative.Array<app.rive.runtime.any>;
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export abstract class ResourceType {
          public static class: java.lang.Class<app.rive.runtime.any>;
        }
        export module ResourceType {
          export class Companion {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public makeMaybeResource(param0: any): app.rive.runtime.any;
          }
          export class ResourceBytes extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public constructor(param0: androidNative.Array<number>);
            public getBytes(): androidNative.Array<number>;
          }
          export class ResourceId extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public constructor(param0: number);
            public getId(): number;
          }
          export class ResourceRiveFile extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getFile(): app.rive.runtime.any;
            public constructor(param0: app.rive.runtime.any);
          }
          export class ResourceUrl extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getUrl(): string;
            public constructor(param0: string);
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class RiveAnimationView extends app.rive.runtime.any implements app.rive.runtime.any {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static TAG: string;
          public static alignmentIndexDefault: number;
          public static fitIndexDefault: number;
          public static loopIndexDefault: number;
          public setFit(param0: app.rive.runtime.any): void;
          public getStateMachines(): java.util.List<app.rive.runtime.any>;
          public getFit(): app.rive.runtime.any;
          public setRiveResource(param0: number, param1: string, param2: string, param3: string, param4: boolean, param5: app.rive.runtime.any, param6: app.rive.runtime.any, param7: app.rive.runtime.any): void;
          public setArtboardName(param0: string): void;
          public play(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: boolean): void;
          public setNumberState(param0: string, param1: string, param2: number): void;
          public onAttachedToWindow(): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public onSurfaceTextureAvailable(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
          public pause(): void;
          public unregisterListener(param0: app.rive.runtime.any): void;
          public getController(): app.rive.runtime.any;
          public createRenderer(): app.rive.runtime.any;
          public getAutoplay(): boolean;
          public stop(param0: java.util.List<string>, param1: boolean): void;
          public setAlignment(param0: app.rive.runtime.any): void;
          public restoreControllerState(param0: app.rive.runtime.any): void;
          public registerListener(param0: app.rive.runtime.any): void;
          public getArtboardRenderer(): app.rive.runtime.any;
          public stop(): void;
          public setAutoplay(param0: boolean): void;
          public onTouchEvent(param0: globalAndroid.view.MotionEvent): boolean;
          public pause(param0: java.util.List<string>, param1: boolean): void;
          public getAnimations(): java.util.List<app.rive.runtime.any>;
          public onSurfaceTextureSizeChanged(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
          public getFile(): app.rive.runtime.any;
          public getRendererAttributes(): app.rive.runtime.any;
          public setBooleanState(param0: string, param1: string, param2: boolean): void;
          public setRiveBytes(param0: androidNative.Array<number>, param1: string, param2: string, param3: string, param4: boolean, param5: app.rive.runtime.any, param6: app.rive.runtime.any, param7: app.rive.runtime.any): void;
          public saveControllerState(): app.rive.runtime.any;
          public unregisterListener(param0: any): void;
          public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
          public stop(param0: string, param1: boolean): void;
          public play(param0: string, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
          public isPlaying(): boolean;
          public play(param0: java.util.List<string>, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
          public createObserver(): androidx.lifecycle.LifecycleObserver;
          public pause(param0: string, param1: boolean): void;
          public setTextRunValue(param0: string, param1: string): void;
          public setRiveFile(param0: app.rive.runtime.any, param1: string, param2: string, param3: string, param4: boolean, param5: app.rive.runtime.any, param6: app.rive.runtime.any, param7: app.rive.runtime.any): void;
          public onDetachedFromWindow(): void;
          public onMeasure(param0: number, param1: number): void;
          public reset(): void;
          public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
          public getArtboardName(): string;
          public fireState(param0: string, param1: string): void;
          public getTextRunValue(param0: string): string;
          public setController(param0: app.rive.runtime.any): void;
          public getAlignment(): app.rive.runtime.any;
          public getDefaultAutoplay(): boolean;
          public registerListener(param0: any): void;
        }
        export module RiveAnimationView {
          export class Companion {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRendererIndexDefault(): number;
          }
          export class RendererAttributes {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public setAutoplay(param0: boolean): void;
            public setResource(param0: app.rive.runtime.any): void;
            public getArtboardName(): string;
            public setStateMachineName(param0: string): void;
            public getResource(): app.rive.runtime.any;
            public setFit(param0: app.rive.runtime.any): void;
            public constructor(param0: number, param1: number, param2: number, param3: number, param4: boolean, param5: boolean, param6: string, param7: string, param8: string, param9: app.rive.runtime.any);
            public getAnimationName(): string;
            public getAutoplay(): boolean;
            public setAnimationName(param0: string): void;
            public getAlignment(): app.rive.runtime.any;
            public getStateMachineName(): string;
            public setAlignment(param0: app.rive.runtime.any): void;
            public setArtboardName(param0: string): void;
            public getLoop(): app.rive.runtime.any;
            public getFit(): app.rive.runtime.any;
            public setLoop(param0: app.rive.runtime.any): void;
            public getRiveTraceAnimations(): boolean;
            public getRendererType(): app.rive.runtime.any;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class RiveArtboardRenderer extends app.rive.runtime.any {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public setFit(param0: app.rive.runtime.any): void;
          public getStateMachines(): java.util.List<app.rive.runtime.any>;
          /** @deprecated */
          public stopAnimations(param0: java.util.List<string>, param1: boolean): void;
          public setLoop(param0: app.rive.runtime.any): void;
          /** @deprecated */
          public pause(param0: string, param1: boolean): void;
          public getFit(): app.rive.runtime.any;
          /** @deprecated */
          public play(param0: string, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
          public setArtboardName(param0: string): void;
          /** @deprecated */
          public play(param0: java.util.List<string>, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
          public getLoop(): app.rive.runtime.any;
          public constructor();
          public getAutoplay(): boolean;
          /** @deprecated */
          public pause(): void;
          public acquire(): number;
          public setAlignment(param0: app.rive.runtime.any): void;
          public acquireFile$any_release(param0: app.rive.runtime.any): void;
          public getAnimationName(): string;
          public artboardBounds(): globalAndroid.graphics.RectF;
          public setAnimationName(param0: string): void;
          /** @deprecated */
          public stopAnimations(param0: string, param1: boolean): void;
          public setAutoplay(param0: boolean): void;
          public setRiveFile(param0: app.rive.runtime.any): void;
          public getStateMachineName(): string;
          public getAnimations(): java.util.List<app.rive.runtime.any>;
          public getFile(): app.rive.runtime.any;
          /** @deprecated */
          public stopAnimations(): void;
          /** @deprecated */
          public setNumberState(param0: string, param1: string, param2: number): void;
          public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
          /** @deprecated */
          public pause(param0: java.util.List<string>, param1: boolean): void;
          public setTargetBounds(param0: globalAndroid.graphics.RectF): void;
          public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
          public constructor(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: string, param5: string, param6: string, param7: boolean, param8: app.rive.runtime.any, param9: app.rive.runtime.any);
          public getRefs(): java.util.concurrent.atomic.AtomicInteger;
          public setActiveArtboard(param0: app.rive.runtime.any): void;
          public draw(): void;
          public getTargetBounds(): globalAndroid.graphics.RectF;
          /** @deprecated */
          public setBooleanState(param0: string, param1: string, param2: boolean): void;
          public release(): number;
          public constructor(param0: number);
          public reset(): void;
          public getRefCount(): number;
          public advance(param0: number): void;
          /** @deprecated */
          public play(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: boolean): void;
          public constructor(param0: app.rive.runtime.any, param1: boolean);
          public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
          public getArtboardName(): string;
          public setArtboardByName(param0: string): void;
          public setStateMachineName(param0: string): void;
          /** @deprecated */
          public fireState(param0: string, param1: string): void;
          public pointerEvent(param0: app.rive.runtime.any, param1: number, param2: number): void;
          public getAlignment(): app.rive.runtime.any;
          public getActiveArtboard(): app.rive.runtime.any;
        }
        export module RiveArtboardRenderer {
          export class Listener {
            public static class: java.lang.Class<app.rive.runtime.any>;
            /**
             * Constructs a new instance of the app.rive.runtime.any$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { notifyPlay(param0: app.rive.runtime.any): void; notifyPause(param0: app.rive.runtime.any): void; notifyStop(param0: app.rive.runtime.any): void; notifyLoop(param0: app.rive.runtime.any): void; notifyStateChanged(param0: string, param1: string): void });
            public constructor();
            public notifyLoop(param0: app.rive.runtime.any): void;
            public notifyStop(param0: app.rive.runtime.any): void;
            public notifyPause(param0: app.rive.runtime.any): void;
            public notifyPlay(param0: app.rive.runtime.any): void;
            public notifyStateChanged(param0: string, param1: string): void;
          }
          export class WhenMappings {
            public static class: java.lang.Class<app.rive.runtime.any>;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class RiveFileRequest extends com.android.volley.Request<app.rive.runtime.any> {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public parseNetworkResponse(param0: com.android.volley.NetworkResponse): com.android.volley.Response<app.rive.runtime.any>;
          public deliverResponse(param0: app.rive.runtime.any): void;
          public constructor(param0: string, param1: app.rive.runtime.any, param2: com.android.volley.Response.Listener<app.rive.runtime.any>, param3: com.android.volley.Response.ErrorListener);
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class RiveInitializer extends androidx.startup.Initializer<any> {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public create(param0: globalAndroid.content.Context): void;
          public constructor();
          public dependencies(): java.util.List<java.lang.Class<any>>;
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export abstract class RiveTextureView {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public static TAG: string;
          public onDetachedFromWindow(): void;
          public getLifecycleObserver(): androidx.lifecycle.LifecycleObserver;
          public setRenderer(param0: app.rive.runtime.any): void;
          public onSurfaceTextureUpdated(param0: globalAndroid.graphics.SurfaceTexture): void;
          public onSurfaceTextureDestroyed(param0: globalAndroid.graphics.SurfaceTexture): boolean;
          public onAttachedToWindow(): void;
          public onVisibilityChanged(param0: globalAndroid.view.View, param1: number): void;
          public getActivity(): globalAndroid.app.Activity;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public onSurfaceTextureAvailable(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
          public getRenderer(): app.rive.runtime.any;
          public createObserver(): androidx.lifecycle.LifecycleObserver;
          public createRenderer(): app.rive.runtime.any;
          public onSurfaceTextureSizeChanged(param0: globalAndroid.graphics.SurfaceTexture, param1: number, param2: number): void;
        }
        export module RiveTextureView {
          export class Companion {
            public static class: java.lang.Class<app.rive.runtime.any>;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export class RiveViewLifecycleObserver {
          public static class: java.lang.Class<app.rive.runtime.any>;
          public constructor(param0: app.rive.runtime.any);
          public onPause(param0: androidx.lifecycle.LifecycleOwner): void;
          public onDestroy(param0: androidx.lifecycle.LifecycleOwner): void;
          public onCreate(param0: androidx.lifecycle.LifecycleOwner): void;
          public onResume(param0: androidx.lifecycle.LifecycleOwner): void;
          public onStart(param0: androidx.lifecycle.LifecycleOwner): void;
          public onStop(param0: androidx.lifecycle.LifecycleOwner): void;
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module controllers {
          export class ControllerState {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getFile(): app.rive.runtime.any;
            public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
            public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
            public getActiveArtboard(): app.rive.runtime.any;
            public constructor(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: java.util.List<app.rive.runtime.any>, param3: java.util.HashSet<app.rive.runtime.any>, param4: java.util.List<app.rive.runtime.any>, param5: java.util.HashSet<app.rive.runtime.any>, param6: boolean);
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

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module controllers {
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

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module controllers {
          export class RiveFileController extends java.lang.Object {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static TAG: string;
            public getPlayingStateMachines(): java.util.HashSet<app.rive.runtime.any>;
            public getPausedAnimations(): java.util.Set<app.rive.runtime.any>;
            public registerListener(param0: app.rive.runtime.any): void;
            public pause(): void;
            public pause(param0: java.util.List<string>, param1: boolean): void;
            public setFit(param0: app.rive.runtime.any): void;
            public stopAnimations(): void;
            public getAnimations(): java.util.List<app.rive.runtime.any>;
            public getAutoplay(): boolean;
            public play$any_release(param0: app.rive.runtime.any, param1: boolean): void;
            public reset$any_release(): void;
            public setAlignment(param0: app.rive.runtime.any): void;
            public getFit(): app.rive.runtime.any;
            public saveControllerState(): app.rive.runtime.any;
            public play(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: boolean): void;
            public stopAnimations(param0: string, param1: boolean): void;
            public registerListener(param0: any): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public play(param0: java.util.List<string>, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
            public constructor();
            public setBooleanState(param0: string, param1: string, param2: boolean): void;
            public setTextRunValue(param0: string, param1: string): void;
            public setNumberState(param0: string, param1: string, param2: number): void;
            public release(): number;
            public unregisterListener(param0: any): void;
            public restoreControllerState(param0: app.rive.runtime.any): void;
            public getListeners$any_release(): java.util.HashSet<app.rive.runtime.any>;
            public advance(param0: number): void;
            public setListeners$any_release(param0: java.util.HashSet<app.rive.runtime.any>): void;
            public unregisterListener(param0: app.rive.runtime.any): void;
            public getAlignment(): app.rive.runtime.any;
            public getPausedStateMachines(): java.util.Set<app.rive.runtime.any>;
            public getHasPlayingAnimations(): boolean;
            public fireState(param0: string, param1: string): void;
            public setAutoplay(param0: boolean): void;
            public stopAnimations(param0: java.util.List<string>, param1: boolean): void;
            public getOnStart(): any;
            public getStateMachines(): java.util.List<app.rive.runtime.any>;
            public setFile(param0: app.rive.runtime.any): void;
            public setActiveArtboard(param0: app.rive.runtime.any): void;
            public getFile(): app.rive.runtime.any;
            public play(param0: string, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: boolean): void;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public selectArtboard(param0: string): void;
            public constructor(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: app.rive.runtime.any, param3: boolean, param4: app.rive.runtime.any, param5: app.rive.runtime.any, param6: any);
            public acquire(): number;
            public setLoop(param0: app.rive.runtime.any): void;
            public setupScene$any_release(param0: app.rive.runtime.any): void;
            public isActive(): boolean;
            public setOnStart(param0: any): void;
            public setRiveFile(param0: app.rive.runtime.any, param1: string): void;
            public play$any_release(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: app.rive.runtime.any): void;
            public setActive(param0: boolean): void;
            public pause(param0: string, param1: boolean): void;
            public autoplay(): void;
            public getPlayingAnimations(): java.util.HashSet<app.rive.runtime.any>;
            public getLoop(): app.rive.runtime.any;
            public getActiveArtboard(): app.rive.runtime.any;
            public getTextRunValue(param0: string): string;
          }
          export module RiveFileController {
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
            export module Listener {
              export class DefaultImpls {
                public static class: java.lang.Class<app.rive.runtime.any>;
                public static notifyAdvance(param0: app.rive.runtime.any, param1: number): void;
              }
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
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
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public static valueOf(param0: string): app.rive.runtime.any;
          }
          export module Alignment {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(param0: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class AnimationState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getName(): string;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class AnyState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Artboard extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public animation(param0: number): app.rive.runtime.any;
            public animation(param0: string): app.rive.runtime.any;
            public drawSkia(param0: number): void;
            public release(): number;
            public getAnimationNames(): java.util.List<string>;
            public getStateMachineNames(): java.util.List<string>;
            public stateMachine(param0: string): app.rive.runtime.any;
            public advance(param0: number): boolean;
            public stateMachine(param0: number): app.rive.runtime.any;
            public getName(): string;
            public getFirstStateMachine(): app.rive.runtime.any;
            public getRefCount(): number;
            public textRun(param0: string): app.rive.runtime.any;
            public cppDelete(param0: number): void;
            public getFirstAnimation(): app.rive.runtime.any;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public constructor(param0: number);
            public getAnimationCount(): number;
            public getStateMachineCount(): number;
            public drawSkia(param0: number, param1: app.rive.runtime.any, param2: app.rive.runtime.any): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getBounds(): globalAndroid.graphics.RectF;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class BlendState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Decoder {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public constructor();
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Direction {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static BACKWARDS: app.rive.runtime.any;
            public static FORWARDS: app.rive.runtime.any;
            public static AUTO: app.rive.runtime.any;
            public static valueOf(param0: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public getValue(): number;
          }
          export module Direction {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromInt(param0: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class EntryState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class ExitState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class File extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public artboard(param0: number): app.rive.runtime.any;
            public release(): number;
            public constructor(param0: androidNative.Array<number>, param1: app.rive.runtime.any);
            public getArtboardCount(): number;
            public getArtboardNames(): java.util.List<string>;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getRendererType(): app.rive.runtime.any;
            public getFirstArtboard(): app.rive.runtime.any;
            public artboard(param0: string): app.rive.runtime.any;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Fit {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static FILL: app.rive.runtime.any;
            public static CONTAIN: app.rive.runtime.any;
            public static COVER: app.rive.runtime.any;
            public static FIT_WIDTH: app.rive.runtime.any;
            public static FIT_HEIGHT: app.rive.runtime.any;
            public static NONE: app.rive.runtime.any;
            public static SCALE_DOWN: app.rive.runtime.any;
            public static valueOf(param0: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
          }
          export module Fit {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(param0: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Helpers {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public convertToArtboardSpace(param0: globalAndroid.graphics.RectF, param1: globalAndroid.graphics.PointF, param2: app.rive.runtime.any, param3: app.rive.runtime.any, param4: globalAndroid.graphics.RectF): globalAndroid.graphics.PointF;
            public printStackTrace(): void;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class LayerState extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public isAnimationState(): boolean;
            public release(): number;
            public isBlendState(): boolean;
            public isEntryState(): boolean;
            public isAnyState(): boolean;
            public toString(): string;
            public getRefCount(): number;
            public isExitState(): boolean;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public constructor(param0: number);
            public isBlendStateDirect(): boolean;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public isBlendState1D(): boolean;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class LinearAnimationInstance extends app.rive.runtime.any implements app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getTime(): number;
            public getName(): string;
            public getWorkEnd(): number;
            public getStartTime(): number;
            public getEndTime(): number;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public getEffectiveDurationInSeconds(): number;
            public acquire(): number;
            public advance(param0: number): app.rive.runtime.any;
            public setLoop(param0: app.rive.runtime.any): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public setDirection(param0: app.rive.runtime.any): void;
            public getEffectiveDuration(): number;
            public constructor(param0: number, param1: number);
            public getFps(): number;
            public setMix(param0: number): void;
            public time(param0: number): void;
            public getDuration(): number;
            public apply(param0: number): boolean;
            public release(): number;
            public getDirection(): app.rive.runtime.any;
            public getWorkStart(): number;
            public apply(): void;
            public getLoop(): app.rive.runtime.any;
            public constructor(param0: number);
            public getMix(): number;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Loop {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static ONESHOT: app.rive.runtime.any;
            public static LOOP: app.rive.runtime.any;
            public static PINGPONG: app.rive.runtime.any;
            public static AUTO: app.rive.runtime.any;
            public static valueOf(param0: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
          }
          export module Loop {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(param0: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export abstract class NativeObject extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static NULL_POINTER: number;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public getDependencies(): java.util.List<app.rive.runtime.any>;
            public cppDelete(param0: number): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getHasCppObject(): boolean;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getCppPointer(): number;
            public setCppPointer(param0: number): void;
          }
          export module NativeObject {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
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

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
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
          export module RefCount {
            export class DefaultImpls {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public static acquire(param0: app.rive.runtime.any): number;
              public static release(param0: app.rive.runtime.any): number;
              public static getRefCount(param0: app.rive.runtime.any): number;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class RendererType {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static Skia: app.rive.runtime.any;
            public static Rive: app.rive.runtime.any;
            public static valueOf(param0: string): app.rive.runtime.any;
            public static values(): androidNative.Array<app.rive.runtime.any>;
            public getValue(): number;
          }
          export module RendererType {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public fromIndex(param0: number): app.rive.runtime.any;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class Rive {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static INSTANCE: app.rive.runtime.any;
            public initializeCppEnvironment(): void;
            public init(param0: globalAndroid.content.Context, param1: app.rive.runtime.any): void;
            public getDefaultRendererType(): app.rive.runtime.any;
            public calculateRequiredBounds(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: globalAndroid.graphics.RectF, param3: globalAndroid.graphics.RectF): globalAndroid.graphics.RectF;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class RiveTextValueRun extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setText(param0: string): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public getText(): string;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class SMIBoolean extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public setValue(param0: boolean): void;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public getValue(): boolean;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class SMIInput extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public isTrigger(): boolean;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public isBoolean(): boolean;
            public isNumber(): boolean;
            public getName(): string;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class SMINumber extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public setValue(param0: number): void;
            public toString(): string;
            public getValue(): number;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class SMITrigger extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public getRefCount(): number;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public release(): number;
            public constructor(param0: number);
            public acquire(): number;
            public fire(): void;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public toString(): string;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export class StateMachineInstance extends app.rive.runtime.any implements app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public pointerUp(param0: number, param1: number): void;
            public getInputCount(): number;
            public release(): number;
            public input(param0: string): app.rive.runtime.any;
            public pointerMove(param0: number, param1: number): void;
            public getInputNames(): java.util.List<string>;
            public advance(param0: number): boolean;
            public getName(): string;
            public getLayerCount(): number;
            public getStatesChanged(): java.util.List<app.rive.runtime.any>;
            public getRefCount(): number;
            public stateChanged(param0: number): app.rive.runtime.any;
            public cppDelete(param0: number): void;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public constructor(param0: number);
            public getInputs(): java.util.List<app.rive.runtime.any>;
            public pointerDown(param0: number, param1: number): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public input(param0: number): app.rive.runtime.any;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class AnimationException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class ArtboardException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class MalformedFileException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class RiveException {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class StateMachineException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class StateMachineInputException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class TextValueRunException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module core {
          export module errors {
            export class UnsupportedRuntimeVersionException extends app.rive.runtime.any {
              public static class: java.lang.Class<app.rive.runtime.any>;
              public constructor(param0: string);
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module renderers {
          export abstract class Renderer extends app.rive.runtime.any {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public delete(): void;
            public isPlaying(): boolean;
            public setSurface(param0: globalAndroid.view.Surface): void;
            public doFrame(param0: number): void;
            public getRefCount(): number;
            public cppDelete(param0: number): void;
            public isAttached(): boolean;
            public setRefs(param0: java.util.concurrent.atomic.AtomicInteger): void;
            public acquire(): number;
            public getRefs(): java.util.concurrent.atomic.AtomicInteger;
            public draw(): void;
            public align(param0: app.rive.runtime.any, param1: app.rive.runtime.any, param2: globalAndroid.graphics.RectF, param3: globalAndroid.graphics.RectF): void;
            public constructor(param0: app.rive.runtime.any, param1: boolean);
            public scheduleFrame(): void;
            public restore(): void;
            public constructor();
            public release(): number;
            public disposeDependencies(): void;
            public getHeight(): number;
            public stop(): void;
            public advance(param0: number): void;
            public getTrace(): boolean;
            public getWidth(): number;
            public make(): void;
            public start(): void;
            public getAverageFps(): number;
            public constructor(param0: number);
            public stopThread$any_release(): void;
            public translate(param0: number, param1: number): void;
            public scale(param0: number, param1: number): void;
            public save(): void;
            public setAttached(param0: boolean): void;
            public transform(param0: number, param1: number, param2: number, param3: number, param4: number, param5: number): void;
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module renderers {
          export class RendererMetrics {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public static SAMPLES: number;
            public constructor(param0: globalAndroid.app.Activity);
            public onFrameMetricsAvailable(param0: globalAndroid.view.Window, param1: globalAndroid.view.FrameMetrics, param2: number): void;
          }
          export module RendererMetrics {
            export class Companion {
              public static class: java.lang.Class<app.rive.runtime.any>;
            }
          }
        }
      }
    }
  }
}

declare module app {
  export module rive {
    export module runtime {
      export module kotlin {
        export module renderers {
          export abstract class RendererSkia {
            public static class: java.lang.Class<app.rive.runtime.any>;
            public constructor();
          }
        }
      }
    }
  }
}

//Generics information:
//app.rive.runtime.kotlin.Observable:1
