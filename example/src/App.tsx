import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AccessContext, Paywall, RestrictedContent, Snippet } from '@poool/react-native-access';
import { StyleSheet, View, Text, Platform, Button, SafeAreaView } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import PagerView from 'react-native-pager-view';

import { Modal } from 'react-native';

import Released from './Released';

const App = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const init = useCallback(async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY);
    }
  }, []);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);


  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  const pageItems = [
    { 
      id: "paywall-1",
      snippet: "Snippet 1",
      content: "Full Content 1",
    },
    { 
      id: "paywall-2",
      snippet: "Snippet 2",
      content: "Full Content 2",
    },
    { 
      id: "paywall-3",
      snippet: "Snippet 3",
      content: "Full Content 3",
    },
    { 
      id: "paywall-4",
      snippet: "Snippet 4",
      content: "Full Content 4",
    },
    // { 
    //   id: "paywall-5",
    //   snippet: "Snippet 5",
    //   content: "Full Content 5",
    // },
    // { 
    //   id: "paywall-6",
    //   snippet: "Snippet 6",
    //   content: "Full Content 6",
    // },
  ];

  const pagerView =
  <PagerView initialPage={0} style={styles.container}>
    { pageItems.map((item, index) => (
      <View key={index} collapsable={false}>
          <Snippet key={"snippet" + index} id={item.id}><Text>{item.snippet + " - " +  index}</Text></Snippet>
          <RestrictedContent key={"content" + index} id={item.id}><Text>{item.content + " - " +  index}</Text></RestrictedContent>
          <Paywall key={"paywall" + index} id={item.id} />
      </View>
    )) }
  </PagerView>
  

  return (
    <AccessContext
      appId="LgyCF4bWrrvd8RhiCigDD90N69eSM6vNxKJASUNFalstZPXK9LFQxXkkMcvtO4S8"
      config={{ cookiesEnabled: true, debug: true }}
    >
      <GestureHandlerRootView>
        <SafeAreaView>
          <Button
            title="Open bottom native modal"
            onPress={openModal}
          />
          <Button
            title="Open bottom sheet modal"
            onPress={openBottomSheet}
          />
          <Modal
            animationType="slide"
            visible={modalVisible}
            presentationStyle='pageSheet'
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <Button
            title="Close native modal"
            onPress={closeModal}
            />
            <Released/>
            { pagerView }          
          </Modal>
        </SafeAreaView>
        <BottomSheetModalProvider>
          <BottomSheetModal
            snapPoints={['90%']}
            enableDynamicSizing={false}
            ref={bottomSheetRef}
            style={styles.modal}
          >
            <BottomSheetView style={styles.container}>
              <Button
                title="Close bottom sheet modal"
                onPress={closeBottomSheet}
              />
              { pagerView }
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
