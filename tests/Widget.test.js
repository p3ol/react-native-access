import nock from 'nock';
import React, { createRef } from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import Widget from '../src/components/Widget';
import PaywallContext from '../src/components/PaywallContext';

describe('<Widget />', () => {

  it('should render default widget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: '',
        styles: {},
        texts: {},
        config: {},
      });

    const component = render(
      <PaywallContext>
        <Text> Test Text </Text>
        <Widget />
      </PaywallContext>
    );

    await wait(() =>
      expect(component.queryByTestId('RestrictionWidget')).toBeTruthy()
    );
  });

  it('should render gift widget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'gift',
        styles: {},
        texts: {},
        config: {},
      });

    const component = render(
      <PaywallContext>
        <Text> Test Text </Text>
        <Widget />
      </PaywallContext>
    );

    await wait(() =>
      expect(component.queryByTestId('giftWidget')).toBeTruthy()
    );
  });

  it('should render newsletter without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'newsletter',
        styles: {},
        texts: {},
        config: {},
      });

    const component = render(
      <PaywallContext>
        <Text> Test Text </Text>
        <Widget />
      </PaywallContext>
    );

    await wait(() =>
      expect(component.queryByTestId('registerButton')).toBeTruthy()
    );
  });

  it('should render link widget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'link',
        styles: {},
        texts: {},
        config: {},
      });

    const component = render(
      <PaywallContext>
        <Text> Test Text </Text>
        <Widget />
      </PaywallContext>
    );

    await wait(() =>
      expect(component.queryByTestId('linkWidget')).toBeTruthy()
    );
  });

  it('should render nothing but disable the paywall on invisible', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'invisible',
        styles: {},
        texts: {},
        config: {},
      });

    const ref = createRef();

    // Why using Widget directly is not working ?
    const component = render(
      <PaywallContext ref={ref}>
        <Text> Test Text </Text>
        <Paywall />
      </PaywallContext>
    );

    await wait(() =>
      expect(ref.current.active).toBe(false)
    );
  });

  it('should render nothing but disable the paywall on invisible', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'invisible',
        styles: {},
        texts: {},
        config: {},
      });

    const ref = createRef();

    // Why using Widget directly is not working ?
    const component = render(
      <PaywallContext ref={ref}>
        <Text> Test Text </Text>
        <Paywall />
      </PaywallContext>
    );

    await wait(() =>
      expect(ref.current.active).toBe(false)
    );
  });

});
