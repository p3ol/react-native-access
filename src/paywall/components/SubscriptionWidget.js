import React, { useContext } from 'react';
import {
  Image,
  View,
  Text,
  Button,
  Linking,
} from 'react-native';
import { AppContext } from '../services/contexts';

import { defaultStyles } from '../theme/styles';

const SubscriptionWidget = ({ data, widget }) => {

  const { onSubscribeClick } = useContext(AppContext);

  return (

    <View style={defaultStyles.p3_container}>
      <Text style={defaultStyles.p3_title}>
        Cet article est reservé aux abonnés.
      </Text>
      <Text style={defaultStyles.p3_text}>
        Pour profiter pleinement de l&apos;ensemble de ses articles,
        {'\n'} Test vous propose de découvrir ses offres d&apos;abonnement.
      </Text>
      <Button
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
          style={defaultStyles.p3_subaction}
          onPress={() => Linking.openURL(data.config.login_url)}>
          Je me connecte
        </Text>
      </View>
    </View>

  );
};

export default SubscriptionWidget;
