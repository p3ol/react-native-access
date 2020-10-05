import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';

const Switch = ({ children, action }) => {
  const { ready, action: action_ } = useContext(AppContext);

  return ready && React.Children.map(children, c =>
    !c.props.name || c.props.name === (action || action_) ? c : null
  )[0];
};

Switch.propTypes = {
  action: PropTypes.string,
};

Switch.displayName = 'Switch';

export default Switch;
