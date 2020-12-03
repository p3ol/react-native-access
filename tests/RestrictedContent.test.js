import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import PaywallContext from '../src/components/PaywallContext';
import RestrictedContent from '../src/components/RestrictedContent';

describe('<RestrictedContent />', () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('should render the restricted content and the signature', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'invisible',
        styles: {},
        texts: {},
        config: { signature_enabled: true },
      });

    const { findByText, getByTestId } = render(
      <PaywallContext>
        <Text> Test Text </Text>
        <RestrictedContent>
          <Text>Restricted text</Text>
        </RestrictedContent>
        <Paywall />
      </PaywallContext>
    );

    const restrictedcontent = await findByText('Restricted text');
    const signature = getByTestId('Signature');
    expect(restrictedcontent).toBeTruthy();
    expect(signature).toBeTruthy();
  });

  it('should render the restricted content without the signature',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'invisible',
          styles: {},
          texts: {},
          config: { signature_enabled: false },
        });

      const { findByText, queryByTestId } = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <RestrictedContent>
            <Text>Restricted text</Text>
          </RestrictedContent>
          <Paywall />
        </PaywallContext>
      );

      const restrictedcontent = await findByText('Restricted text');
      expect(restrictedcontent).toBeTruthy();
      expect(queryByTestId('Signature')).toBeNull();
    });

  it('should return nothing',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'restriction',
          styles: {},
          texts: {},
          config: {},
        });

      const { queryByText } = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <RestrictedContent>
            <Text>Restricted text</Text>
          </RestrictedContent>
          <Paywall />
        </PaywallContext>
      );

      await waitFor(() => expect(queryByText('Restricted text')).toBeNull());

    });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
