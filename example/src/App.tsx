import { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
} from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import {
  AccessContext,
  Paywall,
  Snippet,
  RestrictedContent,
} from '@poool/react-native-access';

export default function App() {
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  };

  return (
    <ScrollView>
      <AccessContext
        appId="CknhMIMaTpNFRkEfkXB6d7EIZBQl4VPuPQgTlaChiulgdVeURmHlLBMeGu8wgJiF"
        config={{ cookiesEnabled: true, debug: true }}
      >
        <SafeAreaView style={styles.container}>
          <View collapsable={false} style={styles.wrapper}>
            <Text style={styles.title}>Poool Access Example</Text>
            <Snippet>
              <Text>Synopsis</Text>
            </Snippet>
            <RestrictedContent>
              <Text>Full content</Text>
            </RestrictedContent>
            <Paywall
              onFormSubmit={async (e) => {
                console.log('onFormSubmit', e.nativeEvent);
                await new Promise((resolve) => setTimeout(resolve, 2000));

                return [{ fieldKey: 'email', message: 'Invalid email' }];
              }}
            />
          </View>
        </SafeAreaView>
      </AccessContext>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
