import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import {
  View,
  Button,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';

import { texts, layouts } from '../styles';

const GiftWidget = ({ data, release, widget }) => {
  const { onSubscribeClick, onLoginClick, onRelease } = useContext(AppContext);

  return (
    <View
      style={layouts.widget}
      testID='giftWidget'
    >
      <Translate
        textKey='gift_title'
        style={texts.title}
      />
      <Translate
        testID='description'
        textKey='gift_desc'
        style={texts.desc}
        replace={{ app_name: true }}
      />
      <Translate textKey='gift_button' asString={true}>
        {({ text }) => (
          <Button
            testID='releaseButton'
            title={text}
            color={data?.styles.button_color}
            onPress={() => {
              onRelease({
                widget: data?.action,
                actionName: data?.actionName,
              });
              release();
            }}
          />
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout]}>
        <Translate
          textKey='login_link'
          testID='loginButton'
          style={texts.subaction[data?.styles?.layout]}
          onPress={e => {
            Linking.openURL(data?.config.login_url);
            onLoginClick({
              widget: widget,
              button: e?.target,
              originalEvent: e,
              url: data?.config.login_url,
            });
          }}
        />
        <Translate
          textKey='subscribe_link'
          testID='subscribeButton'
          style={texts.subaction[data?.styles?.layout]}
          onPress={e => {
            Linking.openURL(data?.config.subscription_url);
            onSubscribeClick({
              widget: widget,
              button: e?.target,
              originalEvent: e,
              url: data?.config.login_url,
            });
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
