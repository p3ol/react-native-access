import nock from 'nock';
import React, { createRef } from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent, act } from '@testing-library/react-native';

import Paywall from '../src/components/Paywall';
import Widget from '../src/components/Widget';
import PaywallContext from '../src/components/PaywallContext';

describe('<Widget />', () => {

  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

  it('should disable the paywall on disabled', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'disabled',
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

    await waitFor(() => {
      expect(ref.current.active).toBe(false);
    });
  });

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

  it('should render newsletterWidget without issues', async () => {
    const onRelease = jest.fn();
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'newsletter',
        styles: {},
        texts: {},
        config: {},
      });

    const { getByTestId } = render(
      <PaywallContext onRelease={onRelease}>
        <Text> Test Text </Text>
        <Widget />
      </PaywallContext>
    );

    await waitFor(() => {
      getByTestId('newsletterWidget');
      getByTestId('mailInput');
      getByTestId('CheckboxField/Main');
      getByTestId('registerButton');
    });
    expect(getByTestId('newsletterWidget')).toBeTruthy();

    const mailInput = getByTestId('mailInput');
    await act(async () => {
      fireEvent(mailInput, 'focus');
      fireEvent.changeText(mailInput, 'test@poool.fr');
      fireEvent(mailInput, 'blur');
    });

    const acceptDataButton = getByTestId('CheckboxField/Main');
    await act(async () => {
      fireEvent.press(acceptDataButton);
    });

    const registerButton = getByTestId('registerButton');
    await act(async () => {
      fireEvent.press(registerButton);
    });

    expect(onRelease.mock.calls.length).toBe(1);
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

  it('should render questionWidget without issues', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'question',
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
      expect(component.queryByTestId('questionWidget')).toBeTruthy()
    );
  });

  // trackData in context is not update
  // it('should render restriction widget without issues', async () => {
  //   nock('https://api.poool.develop:8443/api/v3')
  //     .post('/access/track')
  //     .reply(200, {
  //       action: 'restriction',
  //       originalAction: 'restriction',
  //       styles: {},
  //       texts: {},
  //       config: {},
  //     });
  //
  //   const component = render(
  //     <PaywallContext>
  //       <Text> Test Text </Text>
  //       <Paywall />
  //     </PaywallContext>
  //   );
  //
  //   await waitFor(() => {
  //     expect(component.queryByTestId('RestrictionWidget')).toBeTruthy();
  //   });
  //
  // });

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
      component.queryByTestId('RestrictionWidget');
    });

    expect(component.queryByTestId('RestrictionWidget')).toBeTruthy();
  });

  it('should render the alternative widget when first one is rejected',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'subscription',
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
          action: 'subscription',
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

  it('should disable the paywall on unlock', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'unlock',
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

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
