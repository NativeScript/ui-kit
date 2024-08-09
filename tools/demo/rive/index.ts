import { ObservableArray } from '@nativescript/core';
import { DemoSharedBase } from '../utils';

export class DemoSharedRive extends DemoSharedBase {
  routerChange: (context: any) => void;
  currentInputs: ObservableArray<{ name: string; value: boolean | number | string }>;
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
    if (this.routerChange) {
      this.currentInputs = context.inputs;
      this.routerChange(context);
    }
  }
}
