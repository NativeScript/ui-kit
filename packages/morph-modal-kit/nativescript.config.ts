import { NativeScriptConfig } from '@nativescript/core';

export default {
  ios: {
    SPMPackages: [
      {
        name: 'MorphModalKit',
        libs: ['MorphModalKit'],
        repositoryURL: 'https://github.com/jsmmth/MorphModalKit.git',
        version: '0.0.2',
      },
    ],
  },
} as NativeScriptConfig;
