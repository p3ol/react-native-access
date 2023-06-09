import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Access from '@poool/react-native-access';

export default function App() {
  useEffect(() => {
    Access
      .init('LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8')
      .createPaywall();
  }, []);

  return (
    <View style={styles.container}>
      <Text>It works</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
