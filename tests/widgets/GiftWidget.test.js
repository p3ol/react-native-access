import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import GiftWidget from '../../src/components/GiftWidget';

describe('<GiftWidget />', () => {

  it('should render GiftWidget without issues in landscape layout',
    async () => {
      const { findByTestId } = render(
        // eslint-disable-next-line react-native/no-inline-styles
        <PaywallContext styles={{ layout: 'landscape' }}>
          <Text>Test text</Text>
          <GiftWidget />
        </PaywallContext>
      );
      const giftWidget = await findByTestId('giftWidget');
      expect(giftWidget).toBeTruthy();
    });
});
