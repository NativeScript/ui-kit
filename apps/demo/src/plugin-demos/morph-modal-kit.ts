import { Observable, EventData, Page, StackLayout } from '@nativescript/core';
import { DemoSharedMorphModalKit } from '@demo/shared';
import {} from '@nativescript/morph-modal-kit';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedMorphModalKit {}
