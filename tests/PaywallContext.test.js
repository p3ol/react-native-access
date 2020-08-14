import React from 'react';
import { shallow } from 'enzyme';
import { waitFor } from '@testing-library/react-native';

import PaywallContext from '../src/components/PaywallContext';

describe('<PaywallContext />', () => {
  it('should render without issues', async () => {
    const component = shallow(<PaywallContext />);

    await waitFor(() => expect(component.length).toBe(1));
  });
});
