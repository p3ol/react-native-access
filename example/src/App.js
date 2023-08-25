import { useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { AccessContext, Paywall } from '@poool/react-native-access';

export default function App () {
  const contentRef = useRef();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AccessContext
        appId="LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8"
      >
        <View style={{ width: 600 }} ref={contentRef}><Text>Lorem ipsum bla bla bla bla</Text></View>
        <Paywall
          contentRef={contentRef}
          config={{ debug: true }}
          styles={{ button_color: '#1896B4' }}
          events={{
            onReady: event => console.log('onReady', event),
          }}
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
