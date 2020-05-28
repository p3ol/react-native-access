import React from 'react';
import Widget from './Widget';
import {
  ImageBackground,
  StyleSheet,
  View,
  Linking,
  Text,
} from 'react-native';

const Paywall = () => {
  return (

    <View >
      <ImageBackground
        source={'https://cdn.poool.fr/assets/bones.svg'}
        style={styles.background}>
        <View style={styles.wrapper}>
          <Widget />
          <Text
            onPress={() => Linking.openURL('https://poool.fr/')}>
            <ImageBackground
              source={'https://cdn.poool.fr/assets/poool-square.svg'}
              style={styles.logo}
            />
          </Text>
        </View>
      </ImageBackground>
    </View>

  );
};

Paywall.displayName = 'Paywall';

export default Paywall;

const styles = StyleSheet.create({

  background: {
    resizeMode: 'cover',
  },

  logo: {
    width: 50,
    height: 12,
    left: 440,
    bottom: 10,
  },

  wrapper: {
    flex: 1,
    margin: 'auto',
    width: 500,
    backgroundColor: '#FFFFFF',
    top: -50,

    // Box Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10,
    elevation: 8,
    // ============
  },
});
