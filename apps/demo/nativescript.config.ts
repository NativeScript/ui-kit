import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'org.nativescript.plugindemo',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  appPath: 'src',
  cli: {
    packageManager: 'npm',
  },
  hooks: [
    {
      type: 'before-prepare',
      script: '../../tools/scripts/before-prepare.js',
    },
  ],
  ios: {
    SPMPackages: [
      {
        name: 'RiveRuntime',
        libs: ['RiveRuntime'],
        repositoryURL: 'https://github.com/rive-app/rive-ios.git',
        version: '5.10.0',
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
