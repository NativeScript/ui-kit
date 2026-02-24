import { Component, NgZone } from '@angular/core';
import { DemoSharedWidgets } from '@demo/shared';
import {} from '@nativescript/widgets';

@Component({
  selector: 'demo-widgets',
  templateUrl: 'widgets.component.html',
})
export class WidgetsComponent {
  demoShared: DemoSharedWidgets;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedWidgets();
  }
}
