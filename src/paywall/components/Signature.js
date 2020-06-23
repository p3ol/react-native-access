import React, { useContext } from 'react';
import {
  View,
  Text,
  Linking,
} from 'react-native';

import { defaultStyles } from '../theme/styles';
import Translate from './Translate';
import { AppContext } from '../services/contexts';

const Signature = () => {

  const { trackData, onSubscribeClick } = useContext(AppContext);

  return (
    <View style={defaultStyles.signatureView} testID={'signature'}>
      <Text >
        <Translate
          style={defaultStyles.signatureText}
          textKey="signature"
          replace={{ app_name: true }}
        />
        <Translate
          style={defaultStyles.signatureLink}
          textKey="signature_button"
          testID="signatureButton"
          onPress={() => {
            Linking.openURL(trackData?.config?.subscription_url);
            onSubscribeClick();
          }}
        />
      </Text>
    </View>
  );
};

Signature.displayName = 'Signature';

export default Signature;
