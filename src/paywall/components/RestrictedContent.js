import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';

const RestrictedContent = ({ children }) => {

  const { active } = useContext(AppContext);

  if (!active) {
    return React.cloneElement(React.Children.only(children));
  } else {
    return null;
  }

};

export default RestrictedContent;
