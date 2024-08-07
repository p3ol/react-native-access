import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, Text, View } from 'react-native';
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
    <AccessContext
      appId="ZRGA3EYZ4GRBTSHREG345HGGZRTHZEGEH"
      config={{ cookies_enabled: true }}
    >
      <SafeAreaView style={styles.container}>
        <View collapsable={false} style={styles.wrapper}>
          <Snippet>
            <Text>Synopsis</Text>
          </Snippet>
          <RestrictedContent>
            <Text>Full content</Text>
          </RestrictedContent>
          <Paywall
            config={{ debug: true }}
            onReady={() => console.log('Paywall ready')}
            style={{ paddingTop: 20 }}
          />
        </View>
      </SafeAreaView>
    </AccessContext>
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
});
