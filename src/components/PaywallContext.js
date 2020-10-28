import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { get } from '@poool/junipero-utils';
import { track } from '@poool/sdk';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';

const PaywallContext = forwardRef(({
  appId,
  config = {},
  styles = {},
  texts = {},
  events = {},
  children,
}, ref) => {
  const [state, dispatch] = useReducer(mockState, {
    released: false,
    ready: false,
    trackData: null,
    action: 'disabled',
    originalAction: 'restriction',
  });

  useImperativeHandle(ref, () => ({
    released: state.released,
  }));

  const fireEvent = (name, ...args) => {
    name = /^on/.test(name) ? name : `on${name}`;
    return events[name.toLowerCase()]?.(...args);
  };

  const getContext = () => ({
    released: state.released,
    trackData: state.trackData,
    ready: state.ready,
    update: dispatch,
    action: state.action,
    originalAction: state.action,
    fireEvent,
    getStyle,
    getConfig,
    getText,
    appId,
    config,
    styles,
    texts,
    events,
    flush,
    doRelease,
    setAlternative,
  });

  const getStyle = (key, def) =>
    get(state.trackData?.styles, key) || get(styles, key, def);

  const getConfig = (key, def) =>
    get(state.trackData?.config, key) || get(config, key, def);

  const getText = (key, def) =>
    get(state.trackData?.texts, key) || get(texts, key, def);

  const flush = () => {
    dispatch({
      trackData: null,
      ready: false,
      released: false,
      action: 'disabled',
      originalAction: 'restriction',
    });
  };

  const doRelease = async () => {
    dispatch({ released: true });

    await track('premium-read', {
      widget: state.action,
      hit: state.trackData?.hit,
    });

    fireEvent('onRelease', {
      widget: state.action,
      actionName: state.trackData?.actionName,
    });
  };

  const setAlternative = () => {
    dispatch({ action: getConfig('alternative_widget') || state.action });
  };

  return (
    <AppContext.Provider value={getContext()}>
      { children }
    </AppContext.Provider>
  );
});

PaywallContext.propTypes = {
  children: PropTypes.array,
  appId: PropTypes.string,
  config: PropTypes.object,
  styles: PropTypes.object,
  texts: PropTypes.object,
  events: PropTypes.object,
};

PaywallContext.displayName = 'PaywallContext';

export default PaywallContext;
