import React, { createRef } from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/components/PaywallContext';
import RestrictionWidget from '../../src/components/RestrictionWidget';

describe('<RestrictionWidget />', () => {

  it('should render without issues', async () => {
    const component = shallow(<RestrictionWidget />);
    await waitFor(() => expect(component.length).toBe(1));
  });

  it('should fire onSubscribeClick event by clicking on subscribe',
    async () => {
      const onSubscribeClick = jest.fn();
      const component = render(
        <PaywallContext onSubscribeClick={onSubscribeClick} >
          <Text>Test text</Text>
          <RestrictionWidget />
        </PaywallContext>
      );
      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);
      const loginButton = component.getByTestId('loginButton');
      fireEvent.press(loginButton);
      await waitFor(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });
    });

  it('should fire onLoginClick event by clicking on login', async () => {
    const onLoginClick = jest.fn();
    const component = render(
      <PaywallContext onLoginClick={onLoginClick} >
        <Text>Test text</Text>
        <RestrictionWidget />
      </PaywallContext>
    );
    const subscribeButton = component.getByTestId('subscribeButton');
    fireEvent.press(subscribeButton);
    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });
  });

  it('should be able to display & press "no thanks" ', async () => {
    const ref = createRef();
    const component = render(
      <PaywallContext ref={ref}>
        <Text>Test text</Text>
        <RestrictionWidget data={{ action: 'subscription' }} />
      </PaywallContext>
    );
    const noThanks = component.getByTestId('rejectButton');
    fireEvent.press(noThanks);
    await waitFor(() => {
      expect(ref.current.alternative).toBe(true);
    });
  });

});
