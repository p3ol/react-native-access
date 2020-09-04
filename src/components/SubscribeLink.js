import React, { useContext } from 'react';
import { Linking } from 'react-native';
import { AppContext } from '../services/contexts';

import Translate from './Translate';
import { texts } from '../styles';

const SubscribeLink = () => {

  const {
    trackData,
    onSubscribeClick,
  } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(trackData?.config?.subscription_url);
    onSubscribeClick({
      widget: trackData?.action,
      button: e?.target,
      originalEvent: e,
      url: trackData?.config?.subscription_url,
    });
  };

  return (
    <Translate
      textKey='subscribe_link'
      testID='subscribeButton'
      style={texts.subaction[trackData?.styles?.layout]}
      onPress={e => onPress(e)}/>
  );
};

export default SubscribeLink;
