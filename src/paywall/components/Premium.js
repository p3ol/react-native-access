import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Linking,
} from 'react-native';

const styles = StyleSheet.create({
  p3_container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  p3_title: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  p3_text: {
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  p3_actions: {
    textAlign: 'center',
  },
  p3_subactions: {
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 10,
  },
});

const Premium = () => {
  return (
    <View style={styles.p3_container}>
      <Text style={styles.p3_title}>
        Cet article est reservé aux abonnés.
      </Text>
      <Text style={styles.p3_text}>
        Pour profiter pleinement de l&apos;ensemble de ses articles,
        Test vous propose de découvrir ses offres d&apos;abonnement.
      </Text>
      <Button
        title="Découvrir les offres"
        style={styles.p3_actions}
        color="#000A24"
      />
      <Text
        style={styles.p3_subactions}
        onPress={() => Linking.openURL('http://google.com')}>
        Je me connecte
      </Text>
    </View>

  );
};

export default Premium;
