import React, { useContext } from 'react';
import { View } from 'react-native';

import { AppContext } from '../services/contexts';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import Translate from './Translate';
import WidgetContent from './WidgetContent';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';
import MainButton from './MainButton';

import { commons, applyStyles } from '../styles';

const GiftWidget = () => {
  const { doRelease, getStyle } = useContext(AppContext);

  return (
    <View testID="giftWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate textKey="gift_title" style={commons.title} />
        <Translate
          textKey="gift_desc"
          style={commons.description}
          replace={{ app_name: true }}
        />
        <MainButton
          text="gift_button"
          onPress={doRelease}
        />
        <View
          style={[
            commons.subActions,
            applyStyles(getStyle('layout') === 'landscape', [
              commons.subActions__landscape,
            ]),
          ]}
        >
          <LoginLink />
          <SubscribeLink />
        </View>
      </WidgetContent>
    </View>
  );
};

GiftWidget.propTypes = {};

GiftWidget.displayName = 'GiftWidget';

export default GiftWidget;
