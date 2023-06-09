import { NativeModules } from 'react-native';

const { ReactNativeAccess } = NativeModules;

class Access {
  init(appId) {
    return ReactNativeAccess.instanciate(appId);
  }
}

export default new Access();
