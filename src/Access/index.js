import {
  NativeModules,
  NativeEventEmitter,
  findNodeHandle,
} from 'react-native';

const { RNAccess, RNAccessEventManager } = NativeModules;

export default class Access {
  eventManager = null;

  init (appId) {
    RNAccess.instanciate(appId);
    this.eventManager = new NativeEventEmitter(RNAccessEventManager);

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

  styles (styles, readOnly = false) {
    RNAccess.styles(styles, readOnly);

    return this;
  }

  variables (variables) {
    RNAccess.variables(variables);

    return this;
  }

  on (event, callback) {
    this.eventManager.addListener(
      this._normalizeEventName(event),
      callback,
    );

    return this;
  }

  once (event, callback) {
    this.eventManager.addListener(
      this._normalizeEventName(event),
      callback,
    );

    return this;
  }

  off (event) {
    this.eventManager.removeAllListeners(
      this._normalizeEventName(event),
    );

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

  _normalizeEventName (name) {
    name = /^on[A-Z]/.test(name)
      ? name.replace(/^on/, '') : name;

    return name[0].toLowerCase() + name.slice(1);
  }
}
