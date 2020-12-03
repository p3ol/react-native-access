import React, { useContext } from 'react';

import { AppContext } from '../services/contexts';
import Signature from './Signature';

const RestrictedContent = ({ children }) => {
  const { released, getConfig } = useContext(AppContext);

  if (!released) {
    return null;
  }

  return (
    <>
      { children }
      { getConfig('signature_enabled') !== false && <Signature /> }
    </>
  );

};

export default RestrictedContent;
