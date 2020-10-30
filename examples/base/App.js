import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Paywall,
  RestrictedContent,
  PreviewContent,
  PaywallContext,
} from '../../src';

const App = () => {

  // const onLock = () => console.log('Content locked');
  // const onRelease = event =>
  //   console.log('Content released', event?.widget, event?.actionName);
  // const onReady = () => console.log('Paywall is ready');
  // const onSubscribeClick = event =>
  //   console.log('Subscribe click', event?.widget, event?.button, event?.url);
  // const onLoginClick = event =>
  //   console.log('Login click', event?.widget, event?.button, event?.url);
  // const onDiscoveryLinkClick = event =>
  //   console.log('Link click', event?.widget, event?.button, event?.url);
  // const onDataPolicyClick = event =>
  //   console.log(
  //     'Data policy clicked',
  //     event?.widget,
  //     event?.button,
  //     event?.url
  //   );
  // const onIdentityAvailable = event =>
  //   console.log('Identity recover',
  //     event?.userId, event?.segmentSlug, event?.journey, event?.widget);
  // const onDisabled = () => console.log('Paywall has been disabled');
  // const onError = error => console.log(error);
  // const onFormSubmit = event => console.log(
  //   `form ${event?.name} submitted`, event?.fields, event?.valid
  // );
  // const onRegister = event => console.log(
  //   'Register to Newsletter ' + event?.newsletter_id, event?.email
  // );
  // const onAlternativeClick = event => console.log(
  //   'Click on no_thanks, alternative: ' + event.alternativeWidget
  // );

  return (
    <React.Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <PaywallContext
              appId="ZRGA3EYZ4GRBTSHREG345HGGZRTHZEGEH"
              config={{ force_widget: 'gift' }}
            >
              <PreviewContent>
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
              </PreviewContent>
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
