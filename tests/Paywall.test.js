import React from 'react';
import { Text } from 'react-native';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor } from 'react-native-testing-library';
import { shallow } from 'enzyme';

import Paywall from '../src/paywall/components/Paywall';
import PaywallContext from '../src/paywall/components/PaywallContext';

describe('<Paywall />', () => {

  it('should render without issues', () => {
    const component = shallow(<Paywall />);

    expect(component.length).toBe(1);
  });

  it('should return widget and Paywall on lock', () => {
    let component;
    act(() => {
      component = render(
        <PaywallContext>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          </Text>
          <Paywall />
        </PaywallContext>
      );
    });

    const button = component.getByTestId('pooolLogo');
    fireEvent.press(button);
  });

});
