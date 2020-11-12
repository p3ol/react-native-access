import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import MainButton from '../src/components/MainButton';
import PaywallContext from '../src/components/PaywallContext';

describe('<MainButton />', () => {
  it('should render MainButton defaults props', async () => {
    const { findByTestId } = render(
      <PaywallContext>
        <Text>test text</Text>
        <MainButton/>
      </PaywallContext>
    );
    const button = await findByTestId('releaseButton');
    fireEvent.press(button);
    expect(button).toBeTruthy();
  });
});
