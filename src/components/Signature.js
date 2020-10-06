import React, { useContext } from 'react';
import { Linking, Text, TouchableWithoutFeedback, View } from 'react-native';

import Translate from './Translate';

import { AppContext } from '../services/contexts';

import { commons } from '../styles';

const Signature = () => {
  const { getConfig, action, fireEvent } = useContext(AppContext);

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
    <View
      style={styles.signature}
      testID="Signature"
    >
      <Text>
        <Text style={commons.text}>
          <Translate
            textKey="signature"
            replace={{ app_name: true }}
          />
        </Text>
        { ' ' }
        <Text style={[commons.text, commons.link]}>
          <Translate
            textKey="signature_button"
            testID="signatureButton"
            tag={TouchableWithoutFeedback}
            onPress={onPress}
          />
        </Text>
      </Text>
    </View>
  );
};

const styles = {
  signature: {
    marginVertical: 20,
  },
};

Signature.propTypes = {};

Signature.displayName = 'Signature';

export default Signature;
