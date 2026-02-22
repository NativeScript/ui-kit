import { EventData, Page, View } from '@nativescript/core';
import { DemoSharedPasteInput } from '@demo/shared';

let model: DemoModel;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  model = new DemoModel();
  page.bindingContext = model;
}

export function onRemoveImage(args: EventData) {
  const item = (args.object as View).bindingContext;
  const idx = model.pastedImages.indexOf(item);
  if (idx >= 0) {
    model.pastedImages.splice(idx, 1);
    if (model.pastedImages.length === 0) {
      model.set('showImages', false);
    }
  }
}

export class DemoModel extends DemoSharedPasteInput {}
