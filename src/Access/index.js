import { NativeModules } from 'react-native';

const { RNAccess } = NativeModules;

export default class Access {
  init(appId) {
    RNAccess.instanciate(appId);

    return this;
  }

  config (config, readOnly) {
    // RNAccess.config(config, readOnly);

    return this;
  }

  texts (texts, readOnly) {
    // RNAccess.texts(texts, readOnly);

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

  createPaywall (pageType, view, percent) {
    return RNAccess.createPaywall(pageType);
  }

  destroy () {
    // RNAccess.destroy();

    return this;
  }
}
