import React from 'react';
import {
  Image,
  View,
  Text,
  Button,
  Linking,
} from 'react-native';

import { defaultStyles } from '../theme/styles';

const SubscriptionWidget = (props) => {
  return (

    <View style={defaultStyles.p3_container}>
      <Text style={defaultStyles.p3_title}>
        Cet article est reservé aux abonnés.
      </Text>
      <Text style={defaultStyles.p3_text}>
        Pour profiter pleinement de l&apos;ensemble de ses articles,
        Test vous propose de découvrir ses offres d&apos;abonnement.
      </Text>
      <Button
        title="Découvrir les offres"
        style={defaultStyles.p3_actions}
        color="#000A24"
        onPress={() => Linking.openURL(props.data.config.subscription_url)}
      />
      <Text
        style={defaultStyles.p3_subactions}
        onPress={() => Linking.openURL(props.data.config.login_url)}>
        Je me connecte
      </Text>
    </View>

  );
};

export default SubscriptionWidget;
