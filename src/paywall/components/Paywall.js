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

const Paywall = (props) => {

  const { onRelease, onLock, active } = useContext(AppContext);

  if (active) {
    onLock?.();
    return (
      <View>
        <ImageBackground
          source={'https://cdn.poool.fr/assets/bones.svg'}
          style={styles.background}>
          <View style={styles.wrapper}>
            <Widget />
            <View style={styles.logo}>
              <Text onPress={() => Linking.openURL('https://poool.fr/')}>
                <ImageBackground
                  source={'https://cdn.poool.fr/assets/poool-square.svg'}
                  style={styles.logo_background}
                />
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  } else {
    onRelease?.();
    return (null);
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

  wrapper: {
    flex: 1,
    margin: 'auto',
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
