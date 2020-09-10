import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import { Button, Linking, View } from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';

import { texts, layouts } from '../styles';

const LinkWidget = ({ data, widget }) => {
  const { onDiscoveryLinkClick, config = {} } = useContext(AppContext);

  const onPress = e => {
    onDiscoveryLinkClick({
      widget: widget,
      button: e?.target,
      originalEvent: e,
      url: config.login_url || data?.config?.link_url,
    });
    Linking.openURL(data?.config?.link_url);
  };

  return (
    <View
      style={layouts.widget}
      testID="linkWidget"
    >
      <Translate
        textKey="link_title"
        style={texts.title}
      />
      <Translate
        textKey="link_desc"
        style={texts.desc}
        replace={{ app_name: true }}
      />
      <Translate
        textKey="link_button"
        asString={true}
      >
        {({ text }) => (
          <Button
            testID="linkButton"
            title={text}
            color={data?.styles?.button_color}
            onPress={onPress}
          />
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout]}>
        { data?.config.login_button_enabled && <LoginLink /> }
        <NoThanksLink />
      </View>
    </View>
  );
};

LinkWidget.propTypes = {
  data: PropTypes.object,
  widget: PropTypes.string,
};

LinkWidget.displayName = 'LinkWidget';

export default LinkWidget;
