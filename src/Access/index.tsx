import type { Poool } from 'poool-access';
import {
  NativeModules,
  NativeEventEmitter,
  findNodeHandle,
} from 'react-native';

import type { PageType } from '../types';

const { RNAccess, RNAccessEventManager } = NativeModules;

export default class Access {
  eventManager: NativeEventEmitter | null = null;

  init (appId: string) {
    RNAccess.instanciate(appId);
    this.eventManager = new NativeEventEmitter(RNAccessEventManager);

    return this;
  }

  config (config: Poool.AccessConfigOptions, readOnly = false) {
    RNAccess.config(config, readOnly);

    return this;
  }

  texts (texts: { [key: string]: string }, readOnly = false) {
    RNAccess.texts(texts, readOnly);

    return this;
  }

  styles (styles: Poool.styles, readOnly = false) {
    RNAccess.styles(styles, readOnly);

    return this;
  }

  variables (variables: { [key: string]: any }) {
    RNAccess.variables(variables);

    return this;
  }

  on (event: Poool.EventsList, callback: (...props: any) => any) {
    this.eventManager?.addListener(
      this._normalizeEventName(event),
      callback,
    );

    return this;
  }

  once (event: Poool.EventsList, callback: (...props: any) => any) {
    this.eventManager?.addListener(
      this._normalizeEventName(event),
      callback,
    );

    return this;
  }

  off (event: Poool.EventsList) {
    this.eventManager?.removeAllListeners(
      this._normalizeEventName(event),
    );

    return this;
  }

  async createPaywall (pageType: PageType, view: number, percent: number) {
    return await RNAccess
      .createPaywall(pageType, findNodeHandle(view) || -1, percent);
  }

  destroy () {
    RNAccess.destroy();
  }

  _normalizeEventName (name: string) {
    name = /^on[A-Z]/.test(name)
      ? name.replace(/^on/, '') : name;

    return name[0]?.toLowerCase() + name.slice(1);
  }
}
