import nock from 'nock';
import React from 'react';
import { Text, Linking } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';

import Paywall from '../src/paywall/components/Paywall';
import PaywallContext from '../src/paywall/components/PaywallContext';

describe('<Paywall />', () => {

  it('should render without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
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

    await wait(() =>
      expect(component.queryByTestId('paywallView')).toBeTruthy()
    );
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

    await wait(() => {
      expect(component.queryByTestId('paywallView')).toBeNull();
    });
  });
});

it('should click poool without errors ', async () => {
  nock('https://api.poool.develop:8443/api/v3')
    .post('/access/track')
    .reply(200, {
      action: 'unlock',
      styles: {},
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

  const pooolButton = component.getByTestId('pooolButton');

  fireEvent.press(pooolButton);

  await wait(() => {
    expect(Linking.openURL.mock.calls.length).toBe(1);
  });
});
