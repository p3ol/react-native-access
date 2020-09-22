import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';

import { texts, layouts } from '../styles';

const GiftWidget = ({ data, release }) => {
  const { onRelease } = useContext(AppContext);

  const onPress = () => {
    onRelease({
      widget: data?.action,
      actionName: data?.actionName,
    });
    release();
  };

  return (
    <View
      style={layouts.widget}
      testID="giftWidget"
    >
      <Translate
        textKey="gift_title"
        style={texts.title}
      />
      <Translate
        testID="description"
        textKey="gift_desc"
        style={texts.desc}
        replace={{ app_name: true }}
      />
      <Translate textKey="gift_button" asString={true}>
        {({ text }) => (
          <Button
            testID="releaseButton"
            title={text}
            color={data?.styles.button_color}
            onPress={onPress}
          />
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout]}>
        <LoginLink />
        <SubscribeLink />
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
