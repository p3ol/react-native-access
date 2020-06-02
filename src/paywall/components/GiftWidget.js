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

const GiftWidget = (props) => {

  const contextValue = useContext(AppContext);

  return (
    <View style={defaultStyles.p3_container}>
      <Image
        style={defaultStyles.p3_logo}
        source={props.data.styles.brand_logo}
      />
      <Text style={defaultStyles.p3_title}>
        Besoin de lire cet article {'\n'}
        réservé aux abonnés ?
      </Text>
      <Text style={defaultStyles.p3_text}>
        {props.data.texts.gift_desc}
      </Text>
      <Button
        title="Merci, je profite de cet article offert !"
        style={defaultStyles.p3_actions}
        color={props.data.styles.button_color}
        onPress={() => contextValue.setActive(false)}
      />
      <View style={defaultStyles.p3_subactions_container}>
        <Text
          style={defaultStyles.p3_subaction}
          onPress={() => Linking.openURL(props.data.config.login_url)}>
          Je me connecte
        </Text>
        <Text
          style={defaultStyles.p3_subaction}
          onPress={() => Linking.openURL(props.data.config.subscription_url)}>
          Je m&apos;abonne
        </Text>
      </View>
    </View>
  );
};

export default GiftWidget;
