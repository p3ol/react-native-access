import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import LoginLink from '../../src/components/LoginLink';

describe('<LoginLink />', () => {
  it('should fire onLoginClick by clicking LoginLink', async () => {
    const onLoginClick = jest.fn();
    const { findByTestId } = render(
      <PaywallContext events={{ onloginclick: onLoginClick }}>
        <Text>Test Text</Text>
        <LoginLink />
      </PaywallContext>
    );
    const loginButton = await findByTestId('loginButton');
    fireEvent.press(loginButton);
    expect(onLoginClick.mock.calls.length).toBe(1);
  });
});
