import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SwiftUiDemosComponent } from './swift-ui-demos.component';

const routes = [{ path: '', component: SwiftUiDemosComponent }];
@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [SwiftUiDemosComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SwiftUiDemosModule {}
