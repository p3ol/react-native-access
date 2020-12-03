import React, { useContext } from 'react';
import { Linking, View } from 'react-native';

import { AppContext } from '../services/contexts';
import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import WidgetContent from './WidgetContent';
import MainButton from './MainButton';

import { commons, applyStyles } from '../styles';

const LinkWidget = () => {
  const { fireEvent, action, getConfig, getStyle } = useContext(AppContext);

  const onPress = e => {
    fireEvent('onDiscoveryLinkClick', {
      widget: action,
      button: 'link_button',
      originalEvent: e,
      url: getConfig('link_url'),
    });
    Linking.openURL(getConfig('link_url') || '');
  };

  return (
    <View testID="LinkWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate
          textKey="link_title"
          style={commons.title}
        />
        <Translate
          textKey="link_desc"
          style={commons.description}
          replace={{ app_name: true }}
        />
        <MainButton
          text="link_button"
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
          { getConfig('alternative_widget') !== 'none' && <NoThanksLink /> }
        </View>
      </WidgetContent>
    </View>
  );
};

LinkWidget.propTypes = {};

LinkWidget.displayName = 'LinkWidget';

export default LinkWidget;
