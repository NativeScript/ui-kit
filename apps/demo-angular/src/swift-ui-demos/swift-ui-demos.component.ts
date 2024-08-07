import { Component, inject, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DemoSharedSwiftUi } from '@demo/shared';
import { registerElement } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { SwiftUI, Button, Label, Text, Stepper, TextField, Shape, List, Color } from '@nativescript/swift-ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ListViewCustom } from './list-view-custom';

registerElement('SwiftUI', () => SwiftUI);
registerElement('Color', () => Color);
registerElement('SUIButton', () => Button);
registerElement('SUILabel', () => Label);
registerElement('List', () => List);
registerElement('Text', () => Text);
registerElement('SUITextField', () => TextField);
registerElement('Shape', () => Shape);
registerElement('Stepper', () => Stepper);

registerElement('ListView', () => ListViewCustom);

@Component({
  selector: 'demo-swift-ui-demos',
  templateUrl: 'swift-ui-demos.component.html',
})
export class SwiftUiDemosComponent {
  page = inject(Page);
  activeRoute = inject(ActivatedRoute);
  demoShared: DemoSharedSwiftUi;
  sections = [
    {
      header: 'SwiftUI NativeScript',
      footer: 'This is a demo of @nativescript/swift-ui. Each section demonstrates a different component or feature.',
    },
  ];
  items = [
    { title: 'Text', id: 'text' },
    { title: 'Colors', id: 'colors' },
    { title: 'Buttons', id: 'buttons' },
    { title: 'Stacks', id: 'stacks' },
    { title: 'Lists', id: 'lists' },
    { title: 'Controls', id: 'controls' },
    { title: 'Images', id: 'images' },
    { title: 'Pickers', id: 'pickers' },
    { title: 'Progress', id: 'progress' },
    { title: 'Shapes', id: 'shapes' },
    { title: 'TextField', id: 'textfield' },
    { title: 'Filters', id: 'filters' },
    { title: 'Experimental API', id: 'experimental' },
  ];

  constructor() {
    this.activeRoute.params.pipe(takeUntilDestroyed()).subscribe((params) => {
      console.log('params:', params);
    });
    this.page.on('loaded', (args) => {
      if (__IOS__) {
        const navigationController: UINavigationController = this.page.frame.ios.controller;
        navigationController.navigationBar.prefersLargeTitles = true;
      }
    });
  }

  ngOnInit() {
    this.demoShared = new DemoSharedSwiftUi();
  }
}
