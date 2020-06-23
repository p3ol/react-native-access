import React, { createRef } from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/paywall/components/PaywallContext';
import LinkWidget from '../../src/paywall/components/LinkWidget';

describe('<LinkWidget />', () => {

  const onDiscoveryLinkClick = jest.fn();
  const onLoginClick = jest.fn();
  const onRejectClick = jest.fn();

  const component = render(
    <PaywallContext
      onDiscoveryLinkClick={onDiscoveryLinkClick}
      onLoginClick={onLoginClick}
      onRejectClick={onRejectClick}
    >
      <Text>Test text</Text>
      <LinkWidget
        data={{
          config: { login_button_enabled: true, link_url: 'url.fr' },
        }}
      />
    </PaywallContext>
  );

  it('should render without issues', async () => {
    const component = shallow(<LinkWidget />);

    expect(component.length).toBe(1);

  });

  it('should fire onDiscoveryLinkClick event by clicking on link', async () => {

    const linkButton = await component.getByTestId('linkButton');
    fireEvent.press(linkButton);

    await wait(() => {
      expect(onDiscoveryLinkClick.mock.calls.length).toBe(1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await wait(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });

  });

  it('should set Alternative to true by clicking on no thanks', async () => {

    const ref = createRef();

    const component = render(
      <PaywallContext ref={ref}>
        <Text>Test text</Text>
        <LinkWidget />
      </PaywallContext>
    );

    const rejectButton = component.getByTestId('rejectButton');
    fireEvent.press(rejectButton);

    await wait(() => {
      expect(ref.current.alternative).toBe(true);
    });

  });

});
