import { useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AccessContext, Paywall } from '@poool/react-native-access';

export default function App() {
  const contentRef = useRef();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AccessContext appId="LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8">
        <View ref={contentRef}><Text>Lorem ipsum bla bla bla bla</Text></View>
        <Paywall
          contentRef={contentRef}
          config={{ debug: true }}
          pageType="premium"
        />
      </AccessContext>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
});
