import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedSwiftUi } from '@demo/shared';
import {} from '@nativescript/swift-ui';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedSwiftUi {
  stepperCount = 1;

  stepperCountModifiers = [
    { contentTransition: 'numericText' },
    {
      animation: {
        type: 'spring',
        value: 2,
      },
    },
  ];

  swiftUIChange(args) {
    console.log('swiftUIEvent:', args?.data?.onValueChange);
  }
}
