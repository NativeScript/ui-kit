import { SwiftUIViewBase } from '../common';

export class Spacer extends SwiftUIViewBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = SpacerProvider.new();
    return this.provider.view;
  }
}
