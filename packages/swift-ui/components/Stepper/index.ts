import { SwiftUIViewBase } from '../common';

export class Stepper extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = StepperViewProvider.new();
    return this.provider.view;
  }
}
