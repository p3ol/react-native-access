import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import { track } from '@poool/sdk';

const RestrictedContent = ({ children }) => {

  const contextValue = useContext(AppContext);

  const setRead = async () => {
    await track('premium-read');
  };

  if (!contextValue.active) {
    setRead();
    return React.cloneElement(React.Children.only(children));
  } else {
    return null;
  }

};

export default RestrictedContent;
