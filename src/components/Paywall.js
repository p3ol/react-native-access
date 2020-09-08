import React, { useContext } from 'react';
import Widget from './Widget';
import { AppContext } from '../services/contexts';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
  View,
  Linking,
} from 'react-native';

import { layouts } from '../styles';

const Paywall = () => {
  const { active, trackData } = useContext(AppContext);

  const onPress = () => Linking.openURL('https://poool.fr/');

  if (active) {
    return (
      <View testID="paywallView">
        <ImageBackground
          source={ trackData?.styles?.layout === 'portrait'
            ? { uri: 'https://cdn.poool.fr/assets/bones.svg' }
            : { uri: '' }
          }
          style={layouts.paywallBackground}>
          <View style={[
            layouts.paywall[trackData?.styles?.layout || 'portrait'],
            layouts.border(trackData?.styles?.skin_color),
          ]}>
            <View style={layouts.wrapper}>
              { trackData?.styles && (
                <React.Fragment>
                  <Image
                    source={ trackData?.styles?.layout !== 'portrait' &&
                      { uri: trackData?.styles?.brand_cover }}
                    style={layouts.cover}
                  />
                  <Image
                    style={layouts.logo}
                    source={{ uri: trackData?.styles?.brand_logo }}
                  />
                </React.Fragment>
              )}
              <Widget />
              <View style={layouts.pooolLogo}>
                <TouchableWithoutFeedback
                  onPress={onPress}
                  testID="pooolButton"
                >
                  <ImageBackground
                    source={{
                      uri: 'https://cdn.poool.fr/assets/poool-square.svg',
                    }}
                    style={layouts.pooolLogoBackground}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    return null;
  }
};

Paywall.displayName = 'Paywall';

export default Paywall;
