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

const LinkWidget = ({ data, widget }) => {
  const { onSubscribeClick, onLoginClick } = useContext(AppContext);

  return (
    <View
      style={defaultStyles.p3_container}
      testID="giftWidget"
    >
      <Image
        style={defaultStyles.p3_logo}
        source={{ uri: data.styles.brand_logo }}
      />
      <Text style={defaultStyles.p3_title}>
        Besoin de lire cet article {'\n'}
        réservé aux abonnés ?
      </Text>
      <Text style={defaultStyles.p3_text}>
        {data.config.app_name} vous suggère de vous rendre
        sur la page Web suivante.
      </Text>
      <Button
        testID="mainButton"
        title="Visiter la page"
        style={defaultStyles.p3_actions}
        color={data.styles.button_color}
        onPress={() =>
          data.config.link_url
            ? Linking.openURL(data.config.link_url)
            : console.warn(
              'No link_url config value has been provided, cannot open url'
            )
        }
      />
      <View style={defaultStyles.p3_subactions_container}>
        <Text
          testID="loginButton"
          style={defaultStyles.p3_subaction}
          onPress={(e) => {
            Linking.openURL(data.config.login_url);
            onLoginClick(
              widget,
              e?.target,
              data.config.login_url
            );
          }}>
          Je me connecte
        </Text>
        <Text
          testID="subscribeButton"
          style={defaultStyles.p3_subaction}
          onPress={() => {
            //TODO: add alternative widget display on Click
          }}>
          Non, merci
        </Text>
      </View>
    </View>
  );
};

LinkWidget.propTypes = {
  data: PropTypes.object,
  widget: PropTypes.string,
};

LinkWidget.displayName = 'LinkWidget';

export default LinkWidget;
