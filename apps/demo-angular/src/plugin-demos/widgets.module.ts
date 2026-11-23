import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { WidgetsComponent } from './widgets.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: WidgetsComponent }])],
  declarations: [WidgetsComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WidgetsModule {}
