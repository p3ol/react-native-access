import React, { useContext } from 'react';
import { Linking, Text, TouchableWithoutFeedback, View } from 'react-native';

import Translate from './Translate';

import { AppContext } from '../services/contexts';

import { texts, layouts } from '../styles';

const Signature = () => {

  const { trackData, onSubscribeClick } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(trackData?.config?.subscription_url || '');
    onSubscribeClick({
      widget: trackData?.action,
      button: e?.target,
      originalEvent: e,
      url: trackData?.config?.subscription_url,
    });
  };

  return (
    <View style={ layouts.largeSpacing } testID="signature">
      <Text >
        <Translate
          style={texts.text}
          textKey="signature"
          replace={{ app_name: true }}
        />
        <Translate
          style={texts.signatureLink}
          textKey="signature_button"
          testID="signatureButton"
          tag={TouchableWithoutFeedback}
          onPress={onPress}
        />
      </Text>
    </View>
  );
};

Signature.displayName = 'Signature';

export default Signature;
