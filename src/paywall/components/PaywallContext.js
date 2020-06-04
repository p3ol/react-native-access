import React, { useState } from 'react';
import { AppContext } from '../services/contexts';

const PaywallContext = ({
  children,
  onLock,
  onRelease,
  onReady,
  onHidden
}) => {

  const [active, setActive] = useState(true);
  return (
    <AppContext.Provider
      value={{
        setActive: setActive,
        active: active,
        onLock: onLock,
        onRelease: onRelease,
        onReady: onReady,
        onHidden: onHidden,
      }}>
      {children}
    </AppContext.Provider >
  );
};

export default PaywallContext;
