import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Paywall, RestrictedContent, PaywallContext } from '../../src';

const App = () => (

  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <PaywallContext>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              tortor leo, sollicitudin quis posuere sed, pharetra cursus
              mauris. Donec ultricies nibh sit amet quam feugiat, vel bibendum
              nisl pellentesque. In hac habitasse platea dictumst. Sed varius
              eget ante ac pulvinar. Suspendisse fringilla, quam ac imperdiet
              consequat, leo massa molestie mi, eget condimentum ligula enim ut
              mauris. Aliquam egestas malesuada vestibulum. Etiam ut nibh
              turpis. Fusce mattis blandit bibendum. Vestibulum sodales laoreet
              lacus ut sollicitudin. Donec tempus iaculis viverra. In congue
              felis quis sem porta iaculis.
            </Text>
            <RestrictedContent>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                tortor leo, sollicitudin quis posuere sed, pharetra cursus
                mauris. Donec ultricies nibh sit amet quam feugiat, vel bibendum
                nisl pellentesque. In hac habitasse platea dictumst. Sed varius
                eget ante ac pulvinar. Suspendisse fringilla, quam ac imperdiet
                consequat, leo massa molestie mi, eget condimentum ligula enim
                ut mauris. Aliquam egestas malesuada vestibulum. Etiam ut nibh
                turpis. Fusce mattis blandit bibendum. Vestibulum sodales
                laoreet lacus ut sollicitudin. Donec tempus iaculis viverra. In
                congue felis quis sem porta iaculis.
              </Text>
            </RestrictedContent>
            <Paywall/>
          </PaywallContext>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
);

App.displayName = 'App';

export default App;
