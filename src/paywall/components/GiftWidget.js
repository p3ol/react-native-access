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
        color="#000A24"
        onPress={() => contextValue.setActive(false)}
      />
      <Text
        style={defaultStyles.p3_subactions}
        onPress={() => Linking.openURL(props.data.config.login_url)}>
        Je me connecte
      </Text>
    </View>
  );
};

export default GiftWidget;
