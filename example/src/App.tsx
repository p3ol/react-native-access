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

  const app_id_1 = "LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8";
  const app_id_2 = "ZRGA3EYZ4GRBTSHREG345HGGZRTHZEGEH";

  return (
    <ScrollView>
      <AccessContext
        appId={app_id_1}
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
              onReady={() => console.log('Paywall ready:', app_id_1)}
              onDismissBottomSheet={() => console.log('Paywall bottom-sheet dismissed:', app_id_1)}
            />
          </View>
        </SafeAreaView>
      </AccessContext>

      <AccessContext
        appId={app_id_2}
      >
        <SafeAreaView style={styles.container}>
          <View collapsable={false} style={styles.wrapper}>
            <Snippet>
              <Text>Deuxieme article</Text>
            </Snippet>
            <RestrictedContent>
              <Text>Full content</Text>
            </RestrictedContent>
            <Paywall
              config={{ debug: true }}
              onReady={() => console.log('Paywall ready:', app_id_2)}
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
});
