import React from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/paywall/components/PaywallContext';
import GiftWidget from '../../src/paywall/components/GiftWidget';

describe('<GiftWidget />', () => {

  const onRelease = jest.fn();
  const onLoginClick = jest.fn();
  const onSubscribeClick = jest.fn();

  const component = render(
    <PaywallContext
      onRelease={onRelease}
      onLoginClick={onLoginClick}
      onSubscribeClick={onSubscribeClick}
    >
      <Text>Test text</Text>
      <GiftWidget release={() => {}}/>
    </PaywallContext>
  );

  it('should render without issues', async () => {
    const component = shallow(<GiftWidget />);

    expect(component.length).toBe(1);

  });

  it('should release the paywall by clicking the releaseButton', async () => {

    const releaseButton = await component.getByTestId('releaseButton');
    fireEvent.press(releaseButton);

    await wait(() => {
      expect(onRelease.mock.calls.length).toBe(1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await wait(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });

  });

  it('should fire onSubscribeClick event by clicking on login', async () => {

    const subscribeButton = component.getByTestId('subscribeButton');
    fireEvent.press(subscribeButton);

    await wait(() => {
      expect(onSubscribeClick.mock.calls.length).toBe(1);
    });

  });

});
