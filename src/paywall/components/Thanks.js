import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const Thanks = () => {
  return (
    <View >
      <ImageBackground
        source={'https://cdn.poool.fr/assets/bones.svg'}
        style={styles.background}>
        <View style={styles.wrapper}>
          <Text> Merci bg, ça va s afficher </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Thanks;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 'auto',
    backgroundColor: '#FFFFFF',
    top: -50,
  },
  background: {
    resizeMode: 'cover',
  },
});
