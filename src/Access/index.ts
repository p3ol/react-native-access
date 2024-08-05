import { NativeModules, findNodeHandle } from 'react-native';

const { ReactNativeAccess } = NativeModules;

export default class Access {
  init (appId: string) {
    ReactNativeAccess.instanciate(appId);

    return this;
  }

  createPaywall (pageType: string, containerTag: number) {
    ReactNativeAccess.createPaywall(pageType, findNodeHandle(containerTag) || -1);

    return this;
  }

  destroy () {
    ReactNativeAccess.destroy();

    return this;
  }
}
