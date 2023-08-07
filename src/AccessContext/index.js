import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockState, mergeDeep } from '@junipero/core';

import { AccessContext as Ctx } from '../contexts';
import Access from '../Access';

const AccessContext = ({
  appId,
  config,
  texts,
  styles,
  events,
  variables,
  ...rest
}) => {
  const [state, dispatch] = useReducer(mockState, {
    lib: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    dispatch({ lib: new Access() });
  };

  const createFactory = (opts = {}) => {
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
      .forEach(([event, callback]) => {
        if (callback.once) {
          factory.once(event, callback.callback);
        } else {
          factory.on(event, callback);
        }
      });

    return factory;
  };

  const destroyFactory = factory => {
    if (!factory) {
      return;
    }

    Object.entries(events || {}).forEach(([event, callback]) => {
      factory?.off(event, callback.callback || callback);
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
AccessContext.propTypes = {
  appId: PropTypes.string.isRequired,
  config: PropTypes.object,
  texts: PropTypes.object,
  styles: PropTypes.object,
  events: PropTypes.object,
  variables: PropTypes.object,
};

export default AccessContext;
