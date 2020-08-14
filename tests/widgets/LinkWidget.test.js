import React, { createRef } from 'react';
import { Text, Linking } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { shallow } from 'enzyme';

import PaywallContext from '../../src/components/PaywallContext';
import LinkWidget from '../../src/components/LinkWidget';

describe('<LinkWidget />', () => {

  const onLoginClick = jest.fn();
  const onRejectClick = jest.fn();
  Linking.openUrl = jest.fn();

  it('should render without issues', async () => {
    const component = shallow(<LinkWidget />);

    await waitFor(() => expect(component.length).toBe(1));

  });

  it('should fire onDiscoveryLinkClick event by clicking on link', async () => {

    const component = render(
      <PaywallContext
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

    const linkButton = component.getByTestId('linkButton');
    fireEvent.press(linkButton);

    await waitFor(() => {
      expect(Linking.openURL.mock.calls.length).toBe(1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {

    const component = render(
      <PaywallContext
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

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await waitFor(() => {
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

    await waitFor(() => {
      expect(ref.current.alternative).toBe(true);
    });

  });

});
