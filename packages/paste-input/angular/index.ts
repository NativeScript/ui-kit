import { NgModule } from '@angular/core';
import { registerElement } from '@nativescript/angular';
import { PasteInput } from '@nativescript/paste-input';
import { PasteInputDirective } from './paste-input.directive';

export * from './paste-input.directive';

@NgModule({
  declarations: [PasteInputDirective],
  exports: [PasteInputDirective],
})
export class PasteInputModule {}

registerElement('PasteInput', () => PasteInput);
