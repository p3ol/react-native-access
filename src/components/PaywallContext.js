import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { get } from '@poool/junipero-utils';

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
    events[name.toLowerCase()]?.(...args);
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
    appId,
    config,
    styles,
    texts,
    events,
    flush,
    doRelease,
  });

  const getStyle = (key, def) =>
    get(state.trackData?.styles, key, get(styles, key, def));

  const getConfig = (key, def) =>
    get(state.trackData?.config, key, get(config, key, def));

  const flush = () => {
    dispatch({
      trackData: null,
      ready: false,
      released: false,
      action: 'disabled',
      originalAction: 'restriction',
    });
  };

  const doRelease = () => {
    dispatch({ released: true });
    fireEvent('onRelease', {
      widget: state.action,
      actionName: state.trackData?.actionName,
    });
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
