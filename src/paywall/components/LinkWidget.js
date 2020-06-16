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
  const {
    setAlternative,
    onLoginClick,
    config = {},
  } = useContext(AppContext);
  return (
    <View
      style={defaultStyles.container}
      testID="giftWidget"
    >
      <Image
        style={defaultStyles.logo}
        source={{ uri: data.styles.brand_logo }}
      />
      <Text style={defaultStyles.title}>
        {data.texts.link_title ||
        'Cet article est réservé aux abonnés.'}
      </Text>
      <Text style={defaultStyles.text}>
        {data.texts.link_desc ||
        ` ${data.config.app_name} vous suggère de
        vous rendre sur la page Web suivante.`}
      </Text>
      <Button
        testID="mainButton"
        title={data.texts.link_button || 'Visiter la page'}
        style={defaultStyles.actions}
        color={data.styles.button_color}
        onPress={() =>
          data.config.link_url
            ? Linking.openURL(config.login_url || data.config.link_url)
            : console.warn(
              'No link_url config value has been provided, cannot open url'
            )
        }
      />
      <View style={defaultStyles.subactions_container}>
        {data.config.login_button_enabled &&
          <Text
            testID="loginButton"
            style={defaultStyles.subaction}
            onPress={e => {
              Linking.openURL(data.config.login_url);
              onLoginClick(
                widget,
                e?.target,
                data.config.login_url
              );
            }}>
            Je me connecte
          </Text>
        }
        <Text
          testID="subscribeButton"
          style={defaultStyles.subaction}
          onPress={() =>
            setAlternative(true)
          }>
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
