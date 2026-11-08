import { IonicPortalCommon, IonicPortalManagerCommon, IonicPortalLiveUpdateConfig } from './common';

export { IonicPortalLiveUpdateConfig } from './common';

export declare class IonicPortalManager extends IonicPortalManagerCommon {
  /**
   * Used to set the initial context of any portal id before the portal is shown
   * @param id portal id
   * @param initialContext data provided as the initial context to the portal
   */
  static setInitialContext(id: string, initialContext: any): void;
  /**
   * Define usage of non-official Capacitor Plugins via Android package names
   * @param plugins list of non-official Capacitor package names
   */
  static setAndroidPlugins(plugins: Array<string>): void;
  /**
   * Configure Live Updates from Capawesome Cloud for a portal. Call it before the portal is shown.
   * Throws when the configuration is invalid, for example when `appId` is missing.
   * @param portalId portal id
   * @param config live update configuration
   */
  static configureLiveUpdates(portalId: string, config: IonicPortalLiveUpdateConfig): void;
  /**
   * Download the latest bundle for a portal from Capawesome Cloud.
   * A portal that is already on screen keeps the current bundle and serves the new one on its next load.
   * @param portalId portal id configured with `configureLiveUpdates()`
   */
  static syncLiveUpdates(portalId: string): Promise<void>;
  /**
   * Send a message to any web portal via publishing a topic (aka. event)
   * @param topic name of topic/event
   * @param data payload to send
   */
  static publishTopic(topic: string, data?: any): void;
  /**
   * Listen to any message sent from any web portal via subscribing to the topic (aka. event)
   * @param topic name of topic/event
   * @param callback method which is invoked everytime a message is sent via the topic
   * @returns subscription id used to unsubscribe later
   */
  static subscribeToTopic(topic: string, callback: (data?: any) => void): number;
  /**
   * Unsubscribe from any topic (aka. event)
   * @param topic name of topic/event
   * @param subscriptionId subscription id
   */
  static unsubscribeFromTopic(topic: string, subscriptionId: number): void;
}
export declare class IonicPortal extends IonicPortalCommon {}
