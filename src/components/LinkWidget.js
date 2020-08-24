import React, { useContext } from 'react';
import { AppContext } from '../services/contexts';
import { Button, Linking, View } from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';

import { texts, layouts } from '../styles';

const LinkWidget = ({ data, widget }) => {
  const {
    setAlternative,
    onDiscoveryLinkClick,
    onLoginClick,
    config = {},
  } = useContext(AppContext);

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
            onPress={e => {
              onDiscoveryLinkClick({
                widget: widget,
                button: e?.target,
                originalEvent: e,
                url: config.login_url || data?.config?.link_url,
              });
              Linking.openURL(data?.config?.link_url);
            }}
          />
        )}
      </Translate>
      <View style={layouts.subactions[data?.styles?.layout]}>
        {data?.config.login_button_enabled &&
          <Translate
            textKey="login_link"
            testID="loginButton"
            style={texts.subaction[data?.styles?.layout]}
            onPress={e => {
              Linking.openURL(data?.config?.login_url);
              onLoginClick({
                widget: widget,
                button: e?.target,
                originalEvent: e,
                url: data?.config?.login_url,
              });
            }}
          />
        }
        <Translate
          textKey="no_thanks"
          testID="rejectButton"
          style={texts.subaction[data?.styles?.layout]}
          onPress={() => setAlternative(true)}
        />
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
