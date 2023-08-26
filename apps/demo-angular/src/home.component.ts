import { Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  demos = [
    {
      name: 'flutter',
    },
    {
      name: 'ionic-portals',
    },
    {
      name: 'jetpack-compose',
    },
    {
      name: 'rive',
    },
    {
      name: 'swift-ui',
    },
    {
      name: 'ui-charts',
    },
  ];
}
