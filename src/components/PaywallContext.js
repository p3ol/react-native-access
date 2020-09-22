import React, { useReducer, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';

const PaywallContext = forwardRef(({
  children,
  onAlternativeClick = () => {},
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
      available_widgets: [
        'restriction',
        'form',
        'gift',
        'link',
        'newsletter',
        'question',
      ],
      login_button_enabled: true,
      alternative_enabled: true,
      alternative_widget: 'gift',
      signature_enabled: true,
      locale: 'fr',
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
        onAlternativeClick,
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
  onAlternativeClick: PropTypes.func,
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
