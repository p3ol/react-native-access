import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import {
  render,
  wait,
} from '@testing-library/react-native';

import Paywall from '../src/paywall/components/Paywall';
import PaywallContext from '../src/paywall/components/PaywallContext';
import RestrictedContent from '../src/paywall/components/RestrictedContent';

describe('<RestrictedContent />', () => {

  it('should render the restricted content and signature on invisibe',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'invisible',
          styles: {},
          texts: {},
          config: {},
        });

      const component = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <RestrictedContent>
            <Text testID="restrictedTest" > Restricted text </Text>
          </RestrictedContent>
          <Paywall />
        </PaywallContext>
      );

      await wait(() =>
        expect(component.queryByTestId('restrictedTest')).toBeTruthy()
      );
    });

  it('should\'nt render the signature on invisibe',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'invisible',
          styles: {},
          texts: {},
          config: { signature_enabled: false },
        });

      const component = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <RestrictedContent>
            <Text testID="restrictedTest" > Restricted text </Text>
          </RestrictedContent>
          <Paywall />
        </PaywallContext>
      );

      await wait(() =>
        expect(component.queryByTestId('signature')).toBeNull()
      );
    });

  it('should render the restricted content and the signature on unlock',
    async () => {
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
          <Text> Test Text </Text>
          <RestrictedContent>
            <Text testID="restrictedTest" > Restricted text </Text>
          </RestrictedContent>
          <Paywall />
        </PaywallContext>
      );

      await wait(() =>
        expect(component.queryByTestId('signature')).toBeTruthy()
      );
    });
});
