import { Component, NgZone } from '@angular/core';
import { DemoSharedMorphModalKit } from '@demo/shared';
import {} from '@nativescript/morph-modal-kit';

@Component({
  selector: 'demo-morph-modal-kit',
  templateUrl: 'morph-modal-kit.component.html',
})
export class MorphModalKitComponent {
  demoShared: DemoSharedMorphModalKit;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedMorphModalKit();
  }
}
