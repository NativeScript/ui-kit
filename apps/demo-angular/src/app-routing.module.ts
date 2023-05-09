import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'flutter', loadChildren: () => import('./plugin-demos/flutter.module').then((m) => m.FlutterModule) },
  { path: 'ui-charts', loadChildren: () => import('./plugin-demos/ui-charts.module').then((m) => m.UiChartsModule) },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
