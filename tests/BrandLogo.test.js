import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import PaywallContext from '../src/components/PaywallContext';
import BrandLogo from '../src/components/BrandLogo';

describe('<BrandLogo />', () => {
  it('should render the brand logo', async () => {
    const { findByTestId } = render(
      // eslint-disable-next-line react-native/no-inline-styles
      <PaywallContext styles={{ brand_logo: 'url' }}>
        <Text>Test text</Text>
        <BrandLogo />
      </PaywallContext>
    );
    const brandLogo = await findByTestId('brandLogo');
    expect(brandLogo).toBeTruthy();
  });
});
