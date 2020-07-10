import React, { useContext } from 'react';
import {
  View,
  Text,
  Linking,
} from 'react-native';

import Translate from './Translate';
import { AppContext } from '../services/contexts';

import { texts } from '../styles';

const Signature = () => {

  const { trackData, onSubscribeClick } = useContext(AppContext);

  return (
    <View style={{ marginTop: 25 }} testID='signature'>
      <Text >
        <Translate
          style={texts.text}
          textKey='signature'
          replace={{ app_name: true }}
        />
        <Translate
          style={texts.signatureLink}
          textKey='signature_button'
          testID='signatureButton'
          onPress={e => {
            Linking.openURL(trackData?.config?.subscription_url);
            onSubscribeClick({
              widget: trackData?.action,
              button: e?.target,
              originalEvent: e,
              url: trackData?.config?.login_url,
            });
          }}
        />
      </Text>
    </View>
  );
};

Signature.displayName = 'Signature';

export default Signature;
