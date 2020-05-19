import React from 'react';
import { shallow } from 'enzyme';

import Paywall from '../src/Paywall';

describe('<Paywall />', () => {
  it('should render without issues', () => {
    const component = shallow(<Paywall />);

    expect(component.length).toBe(1);
  });
});
