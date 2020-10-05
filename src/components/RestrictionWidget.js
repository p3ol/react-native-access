import React, { useContext } from 'react';
import { Linking, View, Text } from 'react-native';
import { Button } from '@poool/junipero-native';

import { AppContext } from '../services/contexts';

import WidgetContent from './WidgetContent';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';

import { texts, layouts } from '../styles';

const RestrictionWidget = () => {
  const {
    action,
    fireEvent,
    getStyle,
    getConfig,
  } = useContext(AppContext);

  const onPress = e => {
    Linking.openURL(getConfig('subscription_url'));
    fireEvent('onSubscribeClick', {
      widget: action,
      button: e?.target,
      originalEvent: e,
      url: getConfig('subscription_url'),
    });
  };

  return (
    <View testID="RestrictionWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate textKey='subscription_title' style={texts.title}/>
        <Translate
          textKey="subscription_desc"
          style={texts.desc}
          replace={{ app_name: true }}
        />
        <Translate textKey="subscription_button" asString={true}>
          { ({ text }) => (
            <Button
              testID="subscribeButton"
              theme="primary"
              // color={getStyle('button_color', '#000A24')}
              onPress={onPress}
            >
              <Text>{ text }</Text>
            </Button>
          ) }
        </Translate>
        <View style={layouts.subactions[getStyle('layout', 'portrait')]}>
          <LoginLink />
          { action === 'subscription' &&
            getConfig('alternative_widget') !== 'none' && (
            <NoThanksLink />
          )}
        </View>
      </WidgetContent>
    </View>
  );
};

RestrictionWidget.propTypes = {};

RestrictionWidget.displayName = 'RestrictionWidget';

export default RestrictionWidget;
