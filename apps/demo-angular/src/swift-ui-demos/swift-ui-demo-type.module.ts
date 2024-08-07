import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SwiftUiDemoTypeComponent } from './swift-ui-demo-type.component';

const routes = [{ path: '', component: SwiftUiDemoTypeComponent }];
@NgModule({
  imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild(routes)],
  declarations: [SwiftUiDemoTypeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SwiftUiDemoTypeModule {}
