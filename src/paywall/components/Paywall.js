import React from 'react';
import Premium from './Premium';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Linking,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  p3_widget: {
  },
  p3_widget_background: {
    resizeMode: 'cover',
  },
  p3_widget_logo: {
    width: 50,
    height: 12,
    left: 440,
    bottom: 10,
  },
  p3_wrapper: {
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

const Paywall = () => {
  return (
    <View style={styles.p3_widget}>
      <ImageBackground
        source={'https://cdn.poool.fr/assets/bones.svg'}
        style={styles.p3_widget_background}
      >
        <View style={styles.p3_wrapper}>
          <Premium />
          <Text
            onPress={() => Linking.openURL('https://poool.fr/')}>
            <ImageBackground
              source={'https://cdn.poool.fr/assets/poool-square.svg'}
              style={styles.p3_widget_logo}
            />
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

Paywall.displayName = 'Paywall';

export default Paywall;
