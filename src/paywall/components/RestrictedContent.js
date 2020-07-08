import React, { useContext, useEffect } from 'react';
import { AppContext } from '../services/contexts';
import Signature from './Signature';

const RestrictedContent = ({ children }) => {

  const { active, trackData, onLock } = useContext(AppContext);

  useEffect(() => {
    onLock();
  }, []);

  if (!active) {
    return (
      <React.Fragment>
        { children }
        { trackData?.action === 'invisible'
          ? trackData?.config?.signature_enabled
            ? <Signature />
            : null
          : <Signature />
        }
      </React.Fragment>
    );
  } else {
    return null;
  }

};

export default RestrictedContent;
