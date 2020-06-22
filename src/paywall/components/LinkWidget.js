import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import {
  View,
  Image,
  Button,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';
import { defaultStyles } from '../theme/styles';

const LinkWidget = ({ data, widget }) => {
  const {
    setAlternative,
    onDiscoveryLinkClick,
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
        source={{ uri: data?.styles?.brand_logo }}
      />
      <Translate
        textKey={'link_title'}
        style={defaultStyles.title}
      />
      <Translate
        textKey={'link_desc'}
        style={defaultStyles.text}
        replace={{ app_name: true }}
      />
      <Translate
        textKey={'link_button'}
        asString={true}
      >
        {({ text }) => (
          <Button
            testID="linkButton"
            title={text}
            style={defaultStyles.actions}
            color={data?.styles?.button_color}
            onPress={e => {
              onDiscoveryLinkClick(
                widget,
                e?.target,
                config.login_url || data?.config.link_url
              );
              data?.config.link_url
                ? Linking.openURL(config.login_url || data?.config.link_url)
                : console.warn(
                  'No link_url config value has been provided, cannot open url'
                );
            }}
          />
        )}
      </Translate>
      <View style={defaultStyles.subactions_container}>
        {data?.config.login_button_enabled &&
          <Translate
            textKey={'login_link'}
            testID="loginButton"
            style={defaultStyles.subaction}
            onPress={e => {
              Linking.openURL(data?.config.login_url);
              onLoginClick(
                widget,
                e?.target,
                data?.config?.login_url
              );
            }}
          />
        }
        <Translate
          textKey={'no_thanks'}
          testID="rejectButton"
          style={defaultStyles.subaction}
          onPress={() => setAlternative(true)}
        />
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
