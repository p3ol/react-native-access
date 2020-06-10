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

const SubscriptionWidget = ({ data, widget }) => {

  const { onSubscribeClick } = useContext(AppContext);

  return (

    <View
      style={defaultStyles.p3_container}
      testID="widgetView"
    >
      <Text style={defaultStyles.p3_title}>
        Cet article est reservé aux abonnés.
      </Text>
      <Text style={defaultStyles.p3_text}>
        Pour profiter pleinement de l&apos;ensemble de ses articles,
        {'\n'} Test vous propose de découvrir ses offres d&apos;abonnement.
      </Text>
      <Button
        testID="mainButton"
        title="Découvrir les offres"
        style={defaultStyles.p3_actions}
        color="#000A24"
        onPress={(e) => {
          Linking.openURL(data.config.subscription_url);
          onSubscribeClick(
            widget,
            e.target,
            data.config.subscription_url
          );
        }}
      />
      <View style={defaultStyles.p3_subactions_container}>
        <Text
          testID="loginButton"
          style={defaultStyles.p3_subaction}
          onPress={() => Linking.openURL(data.config.login_url)}>
          Je me connecte
        </Text>
      </View>
    </View>

  );
};

SubscriptionWidget.propTypes = {
  data: PropTypes.object,
  widget: PropTypes.string,
};

SubscriptionWidget.displayName = 'SubscriptionWidget';

export default SubscriptionWidget;
