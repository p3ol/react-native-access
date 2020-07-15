import React, { useContext } from 'react';
import {
  View,
  Button,
  Linking,
} from 'react-native';

import PropTypes from 'prop-types';
import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { texts, layouts } from '../styles';

const RestrictionWidget = ({ data, widget }) => {

  const { onSubscribeClick, onLoginClick } = useContext(AppContext);

  return (

    <View
      style={layouts.widget}
      testID='RestrictionWidget'
    >

      <Translate textKey='subscription_title' style={texts.title}/>
      <Translate
        textKey='subscription_desc'
        style={texts.desc}
        replace={{ app_name: true }}
      />
      <Translate
        textKey='subscription_button'
        asString
      >
        {({ text }) => (
          <Button
            testID='subscribeButton'
            title={text}
            color='#000A24'
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
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout]}>
        <Translate
          testID='loginButton'
          style={texts.subaction[data?.styles?.layout]}
          textKey='login_link'
          replace={{ app_name: true }}
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
      </View>
    </View>

  );
};

RestrictionWidget.propTypes = {
  data: PropTypes.object,
  widget: PropTypes.string,
};

RestrictionWidget.displayName = 'RestrictionWidget';

export default RestrictionWidget;
