import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Platform, Text } from 'react-native';
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
        <Snippet><Text>Synopsis</Text></Snippet>
        <RestrictedContent><Text>Full content</Text></RestrictedContent>
        <Paywall
          config={{ debug: true }}
          styles={{
            skin_color: '#FF0000',
          }}
          onReady={() => console.log('Paywall ready')}
        />
      </SafeAreaView>
    </AccessContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
