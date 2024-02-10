import { Component, NgZone } from '@angular/core';
import { DemoSharedRive } from '@demo/shared';
import {} from '@nativescript/rive';

@Component({
  selector: 'demo-rive',
  templateUrl: 'rive.component.html',
})
export class RiveComponent {
  demoShared: DemoSharedRive;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedRive();
  }
}
