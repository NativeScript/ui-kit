- [@nativescript/flutter](packages/flutter/README.md)
- [@nativescript/ionic-portals](packages/ionic-portals/README.md)
- [@nativescript/jetpack-compose](packages/jetpack-compose/README.md)
- [@nativescript/morph-modal-kit](packages/morph-modal-kit/README.md)
- [@nativescript/rive](packages/rive/README.md)
- [@nativescript/swift-ui](packages/swift-ui/README.md)
- [@nativescript/ui-charts](packages/ui-charts/README.md)

# How to use?

This workspace manages the suite of plugins listed above. 

In general, when in doubt with what to do, just `npm start`.

## Testing Flutter

You will need [Flutter installed](https://docs.flutter.dev/get-started/install).

1. Uncomment sections in:
   - `tools/assets/App_Resources/iOS/Podfile`
   - `tools/assets/App_Resources/Android/settings.gradle`

2. To run on Android, build the flutter module first

```
cd apps/demo/flutter_views/.android

./gradlew Flutter:assemble
```

### Note about "focus modes"

`npm start` > `focus.{any-plugin}` ENTER will focus the workspace to a single plugin for working on it in isolation.

The swift-ui plugin is currently managed here and we have testing code for it here: https://github.com/NativeScript/ui-kit/blob/main/tools/assets/App_Resources/iOS/src/BasicViewProvider.swift ... however when focusing on any other plugins, you would need to rename those .swift > .off so they aren't included in the demo to work with other plugins. Since the supporting .swift files include SwiftUIProvider which comes from only the swift-ui plugin.

## How to add a new package to workspace?

```
npm run add
```

At the prompt, enter the name of the new package.

- This adds a plugin harness in `packages` with the necessary boilerplate to just start developing
- Updates all demo app flavors to support demoing the new package
- Adds shared code in `tools/demo` where you can write demo code **once** and share across all demo flavors
- Updates build tooling to support the new package
- Updates the `npm start` interactive display
- Updates the README here to list the new package

## How to add Angular compatibility to a package

```
npm run add-angular
```

At the prompt, enter the name of the package to add an `angular` folder to it with the necessary boilerplate to provide Angular support to the package.

## How to focus on just 1 package to develop in isolation

```
npm start
```

- Choose the focus commands for the package you wish to focus on and hit enter.
- All the demo app's will be updated to isolate that 1 package and for supported IDE's (currently VS Code), the source code will also become isolated in the workspace.

Note: *good to always clean the demo you plan to run after focusing. (You can clean any demo from `npm start` as well)*

## How to publish packages?

```
npm run publish-packages
```

- You will be prompted for the package names to publish. Leaving blank and hitting enter will publish them all.
- You will then be prompted for the version to use. Leaving blank will auto bump the patch version (it also handles prerelease types like alpha, beta, rc, etc. - It even auto tags the corresponding prelease type on npm).
- You will then be given a brief sanity check 🧠😊

<h3 align="center">Made with ❤️</h3>
