import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Paywall, RestrictedContent, PaywallContext } from '../../src';

const App = () => {

  // Events definition
  const onLock = () => console.log('Content locked');
  const onRelease = () => console.log('Content released');
  const onSubscribeClick = (widget, button, url) =>
    console.log('Subscribe click', widget, button, url);
  const onLoginClick = (widget, button, url) =>
    console.log('Login click', widget, button, url);
  const onReject = (widget, button, alternativeWidget) =>
    console.log('Widget rejected', widget, button, alternativeWidget);
  const onDiscoveryLinkClick = (widget, button, url) =>
    console.log('Link click', widget, button, url);
  const onDataPolicyClick = () => console.log('Data policy clicked');

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <PaywallContext
              onLock={onLock}
              onRelease={onRelease}
              onRejectClick={onReject}
              onSubscribeClick={onSubscribeClick}
              onLoginClick={onLoginClick}
              onDiscoveryLinkClick={onDiscoveryLinkClick}
              onDataPolicyClick={onDataPolicyClick}
            >
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tortor leo, sollicitudin quis posuere sed, pharetra cursus
                mauris. Donec ultricies nibh sit amet quam feugiat, vel bibendum
                nisl pellentesque. In hac habitasse platea dictumst. Sed varius
                eget ante ac pulvinar. Suspendisse fringilla, quam ac imperdiet
                consequat, leo massa molestie mi, eget condimentum ligula enim
                utmauris. Aliquam egestas malesuada vestibulum. Etiam ut nibh
                turpis. Fusce mattis blandit bibendum. Vestibulum sodales
                laoreet lacus ut sollicitudin. Donec tempus iaculis viverra.
                In congue felis quis sem porta iaculis.
              </Text>
              <RestrictedContent>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  tortor leo, sollicitudin quis posuere sed, pharetra cursus
                  mauris. Donec ultricies nibh sit amet quam feugiat, vel
                  bibendum nisl pellentesque. In hac habitasse platea dictumst.
                  Sed varius eget ante ac pulvinar. Suspendisse fringilla,
                  quam ac imperdiet
                  consequat, leo massa molestie mi, eget condimentum ligula enim
                  ut mauris. Aliquam egestas malesuada vestibulum. Etiam ut nibh
                  turpis. Fusce mattis blandit bibendum. Vestibulum sodales
                  laoreet lacus ut sollicitudin. Donec tempus iaculis viverra.
                  Incongue felis quis sem porta iaculis.
                </Text>
              </RestrictedContent>
              <Paywall/>
            </PaywallContext>
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
};

App.displayName = 'App';

export default App;
