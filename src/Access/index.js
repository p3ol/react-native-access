import { NativeModules, findNodeHandle } from 'react-native';

const { RNAccess } = NativeModules;

export default class Access {
  init(appId) {
    RNAccess.instanciate(appId);

    return this;
  }

  config (config, readOnly = false) {
    RNAccess.config(config, readOnly);

    return this;
  }

  texts (texts, readOnly = false) {
    RNAccess.texts(texts, readOnly);

    return this;
  }

  styles (styles, readOnly) {
    // RNAccess.styles(styles, readOnly);

    return this;
  }

  variables (variables, readOnly) {
    // RNAccess.variables(variables, readOnly);

    return this;
  }

  on (event, callback) {
    // RNAccess.on(event, callback);

    return this;
  }

  once (event, callback) {
    // RNAccess.once(event, callback);

    return this;
  }

  off (event, callback) {
    // RNAccess.off(event, callback);

    return this;
  }

  async createPaywall (pageType, view, percent) {
    return await RNAccess
      .createPaywall(pageType, findNodeHandle(view) || -1, percent);
  }

  destroy () {
    // RNAccess.destroy();

    return this;
  }
}
