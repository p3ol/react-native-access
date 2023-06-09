import { NativeModules } from 'react-native';

const { ReactNativeAccess } = NativeModules;

class Access {
  init(appId) {
    ReactNativeAccess.instanciate(appId);

    return this;
  }

  createPaywall () {
    ReactNativeAccess.createPaywall();
  }
}

export default new Access();
