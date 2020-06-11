import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent, wait } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import Paywall from '../src/paywall/components/Paywall';
import PaywallContext from '../src/paywall/components/PaywallContext';

describe('<Paywall />', () => {
  it('should render without issues', () => {
    const component = shallow(<Paywall />);
    expect(component.length).toBe(1);
  });

  it('should return widget and Paywall on lock', async () => {
    nock('https://api.poool.local:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
        styles: {},
        texts: {},
        config: {},
      });

    const component = render(
      <PaywallContext>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
        </Text>
        <Paywall />
      </PaywallContext>
    );

    await wait(() =>
      expect(component.queryByTestId('giftWidget')).toBeTruthy()
    );
    const button = component.getByTestId('subscribeButton');
    fireEvent.press(button);
  });

});
