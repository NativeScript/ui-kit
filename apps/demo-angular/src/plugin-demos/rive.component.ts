import { Component, inject, NgZone } from '@angular/core';
import { DemoSharedRive } from '@demo/shared';
import { registerElement, RouterExtensions } from '@nativescript/angular';
import { RiveService } from '../rive-demos/rive.service';
import { RiveView } from '@nativescript/rive';
registerElement('RiveView', () => RiveView);

@Component({
  selector: 'demo-rive',
  templateUrl: 'rive.component.html',
})
export class RiveComponent {
  router = inject(RouterExtensions);
  riveService = inject(RiveService);
  demoShared: DemoSharedRive;

  constructor(private _ngZone: NgZone) {
    this.demoShared = this.riveService.demoShared;
    this.demoShared.routerChange = (context) => {
      this.demoShared.currentInputs = context.inputs;
      this.router.navigate([`rive-demos/rive-examples`], {
        queryParams: context,
      });
    };
  }
}
