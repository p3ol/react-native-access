import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import Signature from '../src/components/Signature';
import PaywallContext from '../src/components/PaywallContext';

describe('<Signature />', () => {
  it('should render without issues', async () => {
    const onSubscribeClick = jest.fn();
    const { findByTestId } = render(
      <PaywallContext events={{ onsubscribeclick: onSubscribeClick }}>
        <Text>Test Text</Text>
        <Signature/>
      </PaywallContext>
    );
    const signatureButton = await findByTestId('signatureButton');
    fireEvent.press(signatureButton);
    expect(onSubscribeClick.mock.calls.length).toBe(1);
  });
});
