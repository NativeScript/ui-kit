import { Observable, EventData, Page, Frame } from '@nativescript/core';
import { DemoSharedRive } from '@demo/shared';
import {} from '@nativescript/rive';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedRive {
  constructor() {
    super();
    this.routerChange = (context) => {
      Frame.topmost().navigate({
        moduleName: `rive-demos/rive-examples`,
        context,
      });
    };
  }
}
