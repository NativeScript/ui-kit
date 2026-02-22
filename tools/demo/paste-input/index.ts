import { ObservableArray } from '@nativescript/core';
import { DemoSharedBase } from '../utils';
import { PasteEventData, PasteImageItem } from '@nativescript/paste-input';

export class DemoSharedPasteInput extends DemoSharedBase {
  pasteResult: string = '';
  showImages: boolean = false;
  pastedImages: ObservableArray<PasteImageItem> = new ObservableArray<PasteImageItem>();

  onPaste(args: PasteEventData) {
    const payload = args.data;
    switch (payload.type) {
      case 'text':
        this.set('pasteResult', `Text: ${payload.value}`);
        console.log('[PasteInput] Text pasted:', payload.value);
        break;
      case 'images':
        const imgInfo = payload.items.map((i) => `  ${i.mimeType} ${i.width || '?'}x${i.height || '?'} animated:${i.animated}`).join('\n');
        this.set('pasteResult', `Images (${payload.items.length}):\n${imgInfo}`);
        this.pastedImages.push(...payload.items);
        this.set('showImages', true);
        console.log('[PasteInput] Images pasted:', payload.items.length);
        break;
      case 'files':
        const fileInfo = payload.items.map((f) => `  ${f.name || 'unknown'} (${f.mimeType}, ${f.size || '?'} bytes)`).join('\n');
        this.set('pasteResult', `Files (${payload.items.length}):\n${fileInfo}`);
        console.log('[PasteInput] Files pasted:', payload.items.length);
        break;
      case 'unsupported':
        this.set('pasteResult', `Unsupported. Available types:\n  ${payload.availableTypes.join(', ')}`);
        console.log('[PasteInput] Unsupported paste, types:', payload.availableTypes);
        break;
    }
  }

  onDrop(args: PasteEventData) {
    console.log('[PasteInput] Drop event');
    this.onPaste(args);
  }
}
