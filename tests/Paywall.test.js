import React from 'react';
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

    const { getByTestId } = render(
      <PaywallContext>
        <Paywall />
      </PaywallContext>
    );

    const element = getByTestId('paywallView');
    const button = getByTestId('pooolLogo');
    fireEvent.press(button);
  });

});
