import React from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/components/PaywallContext';
import RestrictionWidget from '../../src/components/RestrictionWidget';

describe('<RestrictionWidget />', () => {

  const onLoginClick = jest.fn();
  const onSubscribeClick = jest.fn();

  const component = render(
    <PaywallContext
      onLoginClick={onLoginClick}
      onSubscribeClick={onSubscribeClick}
    >
      <Text>Test text</Text>
      < RestrictionWidget />
    </PaywallContext>
  );

  it('should render without issues', async () => {
    const component = shallow(< RestrictionWidget />);

    expect(component.length).toBe(1);

  });

  it('should fire onSubscribeClick event by clicking on subscribe',
    async () => {

      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);

      await wait(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });

    });

  it('should fire onLoginClick event by clicking on login', async () => {

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await wait(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });

  });

});
