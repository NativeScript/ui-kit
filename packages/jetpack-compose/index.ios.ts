import { IJetpackComposeProvider, RegistryCallback } from '.';
import { BaseComposeDataDriver, JetpackComposeCommon } from './common';
export * from './common';

export function registerJetpackCompose(id: string, callback: RegistryCallback) {
  // noop
}

export class ComposeDataDriver extends BaseComposeDataDriver<JetpackCompose> {
  constructor(private jetpackComposeProvider: IJetpackComposeProvider, owner: JetpackCompose) {
    super(owner);
  }
  renderInNativeView(composeView) {}
  registerEvents(callback): void {}
  updateData(data) {}
  onEvent(data) {}
}

export class JetpackCompose extends JetpackComposeCommon {}
