import React, { useContext } from 'react';
import Widget from './Widget';
import { AppContext } from '../services/contexts';
import {
  ImageBackground,
  StyleSheet,
  View,
  Linking,
  Text,
} from 'react-native';

const Paywall = () => {
  const { onRelease, onLock, active } = useContext(AppContext);

  if (active) {
    return (
      <View testID="paywallView">
        <ImageBackground
          source={{ uri: 'https://cdn.poool.fr/assets/bones.svg' }}
          style={styles.background}>
          <View style={styles.paywall} >
            <View style={styles.wrapper}>
              <Widget />
              <View style={styles.logo}>
                <Text
                  onPress={() => Linking.openURL('https://poool.fr/')}
                  testID="pooolButton"
                >
                  <ImageBackground
                    source={{
                      uri: 'https://cdn.poool.fr/assets/poool-square.svg',
                    }}
                    style={styles.logo_background}
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

const styles = StyleSheet.create({

  background: {
    resizeMode: 'cover',
  },

  logo: {
    flexDirection: 'row-reverse',
  },

  logo_background: {
    bottom: 10,
    height: 12,
    right: 10,
    width: 50,
  },

  paywall: {
    margin: 'auto',
    minWidth: 450,
    width: '30%',
  },

  wrapper: {
    backgroundColor: '#FFFFFF',
    elevation: 8,
    flex: 1,
    marginHorizontal: 20,

    // Box Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10,
    top: -50,
    // ============
  },
});
