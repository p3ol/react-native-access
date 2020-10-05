import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Linking,
  Image,
} from 'react-native';

const CopyrightLink = () => {
  const onPress = () =>
    Linking.openURL('https://poool.fr/');

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      testID="CopyrightLink"
    >
      <View style={styles.wrapper}>
        <Image
          resizeMode="contain"
          source={{ uri: 'https://cdn.poool.fr/assets/poool-square.svg' }}
          style={styles.logo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  logo: {
    width: 50,
    height: 20,
  },
};

CopyrightLink.displayName = 'CopyrightLink';

export default CopyrightLink;
