import { Observable, EventData, Page, Frame } from '@nativescript/core';
import { DemoSharedRive } from '@demo/shared';
import {} from '@nativescript/rive';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedRive {
  viewExample(args) {
    const id = args.object.id;
    const context: any = {
      id,
      backgroundColor: '#111111',
    };
    switch (id) {
      case 'button':
        context.scale = 1.8;
        context.backgroundColor = '#06070e';
        break;
      case 'icons':
        context.artboard = 'CHAT';
        context.stateMachine = 'CHAT_Interactivity';
        context.inputs = [{ name: 'active', value: true }];
        break;
      //   case 'sith-de-mayo':
      //     context.artboard = 'New Artboard';
      //     context.backgroundColor = '#000';
      //     context.stateMachine = 'State Machine 1';
      //     context.inputs = [{ name: 'toggle', value: false }];
      //     break;
      case 'heart-like':
        context.artboard = 'New Artboard';
        context.backgroundColor = '#000';
        context.stateMachine = 'State Machine 1';
        context.scale = 1.6;
        context.inputs = [
          { name: 'Hover', value: false },
          { name: 'Pressed', value: false },
        ];
        break;
    }
    Frame.topmost().navigate({
      moduleName: `rive-demos/rive-examples`,
      context,
    });
  }
}
