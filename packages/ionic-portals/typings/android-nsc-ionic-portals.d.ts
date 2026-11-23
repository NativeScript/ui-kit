declare module org {
  export module nativescript {
    export module plugins {
      export module ionicportals {
        export class NSCIonicPortals {
          public static class: java.lang.Class<org.nativescript.plugins.ionicportals.NSCIonicPortals>;
          public static sync(param0: io.ionic.liveupdateprovider.ProviderManager, param1: org.nativescript.plugins.ionicportals.NSCIonicPortals.SyncCallback): void;
        }
        export module NSCIonicPortals {
          export class SyncCallback {
            public static class: java.lang.Class<org.nativescript.plugins.ionicportals.NSCIonicPortals.SyncCallback>;
            public constructor(implementation: { onSuccess(): void; onError(param0: java.lang.Throwable): void });
            public onSuccess(): void;
            public onError(param0: java.lang.Throwable): void;
          }
        }
      }
    }
  }
}
