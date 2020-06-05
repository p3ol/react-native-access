import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  Linking,
} from 'react-native';

import { defaultStyles } from '../theme/styles';

const GiftWidget = ({ data, widget }) => {

  const { setActive, onSubscribeClick, onLoginClick } = useContext(AppContext);

  return (
    <View style={defaultStyles.p3_container}>
      <Image
        style={defaultStyles.p3_logo}
        source={data.styles.brand_logo}
      />
      <Text style={defaultStyles.p3_title}>
        Besoin de lire cet article {'\n'}
        réservé aux abonnés ?
      </Text>
      <Text style={defaultStyles.p3_text}>
        {data.texts.gift_desc}
      </Text>
      <Button
        title="Merci, je profite de cet article offert !"
        style={defaultStyles.p3_actions}
        color={data.styles.button_color}
        onPress={() => setActive(false)}
      />
      <View style={defaultStyles.p3_subactions_container}>
        <Text
          style={defaultStyles.p3_subaction}
          onPress={(e) => {
            Linking.openURL(data.config.login_url);
            onLoginClick(
              widget,
              e.target,
              data.config.login_url
            );
          }}>
          Je me connecte
        </Text>
        <Text
          style={defaultStyles.p3_subaction}
          onPress={(e) => {
            Linking.openURL(data.config.subscription_url);
            onSubscribeClick(
              widget,
              e.target,
              data.config.subscription_url
            );
          }}>
          Je m&apos;abonne
        </Text>
      </View>
    </View>
  );
};

export default GiftWidget;
