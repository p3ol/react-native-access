import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';
import { AppContext } from '../services/contexts';

import { defaultStyles } from '../theme/styles';

const RestrictionWidget = ({ data, widget }) => {

  const { onSubscribeClick, onLoginClick } = useContext(AppContext);

  return (

    <View
      style={defaultStyles.container}
      testID="RestrictionWidget"
    >
      <Text style={defaultStyles.title}>
        Cet article est reservé aux abonnés.
      </Text>
      <Text style={defaultStyles.text}>
        Pour profiter pleinement de l&apos;ensemble de ses articles,
        {'\n'} Test vous propose de découvrir ses offres d&apos;abonnement.
      </Text>
      <Button
        testID="subscribeButton"
        title="Découvrir les offres"
        style={defaultStyles.actions}
        color="#000A24"
        onPress={e => {
          Linking.openURL(data.config.subscription_url);
          onSubscribeClick(
            widget,
            e?.target,
            data.config.subscription_url
          );
        }}
      />
      <View style={defaultStyles.subactions_container}>
        <Text
          testID="loginButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data.config.login_url);
            onLoginClick(
              widget,
              e?.target,
              data.config.login_url
            );
          }}>
          Je me connecte
        </Text>
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
