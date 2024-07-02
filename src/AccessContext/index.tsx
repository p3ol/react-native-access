import type { Poool } from 'poool-access';
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { mockState, mergeDeep } from '@junipero/core';

import type {
  AccessOptionsObject,
  EventCallback,
  EventObjectCallback,
  EventRawCallback,
} from '../types';
import { AccessContext as Ctx } from '../contexts';
import Access from '../Access';

export interface AccessContextProps extends ComponentPropsWithoutRef<any> {
  appId: string;
  config?: Poool.AccessConfigOptions;
  texts?: { [key: string]: string };
  styles?: Poool.styles;
  events?: { [key: string]: (...props: any) => any };
  variables?: { [key: string]: any };
}

interface AccessContextStateContent {
  lib?: Access;
}

type AccessContextState = [
  AccessContextStateContent,
  (state: AccessContextStateContent) => void
];

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  events,
  variables,
  ...rest
}: AccessContextProps) => {
  const [state, dispatch]: AccessContextState = useReducer(mockState, {
    lib: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    dispatch({ lib: new Access() });
  };

  const createFactory = (
    opts: AccessOptionsObject = {},
  ): Access | void => {
    if (!state.lib) {
      return;
    }

    const factory = state.lib
      .init(appId)
      .config(mergeDeep({}, config, opts.config))
      .texts(mergeDeep({}, texts, opts.texts))
      .styles(mergeDeep({}, styles, opts.styles))
      .variables(mergeDeep({}, variables, opts.variables));

    Object
      .entries(events || {})
      .concat(Object.entries(opts.events || {}))
      .forEach(([event, callback]: [string, EventCallback<undefined>]) => {
        if ((callback as EventObjectCallback<undefined>).once) {
          factory.once(
            event as Poool.EventsList,
            (callback as EventObjectCallback<undefined>).callback
          );
        } else {
          factory.on(
            event as Poool.EventsList,
            callback as EventRawCallback<undefined>
          );
        }
      });

    return factory;
  };

  const destroyFactory = (factory: Access) => {
    if (!factory) {
      return;
    }

    Object
      .entries(events || {})
      .forEach(([event]: [string, EventCallback<undefined>]) => {
        factory?.off(event as Poool.EventsList);
      });

    return factory.destroy();
  };

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    events,
    variables,
    lib: state.lib,
    createFactory,
    destroyFactory,
  }), [state.lib]);

  return (
    <Ctx.Provider value={getContext()} { ...rest } />
  );
};

AccessContext.displayName = 'AccessContext';

export default AccessContext;
