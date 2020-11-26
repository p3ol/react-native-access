import React, { useContext } from 'react';
import { Linking } from 'react-native';

import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { commons, applyStyles } from '../styles';

const SubscribeLink = () => {
  const { getConfig, action, fireEvent, getStyle } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(getConfig('subscription_url'));
    fireEvent('onSubscribeClick', {
      widget: action,
      button: 'subscribe_link',
      originalEvent: e,
      url: getConfig('subscription_url'),
    });
  };

  return (
    <Translate
      textKey="subscribe_link"
      testID="subscribeButton"
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

SubscribeLink.propTypes = {};

SubscribeLink.displayName = 'SubscribeLink';

export default SubscribeLink;
