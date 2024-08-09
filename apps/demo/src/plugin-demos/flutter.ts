import { Observable, EventData, Page, CoreTypes } from '@nativescript/core';
import { DemoSharedFlutter } from '@demo/shared';
import { Flutter, FlutterChannelType } from '@nativescript/flutter';
Flutter.DEBUG = true;

let vm: DemoModel;
export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  vm = new DemoModel();
  page.bindingContext = vm;
}

export function loadedFlutter(args: EventData) {
  vm.flutter = <Flutter>args.object;
}

export class DemoModel extends DemoSharedFlutter {}
