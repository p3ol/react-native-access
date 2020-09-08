import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Linking,
  ImageBackground,
} from 'react-native';

import { layouts } from '../styles';

const CopyrightLink = () => {
  return (
    <View style={layouts.pooolLogo}>
      <TouchableWithoutFeedback
        onPress={() => Linking.openURL('https://poool.fr/')}
        testID="pooolButton"
      >
        <View>
          <ImageBackground
            source={{
              uri: 'https://cdn.poool.fr/assets/poool-square.svg',
            }}
            style={layouts.pooolLogoBackground}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CopyrightLink;
