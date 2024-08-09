import { Component, inject, NgZone } from '@angular/core';
import { DemoSharedIonicPortals } from '@demo/shared';
import { registerElement } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { IonicPortal } from '@nativescript/ionic-portals';
registerElement('IonicPortal', () => IonicPortal);

@Component({
  selector: 'demo-ionic-portals',
  templateUrl: 'ionic-portals.component.html',
})
export class IonicPortalsComponent {
  page = inject(Page);
  demoShared: DemoSharedIonicPortals;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedIonicPortals(this.page);
  }
}
