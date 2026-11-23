import { Application } from '@nativescript/core';

// uncomment to test Flutter
// import { init } from '@nativescript/flutter';
// init();

// uncomment to test Ionic Portals live updates with Capawesome Cloud
// import { IonicPortalManager } from '@nativescript/ionic-portals';
// IonicPortalManager.configureLiveUpdates('ionicWebPortalSample', {
//     appId: '<capawesome-cloud-app-id>',
//     channel: 'production',
// });
// IonicPortalManager.syncLiveUpdates('ionicWebPortalSample');

Application.run({ moduleName: 'app-root' });
