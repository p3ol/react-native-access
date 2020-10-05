import React, { useContext } from 'react';
import { View } from 'react-native';
import { Button } from '@poool/junipero-native';

import { AppContext } from '../services/contexts';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import Translate from './Translate';
import WidgetContent from './WidgetContent';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';

import { commons, overrides, applyStyles } from '../styles';

const GiftWidget = () => {
  const { doRelease, getStyle } = useContext(AppContext);

  const onPress = () => {
    doRelease();
  };

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
        <Translate textKey="gift_button" asString={true}>
          { ({ text }) => (
            <Button
              testID="releaseButton"
              theme="primary"
              onPress={onPress}
              customStyle={{
                button: [
                  styles.button,
                  applyStyles(!!getStyle('button_color'), [
                    overrides.backgroundColor(getStyle('button_color')),
                  ]),
                ],
              }}
            >
              { text }
            </Button>
          ) }
        </Translate>
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

const styles = {
  button: {
    textAlign: 'center',
  },
};

GiftWidget.propTypes = {};

GiftWidget.displayName = 'GiftWidget';

export default GiftWidget;
