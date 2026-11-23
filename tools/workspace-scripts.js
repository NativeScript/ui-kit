module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
        description: ` 🔻 Vanilla`,
      },
      demo: {
        clean: {
          script: 'nx clean demo',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo ios',
          description: '⚆  Run iOS  ',
        },
        vision: {
          script: 'nx run demo:vision',
          description: '⚆  Run visionOS  🥽',
        },
        android: {
          script: 'nx debug demo android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx clean demo-angular',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx debug demo-angular ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx debug demo-angular android',
          description: '⚆  Run Android  🤖',
        },
      },
    },
    '⚙️': {
      script: `npx cowsay "@nativescript/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @nativescript/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@nativescript': {
      // @nativescript/ui-charts
      'ui-charts': {
        build: {
          script: 'nx run ui-charts:build.all',
          description: '@nativescript/ui-charts: Build',
        },
      },
      // @nativescript/flutter
      flutter: {
        build: {
          script: 'nx run flutter:build.all',
          description: '@nativescript/flutter: Build',
        },
      },
      // @nativescript/swift-ui
      'swift-ui': {
        build: {
          script: 'nx run swift-ui:build.all',
          description: '@nativescript/swift-ui: Build',
        },
      },
      // @nativescript/jetpack-compose
      'jetpack-compose': {
        build: {
          script: 'nx run jetpack-compose:build.all',
          description: '@nativescript/jetpack-compose: Build',
        },
      },
      // @nativescript/ionic-portals
      'ionic-portals': {
        build: {
          script: 'nx run ionic-portals:build.all',
          description: '@nativescript/ionic-portals: Build',
        },
      },
      // @nativescript/rive
      rive: {
        build: {
          script: 'nx run rive:build.all',
          description: '@nativescript/rive: Build',
        },
      },
      // @nativescript/morph-modal-kit
      'morph-modal-kit': {
        build: {
          script: 'nx run morph-modal-kit:build.all',
          description: '@nativescript/morph-modal-kit: Build',
        },
      },
      // @nativescript/widgets
      widgets: {
        build: {
          script: 'nx run widgets:build.all',
          description: '@nativescript/widgets: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      'ui-charts': {
        script: 'nx run ui-charts:focus',
        description: 'Focus on @nativescript/ui-charts',
      },
      flutter: {
        script: 'nx run flutter:focus',
        description: 'Focus on @nativescript/flutter',
      },
      'swift-ui': {
        script: 'nx run swift-ui:focus',
        description: 'Focus on @nativescript/swift-ui',
      },
      'jetpack-compose': {
        script: 'nx run jetpack-compose:focus',
        description: 'Focus on @nativescript/jetpack-compose',
      },
      'ionic-portals': {
        script: 'nx run ionic-portals:focus',
        description: 'Focus on @nativescript/ionic-portals',
      },
      rive: {
        script: 'nx run rive:focus',
        description: 'Focus on @nativescript/rive',
      },
      'morph-modal-kit': {
        script: 'nx run morph-modal-kit:focus',
        description: 'Focus on @nativescript/morph-modal-kit',
      },
      widgets: {
        script: 'nx run widgets:focus',
        description: 'Focus on @nativescript/widgets',
      },
      reset: {
        script: 'nx g @nativescript/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
