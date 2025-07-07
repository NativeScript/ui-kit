import { Builder, Button, EventData, StackLayout, View } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { MorphModalKit } from '@nativescript/morph-modal-kit';

export class DemoSharedMorphModalKit extends DemoSharedBase {
  openModalMenu(args: EventData) {
    const btn = <Button>args.object;
    const placeholder = btn.page.getViewById('container') as StackLayout;
    const dynamicView: View = Builder.load({
      path: '~/plugin-demos',
      name: 'morph-modal-sample',
    });
    placeholder.addChild(dynamicView);
    MorphModalKit.open(dynamicView, btn, {
      modalBackgroundColor: UIColor.purpleColor,
      handleColor: UIColor.greenColor,
      overlayOpacity: 0.8,
    });
  }
}
