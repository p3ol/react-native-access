import React, { useContext } from 'react';
import { Linking } from 'react-native';
import { AppContext } from '../services/contexts';

import Translate from './Translate';
import { texts } from '../styles';

const LoginLink = () => {

  const {
    trackData,
    onLoginClick,
  } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(trackData?.config?.login_url);
    onLoginClick({
      widget: trackData?.action,
      button: e?.target,
      originalEvent: e,
      url: trackData?.config?.login_url,
    });
  };

  return (
    <Translate
      textKey="login_link"
      testID="loginButton"
      style={texts.subaction[trackData?.styles?.layout]}
      onPress={e => onPress(e)}
    />
  );
};

export default LoginLink;
