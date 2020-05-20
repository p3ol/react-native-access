import React from 'react';
import { AppRegistry, View, Text } from 'react-native';

import App from '../base/App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('app') });
