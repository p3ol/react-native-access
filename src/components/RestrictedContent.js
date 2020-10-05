import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import Signature from './Signature';

const RestrictedContent = ({ children }) => {
  const { released, trackData } = useContext(AppContext);

  if (!released) {
    return null;
  }

  return (
    <>
      { children }
      { trackData?.config?.signature_enabled && <Signature /> }
    </>
  );

};

export default RestrictedContent;
