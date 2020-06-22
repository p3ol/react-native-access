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

const GiftWidget = ({ data, release, widget }) => {
  const { onSubscribeClick, onLoginClick, onRelease } = useContext(AppContext);

  return (
    <View
      style={defaultStyles.container}
      testID="giftWidget"
    >
      <Image
        style={defaultStyles.logo}
        source={{ uri: data?.styles.brand_logo }}
      />
      <Translate
        textKey={'gift_title'}
        style={defaultStyles.title}
      />
      <Translate
        textKey={'gift_desc'}
        style={defaultStyles.text}
        replace={{ app_name: true }}
      />
      <Translate textKey={'gift_button'} asString={true}>
        {({ text }) => (
          <Button
            testID="releaseButton"
            title={text}
            style={defaultStyles.actions}
            color={data?.styles.button_color}
            onPress={() => {
              onRelease();
              release();
            }}
          />
        )}
      </Translate>
      <View style={defaultStyles.subactions_container}>
        <Translate
          textKey={'login_link'}
          testID="loginButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data?.config.login_url);
            onLoginClick(
              widget,
              e?.target,
              data?.config.login_url
            );
          }}
        />
        <Translate
          textKey={'subscribe_link'}
          testID="subscribeButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data?.config.subscription_url);
            onSubscribeClick(
              widget,
              e?.target,
              data?.config.subscription_url
            );
          }}
        />
      </View>
    </View>
  );
};

GiftWidget.propTypes = {
  data: PropTypes.object,
  release: PropTypes.func,
  widget: PropTypes.string,
};

GiftWidget.displayName = 'GiftWidget';

export default GiftWidget;
