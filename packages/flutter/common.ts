import { ContentView, Observable } from '@nativescript/core';

export type FlutterChannelType = { [key: string]: (...args: any[]) => Promise<any> };

export interface IFlutterMessage {
  type: string;
  data?: any;
}

export class FlutterCommon extends ContentView {
  static sendMessageReplyEvent = 'sendMessageReplyEvent';
  static DEBUG = false;
  channel: FlutterChannelType;

  sendMessage(type: string, data?: any, callback?: (value?: any) => void) {
    // impl specific
  }
}
