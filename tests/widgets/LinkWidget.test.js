import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import LinkWidget from '../../src/components/LinkWidget';

describe('<LinkWidget />', () => {

  it('should render LinkWidget without isues', async () => {
    const { findByTestId } = render(
      <PaywallContext>
        <Text>Test Text</Text>
        <LinkWidget />
      </PaywallContext>
    );
    const linkWidget = await findByTestId('LinkWidget');
    expect(linkWidget).toBeTruthy();
  });

  it('should release the widget by clicking the link_button', async () => {
    const onDiscoveryLinkClick = jest.fn();
    const { findByTestId, getByTestId } = render(
      <PaywallContext events={{
        ondiscoverylinkclick: onDiscoveryLinkClick,
      }}>
        <Text>Test Text</Text>
        <LinkWidget />
      </PaywallContext>
    );
    await findByTestId('LinkWidget');
    const linkButton = getByTestId('releaseButton');
    fireEvent.press(linkButton);
    expect(linkButton).toBeTruthy();
    expect(onDiscoveryLinkClick.mock.calls.length).toBe(1);
  });

});
