import React from 'react';
import { Text, Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import GDPR from '../../src/components/GDPR';

describe('<GDPR />', () => {
  Linking.openUrl = jest.fn();
  it('should browse to poool website by clicking poool GDPR button',
    async () => {
      const { findByTestId } = render(
        <PaywallContext>
          <Text>Test Text</Text>
          <GDPR />
        </PaywallContext>
      );
      const pooolData = await findByTestId('pooolData');
      fireEvent.press(pooolData);
      expect(Linking.openURL.mock.calls.length).toBe(1);
    });
  it('should browse to poool website by clicking data processor button',
    async () => {
      const { findByTestId } = render(
        <PaywallContext>
          <Text>Test Text</Text>
          <GDPR />
        </PaywallContext>
      );
      const pooolData = await findByTestId('dataProcessor');
      fireEvent.press(pooolData);
      expect(Linking.openURL.mock.calls.length).toBe(1);
    });
  it('should browse to poool website by clicking ordering institution button',
    async () => {
      const { findByTestId } = render(
        <PaywallContext>
          <Text>Test Text</Text>
          <GDPR />
        </PaywallContext>
      );
      const pooolData = await findByTestId('orderingInstitution');
      fireEvent.press(pooolData);
      expect(Linking.openURL.mock.calls.length).toBe(1);
    });
});
