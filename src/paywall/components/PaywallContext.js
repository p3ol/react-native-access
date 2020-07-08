import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';

const PaywallContext = forwardRef(({
  children,
  onDisabled = () => {},
  onDataPolicyClick = () => {},
  onDiscoveryLinkClick = () => {},
  onError = () => {},
  onFormSubmit = () => {},
  onIdentityAvailable = () => {},
  onLock = () => {},
  onReady = () => {},
  onRegister = () => {},
  onRelease = () => {},
  onSubscribeClick = () => {},
  onLoginClick = () => {},
}, ref) => {

  const [state, dispatch] = useReducer(mockState, {
    active: true,
    alternative: false,
    trackData: null,
    config: {
      alternative_widget: null,
      // TODO: add a way to modify config by passing it to props
    },
  });

  useImperativeHandle(ref, () => ({
    alternative: state.alternative,
    active: state.active,
  }));

  return (
    <AppContext.Provider
      value={{
        setActive: active => dispatch({ active }),
        setAlternative: alternative => dispatch({ alternative }),
        updateContext: dispatch,
        trackData: state.trackData,
        active: state.active,
        config: state.config,
        alternative: state.alternative,
        onLock,
        onDisabled,
        onDataPolicyClick,
        onDiscoveryLinkClick,
        onError,
        onFormSubmit,
        onIdentityAvailable,
        onReady,
        onRegister,
        onRelease,
        onSubscribeClick,
        onLoginClick,
      }}
    >
      { children }
    </AppContext.Provider>
  );
});

PaywallContext.propTypes = {
  children: PropTypes.array,
  onDisabled: PropTypes.func,
  onDataPolicyClick: PropTypes.func,
  onDiscoveryLinkClick: PropTypes.func,
  onError: PropTypes.func,
  onFormSubmit: PropTypes.func,
  onIdentityAvailable: PropTypes.func,
  onLock: PropTypes.func,
  onReady: PropTypes.func,
  onRegister: PropTypes.func,
  onRelease: PropTypes.func,
  onSubscribeClick: PropTypes.func,
  onLoginClick: PropTypes.func,
};

PaywallContext.displayName = 'PaywallContext';

export default PaywallContext;
