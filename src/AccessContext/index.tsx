import { type ComponentPropsWithoutRef, useCallback, useReducer } from 'react';
import { type StateReducer, mockState } from '@junipero/core';

import { type AccessContextValue, AccessContext as Ctx } from '../contexts';

export interface AccessContextProps extends
  AccessContextValue, ComponentPropsWithoutRef<any> {}

export interface AccessContextState {
  released?: (string | boolean)[];
}

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  variables,
  ...rest
}: AccessContextProps) => {
  const [state, dispatch] = useReducer<
    StateReducer<AccessContextState>
  >(mockState, {
    released: [],
  });

  const releaseContent = useCallback((id: string) => {
    dispatch(s => ({ released: [...(s.released || []), id] }));
  }, []);

  const getContext = useCallback(() => ({
    appId,
    config,
    texts,
    styles,
    variables,
    released: state.released,
    releaseContent,
  }), [
    appId, config, texts, styles, variables,
    state.released,
    releaseContent,
  ]);

  return (
    <Ctx.Provider value={getContext()} { ...rest} />
  );
};

AccessContext.displayName = 'AccessContext';

export default AccessContext;
