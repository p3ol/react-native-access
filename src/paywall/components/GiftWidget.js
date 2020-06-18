import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import {
  View,
  Image,
  Text,
  Button,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { defaultStyles } from '../theme/styles';

const GiftWidget = ({ data, widget }) => {
  const { onRelease, onSubscribeClick, onLoginClick } = useContext(AppContext);

  return (
    <View
      style={defaultStyles.container}
      testID="giftWidget"
    >
      <Image
        style={defaultStyles.logo}
        source={{ uri: data?.styles.brand_logo }}
      />
      <Text style={defaultStyles.title}>
        Besoin de lire cet article {'\n'}
        réservé aux abonnés ?
      </Text>
      <Text style={defaultStyles.text}>
        {data?.texts.gift_desc}
      </Text>
      <Button
        testID="releaseButton"
        title="Merci, je profite de cet article offert !"
        style={defaultStyles.actions}
        color={data?.styles.button_color}
        onPress={() => {
          onRelease();
        }}
      />
      <View style={defaultStyles.subactions_container}>
        <Text
          testID="loginButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data?.config.login_url);
            onLoginClick(
              widget,
              e?.target,
              data?.config.login_url
            );
          }}>
          Je me connecte
        </Text>
        <Text
          testID="subscribeButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data?.config.subscription_url);
            onSubscribeClick(
              widget,
              e?.target,
              data?.config.subscription_url
            );
          }}>
          Je m&apos;abonne
        </Text>
      </View>
    </View>
  );
};

GiftWidget.propTypes = {
  data: PropTypes.object,
  widget: PropTypes.string,
};

GiftWidget.displayName = 'GiftWidget';

export default GiftWidget;
