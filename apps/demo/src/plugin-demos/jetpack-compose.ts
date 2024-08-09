import { EventData, Page } from '@nativescript/core';
import { DemoSharedJetpackCompose } from '@demo/shared';
import { registerJetpackCompose, ComposeDataDriver } from '@nativescript/jetpack-compose';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedJetpackCompose {}
