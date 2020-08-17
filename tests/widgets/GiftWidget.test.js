import React from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/components/PaywallContext';
import GiftWidget from '../../src/components/GiftWidget';

describe('<GiftWidget />', () => {

  const onRelease = jest.fn();
  const onLoginClick = jest.fn();
  const onSubscribeClick = jest.fn();

  it('should render without issues', async () => {

    const component = shallow(<GiftWidget />);

    await waitFor(() => expect(component.length).toBe(1));

  });

  it('should release the paywall by clicking the releaseButton', async () => {

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

    const releaseButton = component.getByTestId('releaseButton');
    fireEvent.press(releaseButton);

    await waitFor(() => {
      expect(onRelease.mock.calls.length).toBe(1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {

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

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });

  });

  it('should fire onSubscribeClick event by clicking on subscribe',
    async () => {

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

      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);

      await waitFor(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });

    });

});
