import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';

const RestrictedContent = ({ children }, props) => {
  console.log(React.Children.count(children));

  const contextValue = useContext(AppContext);

  if (!contextValue.active) {
    return React.cloneElement(React.Children.only(children));
  } else {
    return null;
  }

};

export default RestrictedContent;
