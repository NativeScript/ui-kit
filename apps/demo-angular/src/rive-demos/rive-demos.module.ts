import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { RiveDemosComponent } from './rive-demos.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: RiveDemosComponent }])],
  declarations: [RiveDemosComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class RiveDemosModule {}
