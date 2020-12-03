import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import RestrictionWidget from '../../src/components/RestrictionWidget';

describe('<RestrictionWidget />', () => {

  it('should render without issues', async () => {
    const onSubscribeClick = jest.fn();
    const { findByTestId } = render(
      <PaywallContext events={{ onsubscribeclick: onSubscribeClick }}>
        <Text>Test text</Text>
        <RestrictionWidget />
      </PaywallContext>
    );
    const subscriptionButton = await findByTestId('releaseButton');
    fireEvent.press(subscriptionButton);
    expect(onSubscribeClick.mock.calls.length).toBe(1);
  });

});
