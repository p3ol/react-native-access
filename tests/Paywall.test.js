import nock from 'nock';
import React from 'react';
import { Text, Linking } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import PaywallContext from '../src/components/PaywallContext';

describe('<Paywall />', () => {

  // trackData in context is not update
  // it('should render without issues in portrait mode', async () => {
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'gift',
  //       styles: { layout: 'portrait' },
  //       texts: {},
  //       config: {},
  //     });
  //   const { queryByTestId } = render(
  //     <PaywallContext>
  //       <Text>Test Text</Text>
  //       <Paywall />
  //     </PaywallContext>
  //   );
  //   await waitFor(() => {
  //     queryByTestId('paywallView');
  //   });
  //
  //   expect(queryByTestId('paywallView')).toBeTruthy();
  // });

  it('should render without issues in landscape mode', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
        styles: { layout: 'landscape' },
        texts: {},
        config: {},
      });
    const { queryByTestId } = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() =>
      queryByTestId('paywallView')
    );

    expect(queryByTestId('paywallView')).toBeTruthy();
  });

  it('should unlock the paywall ', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'unlock',
        styles: {},
        texts: {},
        config: {},
      });
    const component = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      expect(component.queryByTestId('paywallView')).toBeNull();
    });
  });

  it('should click poool without errors ', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
        hasLogo: true,
        styles: { layout: 'portrait' },
        texts: {},
        config: {},
      });
    Linking.openUrl = jest.fn();

    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        <Paywall />
      </PaywallContext>
    );

    await waitFor(() => {
      component.getByTestId('pooolButton');
    });
    const pooolButton = component.getByTestId('pooolButton');
    fireEvent.press(pooolButton);

    expect(Linking.openURL.mock.calls.length).toBe(1);
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
