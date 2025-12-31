declare namespace org {
  export namespace nativescript {
    export namespace plugins {
      export namespace rive {
        export class Rive {
          public static class: java.lang.Class<org.nativescript.plugins.rive.Rive>;
          public constructor();
          public setEvents(events: org.nativescript.plugins.rive.Rive.Events): void;
          public getEvents(): org.nativescript.plugins.rive.Rive.Events;
        }
        export namespace Rive {
          export class Events {
            public constructor(implementation: { notifyPlay(name: astring): void; notifyPause(name: string): void; notifyStop(name: string): void; notifyLoop(name: string): void; notifyStateChanged(stateMachineName: string, stateName: string): void });
            public constructor();
            public notifyPlay(name: string): void;
            public notifyStop(name: string): void;
            public notifyLoop(name: string): void;
            public notifyPause(name: string): void;
            public notifyStateChanged(stateMachineName: string, stateName: string): void;
          }
        }
      }
    }
  }
}
