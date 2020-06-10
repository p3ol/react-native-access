import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../services/contexts';

const PaywallContext = ({
  children,
  onLock,
  onRelease,
  onSubscribeClick,
  onLoginClick,
}) => {

  const [active, setActive] = useState(true);

  return (
    <AppContext.Provider
      value={{
        setActive: setActive,
        active: active,
        onLock: onLock,
        onRelease: onRelease,
        onSubscribeClick: onSubscribeClick,
        onLoginClick: onLoginClick,
      }}>
      {children}
    </AppContext.Provider >
  );
};

PaywallContext.propTypes = {
  children: PropTypes.array,
  onLock: PropTypes.func,
  onRelease: PropTypes.func,
  onSubscribeClick: PropTypes.func,
  onLoginClick: PropTypes.func,
};

PaywallContext.displayName = 'PaywallContext';

export default PaywallContext;
