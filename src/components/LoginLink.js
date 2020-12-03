import React, { useContext } from 'react';
import { Linking } from 'react-native';

import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { commons, applyStyles } from '../styles';

const LoginLink = () => {
  const { getConfig, action, fireEvent, getStyle } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(getConfig('login_url'));
    fireEvent('onLoginClick', {
      widget: action,
      button: 'login_button',
      originalEvent: e,
      url: getConfig('login_url'),
    });
  };

  return (
    <Translate
      textKey="login_link"
      testID="loginButton"
      style={[
        commons.link,
        styles.link,
        applyStyles(getStyle('layout') === 'landscape', [
          commons.link__landscape,
          styles.link__landscape,
        ]),
      ]}
      onPress={onPress}
    />
  );
};

const styles = {
  link: {},
  link__landscape: {
    flex: 0.5,
  },
};

LoginLink.propTypes = {};

LoginLink.displayName = 'LoginLink';

export default LoginLink;
