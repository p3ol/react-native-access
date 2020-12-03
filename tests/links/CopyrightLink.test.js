import React from 'react';
import { Text, Linking } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import CopyrightLink from '../../src/components/CopyrightLink';

describe('<CopyrightLink />', () => {
  it('should browse to poool website by clicking CopyrightLink', async () => {
    Linking.openUrl = jest.fn();
    const { findByTestId } = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <CopyrightLink />
      </PaywallContext>
    );
    const copyrightLink = await findByTestId('CopyrightLink');
    fireEvent.press(copyrightLink);
    expect(Linking.openURL.mock.calls.length).toBe(1);
  });
});
