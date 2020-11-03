import nock from 'nock';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import PaywallContext from '../src/components/PaywallContext';

describe('<Paywall />', () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('should render paywall with default widget', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: '',
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

  it('should fire onRealease event', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .persist()
      .post('/access/track')
      .reply(200, {
        action: 'unlock',
        styles: {},
        texts: {},
        config: {},
      });
    const onRelease = jest.fn();
    render(
      <PaywallContext events={{ onrelease: onRelease }}>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      expect(onRelease.mock.calls.length).toBe(1);
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

  it('should store customStyles & stylesVersion in AsyncStorage', async () => {
    const styles = { version: 10, layout: 'portrait' };
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
        styles: { version: 10, layout: 'portrait' },
        texts: {},
        config: {},
      });
    const { findByTestId } = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await findByTestId('giftWidget');
    const _version = await AsyncStorage.getItem('@stylesVersion');
    const _styles = await AsyncStorage.getItem('@customStyles');
    expect(JSON.parse(_version)).toBe(styles.version);
    expect(JSON.parse(_styles)).toMatchObject(styles);
  });

  it('should display default widget & fire onError event', async () => {
    const onError = jest.fn();
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .replyWithError('something awful happened');
    const { findByTestId } = render(
      <PaywallContext events={{ onerror: onError }}>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await findByTestId('RestrictionWidget');
    expect(findByTestId('RestrictionWidget')).toBeTruthy();
    await waitFor(() => expect(onError.mock.calls.length).toBe(1));
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    nock.abortPendingRequests();
  });
});
