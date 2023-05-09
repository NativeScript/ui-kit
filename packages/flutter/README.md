# @nativescript/flutter

Use Flutter with NativeScript projects by creating a [Flutter module](https://docs.flutter.dev/add-to-app) in the root of your project.

## Usage

**Prerequisites:**

- [NativeScript installed](https://beta.docs.nativescript.org/setup/)
- [Flutter installed](https://docs.flutter.dev/get-started/install)

### 1. Add Flutter to a NativeScript app
  
You can use Flutter in any existing NativeScript app or by creating a new one with `ns create`.

We can then create a Flutter module at the root of the project directory:
  
```bash
flutter create --template module flutter_views
```

*Note*: You can run `flutter run --debug` or `flutter build ios` from inside this `flutter_views` folder as any normal Flutter project to develop it.

Learn more from the [Flutter documentation here](https://docs.flutter.dev/add-to-app).

### 2. Configure your Dart code to have named entry points

Named entry points allow us to use different Flutter views in our NativeScript app by matching the entry point with the view id, for example: `<Flutter id="myFlutterView" />`

- `main.dart`

```ts
@pragma('vm:entry-point')
void myFlutterView() => runApp(const MyFlutterView());
```

### 3. Configure platforms for usage

#### iOS

`App_Resources/iOS/Podfile` should contain the following to reference our Flutter module.

```ruby
platform :ios, '14.0'

flutter_application_path = '../../flutter_views'
load File.join(flutter_application_path, '.ios', 'Flutter', 'podhelper.rb')
install_all_flutter_pods(flutter_application_path)

post_install do |installer|
    flutter_post_install(installer) if defined?(flutter_post_install)
end
```

Add Flutter debug permissions to `App_Resources/iOS/Info.plist`:

```xml
<key>NSLocalNetworkUsageDescription</key>
<string>Allow Flutter tools to debug your views.</string>
<key>NSBonjourServices</key>
<array>
  <string>_dartobservatory._tcp</string>
</array>
```

#### Android



### 4. Install @nativescript/flutter

```bash
npm install @nativescript/flutter
```

### 5. Use `Flutter` wherever desired

Be sure to initialize the Flutter engine before bootstrapping your app, typically in `app.ts` or `main.ts`:

```ts
import { init } from '@nativescript/flutter';
init();

// bootstrap app...
```

When using flavors, you can just register the element for usage in your markup:

```ts
import { Flutter } from '@nativescript/flutter'

// Angular
import { registerElement } from '@nativescript/angular'
registerElement('Flutter', () => Flutter)

// Solid
import { registerElement } from 'dominative';
registerElement('flutter', Flutter);

// Svelte
import { registerNativeViewElement } from 'svelte-native/dom'
registerNativeViewElement('flutter', () => Flutter);

// React
import { registerElement } from 'react-nativescript';
registerElement('flutter', () => Flutter);

// Vue
import Vue from 'nativescript-vue'
Vue.registerElement('Flutter', () => Flutter)
```

Use `Flutter` anywhere.

```xml
<Flutter id="myFlutterView"></Flutter>
```

## License

Apache License Version 2.0
