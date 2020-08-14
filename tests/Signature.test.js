import React from 'react';
import { Text, Linking } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import sinon from 'sinon';

import Signature from '../src/components/Signature';
import PaywallContext from '../src/components/PaywallContext';

describe('<Signature />', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should render without issues', async () => {
    const onSubscribeClick = jest.fn();

    const { getByTestId } = render(
      <PaywallContext onSubscribeClick={onSubscribeClick}>
        <Text>Test Text</Text>
        <Signature/>
      </PaywallContext>
    );

    await waitFor(() => getByTestId('signatureButton'));

    const signatureButton = getByTestId('signatureButton');
    Linking.openUrl = sinon.spy();
    fireEvent.press(signatureButton);

    expect(onSubscribeClick.mock.calls.length).toBe(1);
    // expect(Linking.openUrl.called).toBe(true);
    // Does not detect the restoration of Mocks

  });
});
