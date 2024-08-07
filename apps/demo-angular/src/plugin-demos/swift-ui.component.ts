import { Component, inject, NgZone } from '@angular/core';
import { DemoSharedSwiftUi } from '@demo/shared';
import { registerElement, RouterExtensions } from '@nativescript/angular';
import { SwiftUI, Text, Stepper, TextField, Shape } from '@nativescript/swift-ui';

registerElement('SwiftUI', () => SwiftUI);
registerElement('Text', () => Text);
registerElement('SUITextField', () => TextField);
registerElement('Shape', () => Shape);
registerElement('Stepper', () => Stepper);

@Component({
  selector: 'demo-swift-ui',
  templateUrl: 'swift-ui.component.html',
})
export class SwiftUiComponent {
  router = inject(RouterExtensions);
  demoShared: DemoSharedSwiftUi;

  constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSwiftUi();
  }

  viewComponents() {
    this.router.navigate(['/swift-ui-demos']);
  }
}
