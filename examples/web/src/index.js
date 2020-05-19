import React from 'react';
import { AppRegistry, View, Text } from 'react-native';

import { Paywall } from '@poool/react-native-access';

const App = () => (
  <View>
    <Text>Here&apos;s the paywall:</Text>
    <Paywall />
  </View>
);

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('app') });
