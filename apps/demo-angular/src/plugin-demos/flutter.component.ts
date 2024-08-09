import { Component, NgZone } from '@angular/core';
import { DemoSharedFlutter } from '@demo/shared';
import { registerElement } from '@nativescript/angular';
import { Color } from '@nativescript/core';
import { Flutter } from '@nativescript/flutter';

registerElement('Flutter', () => Flutter);

@Component({
  selector: 'demo-flutter',
  templateUrl: 'flutter.component.html',
})
export class FlutterComponent {
  demoShared: DemoSharedFlutter;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedFlutter();
  }

  makeMeRed(args) {
    args.object.backgroundColor = new Color('red');
  }
}
