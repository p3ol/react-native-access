import { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AccessContext, Paywall } from '@poool/react-native-access';
import RestrictedContent from '../../src/RestrictedContent';

export default function App() {
  const contentRef = useRef();

  return (
    <View style={styles.container}>
      <AccessContext appId="LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8">
        <RestrictedContent ref={contentRef}>
          <Text>Lorem ipsum bla bla bla bla</Text>
        </RestrictedContent>
        <Paywall
          contentRef={contentRef}
          config={{ debug: true }}
          pageType="premium"
        >
          <Text>It works</Text>
        </Paywall>
      </AccessContext>
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
