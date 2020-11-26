import React, { useContext } from 'react';
import { Linking, View } from 'react-native';

import { AppContext } from '../services/contexts';
import WidgetContent from './WidgetContent';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';
import MainButton from './MainButton';
import { commons, applyStyles } from '../styles';

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
      button: 'subscribe_link',
      originalEvent: e,
      url: getConfig('subscription_url'),
    });
  };

  return (
    <View testID="RestrictionWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate textKey='subscription_title' style={commons.title}/>
        <Translate
          textKey="subscription_desc"
          style={commons.description}
          replace={{ app_name: true }}
        />
        <MainButton
          text="subscription_button"
          onPress={onPress}
        />
        <View
          style={[
            commons.subActions,
            applyStyles(getStyle('layout') === 'landscape', [
              commons.subActions__landscape,
            ]),
          ]}
        >
          { getConfig('login_button_enabled') !== false && <LoginLink /> }
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
