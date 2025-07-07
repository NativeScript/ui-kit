import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { MorphModalKitComponent } from './morph-modal-kit.component';

@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: MorphModalKitComponent }])],
  declarations: [MorphModalKitComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class MorphModalKitModule {}
