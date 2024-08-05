import { type ComponentPropsWithoutRef, useCallback, useEffect, useReducer } from 'react';
import { type StateReducer, mockState } from '@junipero/core';

import { type AccessContextValue, AccessContext as Ctx } from '../contexts';
import Access from '../Access';

export interface AccessContextProps extends
  AccessContextValue, ComponentPropsWithoutRef<any> {}

export interface AccessContextState {
  lib?: Access;
  released?: (string | boolean)[];
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
    released: [],
  });

  useEffect(() => {
    dispatch({ lib: new Access() });
  }, []);

  const releaseContent = useCallback((id: string) => {
    dispatch(s => ({ released: [...(s.released || []), id] }));
  }, []);

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    events,
    variables,
    lib: state.lib,
    released: state.released,
    releaseContent,
  }), [
    appId, config, texts, styles, events, variables,
    state.lib, state.released,
    releaseContent,
  ]);

  return (
    <Ctx.Provider value={getContext()} { ...rest} />
  );
};

export default AccessContext;
