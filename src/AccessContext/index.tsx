import { type ComponentPropsWithoutRef, useCallback, useEffect, useReducer } from 'react';
import { type StateReducer, mockState } from '@junipero/core';

import { type AccessContextValue, AccessContext as Ctx } from '../contexts';
import Access from '../Access';

export interface AccessContextProps extends
  AccessContextValue, ComponentPropsWithoutRef<any> {}

export interface AccessContextState {
  lib?: Access;
}

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  events,
  variables,
  ...rest
}: AccessContextProps) => {
  const [state, dispatch] = useReducer<
    StateReducer<AccessContextState>
  >(mockState, {
    lib: undefined,
  });

  useEffect(() => {
    dispatch({ lib: new Access() });
  }, []);

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    events,
    variables,
    lib: state.lib,
  }), [
    state.lib, appId, config, texts, styles, events, variables,
  ]);

  return (
    <Ctx.Provider value={getContext()} { ...rest} />
  );
};

export default AccessContext;
