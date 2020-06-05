import React, { useState } from 'react';
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

export default PaywallContext;
