import { EventData, View } from '@nativescript/core';

export interface PasteTextPayload {
  type: 'text';
  value: string;
}

export interface PasteImageItem {
  uri: string;
  mimeType: string;
  width?: number;
  height?: number;
  animated: boolean;
}

export interface PasteImagesPayload {
  type: 'images';
  items: PasteImageItem[];
}

export interface PasteFileItem {
  uri: string;
  mimeType: string;
  name?: string;
  size?: number;
}

export interface PasteFilesPayload {
  type: 'files';
  items: PasteFileItem[];
}

export interface PasteUnsupportedPayload {
  type: 'unsupported';
  availableTypes: string[];
}

export type PastePayload = PasteTextPayload | PasteImagesPayload | PasteFilesPayload | PasteUnsupportedPayload;

export interface PasteEventData extends EventData {
  data: PastePayload;
}

export interface DropEventData extends EventData {
  data: PastePayload;
}

export declare class PasteInput extends View {
  static pasteEvent: string;
  static dropEvent: string;

  readonly android: any;
  readonly ios: any;

  accept: string;
  hint: string;
  editable: boolean;
  maxLength: number;
  enableDragDrop: boolean;

  on(eventName: 'paste', callback: (args: PasteEventData) => void, thisArg?: any): void;
  on(eventName: 'drop', callback: (args: DropEventData) => void, thisArg?: any): void;
  on(eventName: string, callback: (args: EventData) => void, thisArg?: any): void;

  getText(): string;
  setText(value: string): void;
  cleanupTempFiles(): void;
}
