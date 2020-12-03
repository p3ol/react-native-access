import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import SubscribeLink from '../../src/components/SubscribeLink';

describe('<SubscribeLink />', () => {
  it('should fire onSubscribeClick by clicking Subscribe link', async () => {
    const onSubscribeClick = jest.fn();
    const { findByTestId } = render(
      <PaywallContext events={{ onsubscribeclick: onSubscribeClick }}>
        <Text>Test Text</Text>
        <SubscribeLink />
      </PaywallContext>
    );
    const subscribeButton = await findByTestId('subscribeButton');
    fireEvent.press(subscribeButton);
    expect(onSubscribeClick.mock.calls.length).toBe(1);
  });
});
