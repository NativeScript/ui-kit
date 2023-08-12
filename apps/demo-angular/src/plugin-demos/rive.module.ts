import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { RiveComponent } from './rive.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: RiveComponent }])],
  declarations: [RiveComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RiveModule {}
