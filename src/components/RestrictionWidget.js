import React, { useContext } from 'react';
import { Button, Linking, View } from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';

import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';

import { texts, layouts } from '../styles';

const RestrictionWidget = ({ data, widget }) => {

  const { onSubscribeClick } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(data?.config?.subscription_url);
    onSubscribeClick({
      widget: widget,
      button: e?.target,
      originalEvent: e,
      url: data?.config?.subscription_url,
    });
  };

  return (
    <View
      style={layouts.widget}
      testID="RestrictionWidget"
    >
      <Translate textKey='subscription_title' style={texts.title}/>
      <Translate
        textKey="subscription_desc"
        style={texts.desc}
        replace={{ app_name: true }}
      />
      <Translate
        textKey="subscription_button"
        asString
      >
        {({ text }) => (
          <Button
            testID="subscribeButton"
            title={text}
            color={data?.styles?.button_color || '#000A24'}
            onPress={e => onPress(e)}
          />
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout || 'portrait']}>
        <LoginLink />
        { data &&
          data?.action === 'subscription' &&
          data?.config?.alternative_widget !== 'none' && (
          <NoThanksLink />
        )}
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
