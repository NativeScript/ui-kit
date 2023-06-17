import { Application } from '@nativescript/core';

// uncomment to test Flutter
// import { init } from '@nativescript/flutter';
// init();

// uncomment to test Ionic Portals
// import { IonicPortalManager } from '@nativescript/ionic-portals';
// IonicPortalManager.configureLiveUpdates('ionicWebPortalSample', {
//     appId: 'e29e2c2e',
//     channel: 'production',
//     syncOnAdd: true
// })

// Application.on(Application.launchEvent, () => {
// 	// Register IonicPortals
// 	IonicPortalManager.register('<portal-api-key>');
// });

Application.run({ moduleName: 'app-root' });
