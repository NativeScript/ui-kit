import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { PasteInput } from '@nativescript/paste-input';

@Directive({
  selector: 'PasteInput',
})
export class PasteInputDirective implements OnDestroy {
  private _pasteInput: PasteInput;

  constructor(@Inject(ElementRef) elementRef: ElementRef) {
    this._pasteInput = elementRef.nativeElement;
  }

  ngOnDestroy() {
    this._pasteInput?.cleanupTempFiles();
  }
}
