import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugindemoangular',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
  cli: {
    packageManager: 'npm',
  },
  ios: {
    SPMPackages: [
      {
        name: 'RiveRuntime',
        libs: ['RiveRuntime'],
        repositoryURL: 'https://github.com/rive-app/rive-ios.git',
        version: '6.0.0',
      },
      {
        name: 'SwiftUIWinterCG',
        libs: ['SwiftUIWinterCG'],
        path: '/Users/nstudio/Documents/github/NathanWalker/swift-ui-winter-cg',
      },
    ],
  },
  visionos: {
    SPMPackages: [
      {
        name: 'SwiftUIWinterCG',
        libs: ['SwiftUIWinterCG'],
        path: '/Users/nstudio/Documents/github/NathanWalker/swift-ui-winter-cg',
      },
    ],
  },
} as NativeScriptConfig;
