import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import Signature from './Signature';

const RestrictedContent = ({ children }) => {

  const { active, trackData } = useContext(AppContext);

  if (!active) {
    return (
      <React.Fragment>
        { React.cloneElement(React.Children.only(children))}
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
