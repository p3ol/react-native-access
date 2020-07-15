import React from 'react';
import { Text, Linking } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';

import Signature from '../src/components/Signature';
import PaywallContext from '../src/components/PaywallContext';

describe('<Signature />', () => {

  it('should render without issues', async () => {

    const onSubscribeClick = jest.fn();
    Linking.openUrl = jest.fn();

    const component = render(
      <PaywallContext onSubscribeClick={onSubscribeClick}>
        <Text>Test Text</Text>
        <Signature/>
      </PaywallContext>
    );

    const signatureButton = component.getByTestId('signatureButton');

    fireEvent.press(signatureButton);

    await wait(() =>
      expect(onSubscribeClick.mock.calls.length).toBe(1) &&
      expect(Linking.openUrl.mock.calls.length).toBe(1)
    );
  });
});
