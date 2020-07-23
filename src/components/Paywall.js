import React, { useContext } from 'react';
import Widget from './Widget';
import { AppContext } from '../services/contexts';
import {
  ImageBackground,
  Image,
  View,
  Linking,
  Text,
} from 'react-native';

import { layouts } from '../styles';

const Paywall = () => {
  const { active, trackData } = useContext(AppContext);

  if (active) {
    return (
      <View testID="paywallView">
        <ImageBackground
          source={ trackData?.styles?.layout === 'portrait' &&
            { uri: 'https://cdn.poool.fr/assets/bones.svg' }
          }
          style={layouts.paywallBackground}>
          <View style={[
            layouts.paywall[trackData?.styles?.layout || 'portrait'],
            layouts.border(trackData?.styles?.skin_color),
          ]}>
            <View style={layouts.wrapper}>
              { trackData && (
                <React.Fragment>
                  <Image
                    source={ trackData?.styles?.layout !== 'portrait' &&
                      { uri: trackData?.styles.brand_cover }}
                    style={layouts.cover}
                  />
                  <Image
                    style={layouts.logo}
                    source={{ uri: trackData?.styles.brand_logo }}
                  />
                </React.Fragment>
              )}
              <Widget />
              <View style={layouts.pooolLogo}>
                <Text
                  onPress={() => Linking.openURL('https://poool.fr/')}
                  testID="pooolButton"
                >
                  <ImageBackground
                    source={{
                      uri: 'https://cdn.poool.fr/assets/poool-square.svg',
                    }}
                    style={layouts.pooolLogoBackground}
                  />
                </Text>
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
