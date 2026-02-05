import { useCallback, useEffect } from 'react';
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
  const init = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  }, []);

  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore \
  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis \
  aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat \
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur \
  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore \
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  useEffect(() => {
    init();
  }, [init]);

  return (
    <ScrollView>
      <AccessContext
        appId="LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8" // App Morgan (prod)
        // appId="CknhMIMaTpNFRkEfkXB6d7EIZBQl4VPuPQgTlaChiulgdVeURmHlLBMeGu8wgJiF" // Poool Externe React Native (prod)
        config={{ cookiesEnabled: true, debug: true, hide_gradient: true }}
      >
        <SafeAreaView style={styles.container}>
          <View collapsable={false} style={styles.wrapper}>
            <Text style={styles.title}>Poool Access Example</Text>
            <Snippet>
              <Text>Synopsis : {text}</Text>
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
              onRegister={ async (_) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                return [{ fieldKey: 'email', message: 'Invalid register!!!!!' }];
              }}
              onSubscribeClick={ (e, prevent) => {
                  console.log('onSubscribeClick', e.nativeEvent);
                  prevent();
              }}
              onLoginClick={ (e, prevent) => {
                  console.log('onLoginClick', e.nativeEvent);
                  prevent();
              }}
              onDiscoveryLinkClick={ (e, prevent) => {
                  console.log('onDiscoveryLinkClick', e.nativeEvent);
                  prevent();
              }}
              onDataPolicyClick={ (e, prevent) => {
                  console.log('onDataPolicyClick', e.nativeEvent);
                  prevent();
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
