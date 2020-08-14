import nock from 'nock';
import React, { createRef } from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

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

    await waitFor(() =>
      component.queryByTestId('RestrictionWidget')
    );
    const restrictionWidget = component.queryByTestId('RestrictionWidget');

    expect(restrictionWidget).toBeTruthy();
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

    await waitFor(() =>
      expect(component.queryByTestId('giftWidget')).toBeTruthy()
    );
  });
  // Not working (why ?)
  // it('should render newsletterWidget without issues', async () => {
  //   const onRelease = jest.fn();
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'newsletter',
  //       styles: {},
  //       texts: {},
  //       config: {},
  //     });
  //
  //   const component = render(
  //     <PaywallContext onRelease={onRelease}>
  //       <Text> Test Text </Text>
  //       <Widget />
  //     </PaywallContext>
  //   );
  //
  //   await waitFor(() => component.queryByTestId('newsletterWidget'));
  //   const newsletterWidget = component.queryByTestId('newsletterWidget');
  //   expect(newsletterWidget).toBeTruthy();
  //
  //   await waitFor(() => component.getByTestId('mailInput'));
  //   const mailInput = component.getByTestId('mailInput');
  //   fireEvent(mailInput, 'focus');
  //   fireEvent.changeText(mailInput, 'test@poool.fr');
  //   fireEvent(mailInput, 'blur');
  //
  //   await waitFor(() => component.getByTestId('CheckboxField/Main'));
  //   const acceptDataButton = component.getByTestId('CheckboxField/Main');
  //   fireEvent.press(acceptDataButton);
  //
  //   await waitFor(() => component.getByTestId('registerButton'));
  //   const registerButton = component.getByTestId('registerButton');
  //   fireEvent.press(registerButton);
  //
  //   expect(onRelease.mock.calls.length).toBe(1);
  // });

  it('should render formWidget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'form',
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

    await waitFor(() =>
      expect(component.queryByTestId('formWidget')).toBeTruthy()
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

    await waitFor(() =>
      expect(component.queryByTestId('linkWidget')).toBeTruthy()
    );
  });

  it('should render restriction widget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'restriction',
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

    await waitFor(() =>
      expect(component.queryByTestId('RestrictionWidget')).toBeTruthy()
    );
  });

  it('should render subscription widget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'subscription',
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

    await waitFor(() => {
      expect(component.queryByTestId('RestrictionWidget')).toBeTruthy();
    });
  });

  it('should render nothing but trigger onDisabled', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'invisible',
        styles: {},
        texts: {},
        config: {},
      });

    const ref = createRef();

    render(
      <PaywallContext ref={ref}>
        <Text> Test Text </Text>
        <Paywall />
      </PaywallContext>
    );

    await waitFor(() =>
      expect(ref.current.active).toBe(false)
    );
  });

  it('should disable the paywall on invisible', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'invisible',
        styles: {},
        texts: {},
        config: {},
      });
    const ref = createRef();

    render(
      <PaywallContext ref={ref}>
        <Text> Test Text </Text>
        <Paywall />
      </PaywallContext>
    );

    await waitFor(() =>
      expect(ref.current.active).toBe(false)
    );
  });
  //
  // it('should disable the paywall on disabled', async () => {
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'disabled',
  //       styles: {},
  //       texts: {},
  //       config: {},
  //     });
  //   const ref = createRef();
  //
  //   await waitFor(() => {
  //     render(
  //       <PaywallContext ref={ref}>
  //         <Text> Test Text </Text>
  //         <Paywall />
  //       </PaywallContext>
  //     );
  //   });
  //
  //   expect(ref.current.active).toBe(false);
  // });

  it('should render the default widget', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .replyWithError('cannot get data');
    const ref = createRef();
    const component = render(
      <PaywallContext ref={ref}>
        <Text> Test Text </Text>
        <Paywall />
      </PaywallContext>
    );

    await waitFor(() => {
      expect(component.queryByTestId('RestrictionWidget')).toBeTruthy();
    });
  });

  it('should render the alternative widget when first one is rejected',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'link',
          styles: {},
          texts: {},
          config: { alternative_widget: 'form' },
        });
      const ref = createRef();
      const component = render(
        <PaywallContext ref={ref}>
          <Text> Test Text </Text>
          <Paywall />
        </PaywallContext>
      );

      await waitFor(() => {
        fireEvent.press(component.queryByTestId('rejectButton'));
      });

      expect(ref.current.alternative).toBe(true);
      expect(component.queryByTestId('formWidget')).toBeTruthy();
    });

  it('should render the default alternative widget when first one is rejected',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'link',
          styles: {},
          texts: {},
          config: { alternative_widget: 'video' },
        });
      const ref = createRef();
      const component = render(
        <PaywallContext ref={ref}>
          <Text> Test Text </Text>
          <Paywall />
        </PaywallContext>
      );

      await waitFor(() => {
        fireEvent.press(component.queryByTestId('rejectButton'));
      });

      expect(ref.current.alternative).toBe(true);
      expect(component.queryByTestId('giftWidget')).toBeTruthy();
    });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
