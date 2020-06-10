import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from 'react-native-testing-library';
import { shallow } from 'enzyme';

import Widget from '../src/paywall/components/Widget';

describe('<Widget />', () => {

  it('should render without issues', async () => {
    let component;
    act(() => { component = render(<Widget />); });
    await new Promise(resolve => setTimeout(resolve, 1000));
    expect(component).toBeDefined();
  });
});
