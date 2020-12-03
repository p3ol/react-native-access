import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import PaywallContext from '../src/components/PaywallContext';
import BrandCover from '../src/components/BrandCover';

describe('<BrandCover />', () => {
  it('should render the brand cover', async () => {
    const { findByTestId } = render(
      // eslint-disable-next-line react-native/no-inline-styles
      <PaywallContext styles={{ brand_cover: 'url' }}>
        <Text>Test text</Text>
        <BrandCover />
      </PaywallContext>
    );
    const brandLogo = await findByTestId('brandCover');
    expect(brandLogo).toBeTruthy();
  });
});
