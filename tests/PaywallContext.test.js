import React from 'react';
import { shallow } from 'enzyme';

import PaywallContext from '../src/components/PaywallContext';

describe('<PaywallContext />', () => {
  it('should render without issues', () => {
    const component = shallow(<PaywallContext />);

    expect(component.length).toBe(1);
  });
});
