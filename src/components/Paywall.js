import React, { useContext } from 'react';
import Widget from './Widget';
import { AppContext } from '../services/contexts';
import { ImageBackground, Image, View } from 'react-native';

import { layouts } from '../styles';
import CopyrightLink from './CopyrightLink';

const Paywall = () => {
  const { active, trackData } = useContext(AppContext);

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
              {trackData?.hasLogo !== false &&
                  <CopyrightLink />
              }
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
