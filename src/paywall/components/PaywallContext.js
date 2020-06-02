import React, { useState } from 'react';
import { AppContext } from '../services/contexts';

const PaywallContext = ({ children }) => {

  const [active, setActive] = useState(true);

  return (
    <AppContext.Provider
      value={{ setActive: setActive, active: active }}>
      {children}
    </AppContext.Provider >
  );
};

export default PaywallContext;
