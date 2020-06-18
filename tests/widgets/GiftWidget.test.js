import React from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/paywall/components/PaywallContext';
import GiftWidget from '../../src/paywall/components/GiftWidget';

describe('<GiftWidget />', () => {

  const onRelease = sinon.spy();
  const onLoginClick = sinon.spy();
  const onSubscribeClick = sinon.spy();

  const component = render(
    <PaywallContext
      onRelease={onRelease}
      onLoginClick={onLoginClick}
      onSubscribeClick={onSubscribeClick}
    >
      <Text>Test text</Text>
      < GiftWidget />
    </PaywallContext>
  );

  it('should render without issues', async () => {
    const component = shallow(< GiftWidget />);

    expect(component.length).toBe(1);

  });

  it('should release the paywall by clicking the releaseButton', async () => {

    const releaseButton = await component.getByTitle(
      /Merci, je profite de cet article offert !/i
    );
    fireEvent.press(releaseButton);

    await wait(() => {
      expect(onRelease).toHaveProperty('callCount', 1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await wait(() => {
      expect(onLoginClick).toHaveProperty('callCount', 1);
    });

  });

  it('should fire onSubscribeClick event by clicking on login', async () => {

    const subscribeButton = component.getByTestId('subscribeButton');
    fireEvent.press(subscribeButton);

    await wait(() => {
      expect(onSubscribeClick).toHaveProperty('callCount', 1);
    });

  });

});
