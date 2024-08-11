import { SwiftUILayoutBase } from '../common';

export class ZStack extends SwiftUILayoutBase {
  createNativeView() {
    // @ts-expect-error
    this.provider = ZStackProvider.new();
    return this.provider.view;
  }
}
