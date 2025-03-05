import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import {
  AccessContext,
  Paywall,
  Snippet,
  RestrictedContent,
} from '@poool/react-native-access';

export default function App() {
  // useEffect(() => {
  //   init();
  // }, []);

  // const init = async () => {
  //   if (Platform.OS === 'ios') {
  //     await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
  //   }
  // };

  return (
    <ScrollView>
      <AccessContext
        appId="CknhMIMaTpNFRkEfkXB6d7EIZBQl4VPuPQgTlaChiulgdVeURmHlLBMeGu8wgJiF"
        config={{ cookiesEnabled: true, forceWidget: 'gift', debug: true }}
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
            <Paywall />
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
