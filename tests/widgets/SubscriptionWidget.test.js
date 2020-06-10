import React from 'react';

import { render, fireEvent } from 'react-native-testing-library';

import SubscriptionWidget from '../../src/paywall/components/SubscriptionWidget';
import PaywallContext from '../../src/paywall/components/PaywallContext';

const widgetProps = {
  data: {
    config: {
      login_url: 'google.com',
      subscription_url: 'google.com',
    },
    styles: {
      button_color: '#FFFFFF',
      brand_logo: 'https://cdn.poool.fr/assets/poool-square.svg',
    },
    texts: {
      gift_desc: 'test description',
    },
  },
};

describe('<SubscriptionWidget />', () => {

  it('should render without issues', () => {

    const { getByTestId } = render(
      <PaywallContext onSubscribeClick={(a, b, c) => {}} >
        <SubscriptionWidget { ... widgetProps }/>
      </PaywallContext>
    );

    const element = getByTestId('widgetView');
    const loginButton = getByTestId('loginButton');
    const mainButton = getByTestId('mainButton');
    fireEvent.press(loginButton);
    fireEvent.press(mainButton);
  });

});
