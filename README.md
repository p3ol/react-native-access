[![CI](https://github.com/p3ol/react-native-access/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/p3ol/react-native-access/actions/workflows/ci.yml)

# Poool Access - React Native SDK

> The easiest way to add Poool Access to your React Native app ✨

## Installation

```bash
yarn add @poool/react-native-access react-native-permissions
```

⚠ **Important**: This package is a wrapper that requires native Poool SDKs to be linked to your project. React Native does it automatically for you, but if you encounter any issues, please refer to the [React Native documentation](https://reactnative.dev/docs/linking-libraries-ios) about linking native libraries.

## Requirements

- React Native >= 0.78 (not tested on older versions)
- React Native Permissions >= 5.3.0 (not tested on older versions) (see [react-native-permissions' setup](https://github.com/zoontek/react-native-permissions) for more details)

## Usage

```jsx
import { Text } from 'react-native';
import {
  AccessContext,
  Snippet,
  RestrictedContent,
  Paywall,
} from '@poool/react-native-access';

export default = () => (
  <>
    { /*
      Wrap everything with our AccessContext component
    */ }
    <AccessContext
      appId="insert_your_app_id"
      config={{ cookies_enabled: true }}
    >
      { /*
        Place your snippet & restricted content where you want them to be
        */ }
      <Snippet>
        <Text>Synopsis</Text>
      </Snippet>
      <RestrictedContent>
        <Text>Full content</Text>
      </RestrictedContent>

      { /*
        Place our <Paywall /> component where you want your paywall to be
        displayed
      */ }
      <Paywall />
    </AccessContext>
  </>
);
```

## Documentation

### `<AccessContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default paywall config (see the [configuration](https://poool.dev/docs/react-native/access/configuration) documentation).
- `styles` {`Object`} (optional) Default paywall styles (see the [styles](https://poool.dev//docs/react-native/access/appearances) documentation).
- `texts` {`Object`} (optional) Default paywall texts (see the [texts](https://poool.dev/docs/react-native/access/texts) documentation).
- `variables` {`Object`} (optional) Paywall variables (see the [variables](https://poool.dev/docs/react-native/access/variables) documentation).

### `<RestrictedContent />`

#### Props

- `id` {`String`} (optional, default: null) Paywall id

### `<Snippet />`

- `id` {`String`} (optional, default: null) Paywall id

### `<Paywall />`

#### Props

- `id` {`String`} (optional, default: null) Paywall id: used to link the paywall release event to the corresponding snippet/restricted content
- `pageType` {`String`} (optional, default: `'premium'`) Current page type (supported types: `page`, `premium`, `free`)
- `config` {`Object`} (optional) Paywall config (see the [configuration](https://poool.dev/docs/javascript/access/configuration) documentation).
- `styles` {`Object`} (optional) Paywall styles (see the [styles](https://poool.dev//docs/javascript/access/appearances) documentation).
- `texts` {`Object`} (optional) Paywall texts (see the [texts](https://poool.dev/docs/javascript/access/texts) documentation).
- `variables` {`Object`} (optional) Paywall variables (see the [variables](https://poool.dev/docs/javascript/access/variables) documentation).
- `on*` {`Function`} (optional) Event listeners (see the [events](https://poool.dev/docs/react-native/access/events) documentation).

### useAccess()

Can be used to retrieve some properties from the current access context, as well as the Access SDK itself.

#### Returns

- `appId` {`String`} Current app ID
- `config` {`Object`} Current access context config
- `texts` {`Object`} Current access context texts
- `styles` {`Object`} Current access context styles
- `variables` {`Object`} Current access context variables

#### Example

```js
const { appId } = useAccess();
```

## Contributing

[![](https://contrib.rocks/image?repo=p3ol/react-native-access)](https://github.com/p3ol/react-native-access/graphs/contributors)

Please check the [CONTRIBUTING.md](https://github.com/p3ol/react-native-access/blob/master/CONTRIBUTING.md) doc for contribution guidelines.


## Development

Install dependencies:

```bash
yarn install
```

(Optional-iOS Only) Install pods:

```bash
yarn example ios:install
```

Run examples:

```bash
yarn example ios
```

or

```bash
yarn example android
```

### Known issues

#### `yarn example android` fails with `command "node" failed`

- Stop all gradlew daemons: `cd example/android && ./gradlew --stop`
- Ensure the right node version is selected `nvm use`
- Run `yarn example android` again

## License

This software is licensed under [MIT](https://github.com/p3ol/react-native-access/blob/master/LICENSE).
