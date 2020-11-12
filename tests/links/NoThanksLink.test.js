import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import NoThanksLink from '../../src/components/NoThanksLink';
import Paywall from '../../src/components/Paywall';

describe('<NoThanksLink />', () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('should fire onAlternativeClick by clicking No Thanks', async () => {
    const onAlternativeClick = jest.fn();
    const { findByTestId } = render(
      <PaywallContext events={{ onalternativeclick: onAlternativeClick }}>
        <Text>Test Text</Text>
        <NoThanksLink />
      </PaywallContext>
    );
    const rejectButton = await findByTestId('rejectButton');
    fireEvent.press(rejectButton);
    expect(onAlternativeClick.mock.calls.length).toBe(1);
  });

  it('should fire onAlternativeClick with original action tracking',
    async () => {
      const onAlternativeClick = jest.fn();
      const { findByTestId } = render(
        <PaywallContext
          events={{ onalternativeclick: onAlternativeClick }}
          config={{ track_original_action: true }}>
          <Text>Test Text</Text>
          <NoThanksLink />
        </PaywallContext>
      );
      const rejectButton = await findByTestId('rejectButton');
      fireEvent.press(rejectButton);
      expect(onAlternativeClick.mock.calls.length).toBe(1);
    });

  it('should fire onAlternativeClick with original action tracking without' +
    'originalAction', async () => {
    const onAlternativeClick = jest.fn();
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'link',
        config: { alternative_widget: 'gift', track_original_action: true },
        originalAction: null,
      });
    const { findByTestId } = render(
      <PaywallContext events={{ onalternativeclick: onAlternativeClick }}>
        <Text>Test Text</Text>
        <Paywall />
      </PaywallContext>
    );
    const rejectButton = await findByTestId('rejectButton');
    fireEvent.press(rejectButton);
    expect(onAlternativeClick.mock.calls.length).toBe(1);
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
    nock.enableNetConnect();
  });
  
});
