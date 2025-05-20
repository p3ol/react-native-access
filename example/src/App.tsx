import React, { useCallback, useEffect, useRef } from 'react';
import { AccessContext, Paywall, RestrictedContent, Snippet } from '@poool/react-native-access';
import { StyleSheet, View, Text, Platform, Button, SafeAreaView } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import PagerView from 'react-native-pager-view';

const App = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const init = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  }, []);

  const open = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <AccessContext
      appId="CknhMIMaTpNFRkEfkXB6d7EIZBQl4VPuPQgTlaChiulgdVeURmHlLBMeGu8wgJiF"
      config={{ cookiesEnabled: true, debug: true }}
    >
      <GestureHandlerRootView>
        <SafeAreaView>
          <Button
            title="Open bottom sheet"
            onPress={open}
          />
        </SafeAreaView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            snapPoints={['90%']}
            enableDynamicSizing={false}
            ref={bottomSheetRef}
            style={styles.modal}
          >
            <BottomSheetView style={styles.container}>
              <PagerView initialPage={0} style={styles.container}>
                <View key="0" collapsable={false}>
                  <Snippet id="paywall-1"><Text>Snippet 1</Text></Snippet>
                  <RestrictedContent id="paywall-1"><Text>Full content 1</Text></RestrictedContent>
                  <Paywall id="paywall-1" />
                </View>
                <View key="1" collapsable={false}>
                  <Snippet id="paywall-2"><Text>Snippet 2</Text></Snippet>
                  <RestrictedContent id="paywall-2"><Text>Full content 2</Text></RestrictedContent>
                  <Paywall id="paywall-2" />
                </View>
              </PagerView>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </AccessContext>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
});
