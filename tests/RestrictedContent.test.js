import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import {
  render,
  waitFor,
} from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import PaywallContext from '../src/components/PaywallContext';
import RestrictedContent from '../src/components/RestrictedContent';

describe('<RestrictedContent />', () => {

  it('should render the restricted content and signature on invisibe',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'invisible',
          styles: {},
          texts: {},
          config: { signature_enabled: true },
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

      await waitFor(() =>
        expect(component.queryByTestId('restrictedTest')).toBeTruthy()
      );
    });

  // trackData in context is not update
  // it('should\'nt render the signature on invisibe',
  //   async () => {
  //     nock('https://api.poool.develop:8443/api/v3')
  //       .post('/access/track')
  //       .reply(200, {
  //         action: 'invisible',
  //         styles: {},
  //         texts: {},
  //         config: { signature_enabled: false },
  //       });
  //
  //     const component = render(
  //       <PaywallContext>
  //         <Text> Test Text </Text>
  //         <RestrictedContent>
  //           <Text testID="restrictedTest"> Restricted text </Text>
  //         </RestrictedContent>
  //         <Paywall />
  //       </PaywallContext>
  //     );
  //
  //     await waitFor(() =>
  //       component.queryByTestId('paywallView')
  //     );
  //
  //     expect(component.queryByTestId('restrictedTest')).toBeNull();
  //   });

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

      await waitFor(() =>
        expect(component.queryByTestId('signature')).toBeTruthy()
      );
    });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
