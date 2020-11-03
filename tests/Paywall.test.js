import nock from 'nock';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import PaywallContext from '../src/components/PaywallContext';

describe('<Paywall />', () => {

  it('should render paywall with default widget', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: '',
        styles: {},
        texts: {},
        config: {},
      });
    const { getByTestId } = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      expect(getByTestId('paywallView')).toBeTruthy();
      expect(getByTestId('RestrictionWidget')).toBeTruthy();
    });
  });

  it('should fire onHidden event', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'hidden',
        styles: {},
        texts: {},
        config: {},
      });
    const onHidden = jest.fn();
    render(
      <PaywallContext events={{ onhidden: onHidden }}>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      expect(onHidden.mock.calls.length).toBe(1);
    });
  });

  it('should fire onDisabled event', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'disabled',
        styles: {},
        texts: {},
        config: {},
      });
    const onDisabled = jest.fn();
    render(
      <PaywallContext events={{ ondisabled: onDisabled }}>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      expect(onDisabled.mock.calls.length).toBe(1);
    });
  });

  it('should store styles & data in AsyncStorage', async () => {
    const trackData = {
      action: 'gift',
      styles: { version: 10, custom: 'custom' },
      texts: {},
      config: {},
    };
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, trackData);
    render(
      <PaywallContext>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    const data = await AsyncStorage.getItem('@poool');
    await waitFor(() => {
      expect(data).toBe(trackData);
    });
  });
  // it('should unlock the paywall ', async () => {
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'unlock',
  //       styles: {},
  //       texts: {},
  //       config: {},
  //     });
  //   const component = render(
  //     <PaywallContext>
  //       <Text>Test Text</Text>
  //       <Paywall />
  //     </PaywallContext>
  //   );
  //   await waitFor(() => {
  //     expect(component.queryByTestId('paywallView')).toBeNull();
  //   });
  // });
  //
  // it('should click poool without errors ', async () => {
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'gift',
  //       hasLogo: true,
  //       styles: { layout: 'portrait' },
  //       texts: {},
  //       config: {},
  //     });
  //   Linking.openUrl = jest.fn();
  //
  //   const component = render(
  //     <PaywallContext>
  //       <Text>Test text</Text>
  //       <Paywall />
  //     </PaywallContext>
  //   );
  //
  //   await waitFor(() => {
  //     component.getByTestId('pooolButton');
  //   });
  //   const pooolButton = component.getByTestId('pooolButton');
  //   fireEvent.press(pooolButton);
  //
  //   expect(Linking.openURL.mock.calls.length).toBe(1);
  // });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
