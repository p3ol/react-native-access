import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import NewsletterWidget from '../../src/components/NewsletterWidget';
import Paywall from '../../src/components/Paywall';

describe('<NewsletterWidget />', () => {
  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

  it('should display GDPR by clicking the GDPR button', async () => {
    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const gdprlink = component.getByTestId('GDPRLink');
    fireEvent.press(gdprlink);
    await waitFor(() => {
      expect(component.queryByTestId('GDPR')).toBeTruthy();
    });
  });

  it('should close GDPR by clicking the back button', async () => {
    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const gdprlink = component.getByTestId('GDPRLink');
    fireEvent.press(gdprlink);
    const backButton = component.getByTestId('backButton');
    fireEvent.press(backButton);
    await waitFor(() => {
      expect(component.queryByTestId('GDPR')).toBeNull();
    });
  });

  it('should be able to submit the newsletter', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'newsletter',
        styles: {},
        texts: {},
        config: { alternative_widget: 'none' },
      });

    const onRegister = jest.fn();

    const { getByTestId } = render(
      <PaywallContext events={{ onregister: onRegister }}>
        <Text>Test text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      getByTestId('newsletterWidget');
    });
    const mailInput = getByTestId('mailInput');
    fireEvent(mailInput, 'focus');
    fireEvent.changeText(mailInput, 'test@test.com');
    fireEvent(mailInput, 'blur');

    const optin = getByTestId('CheckboxField/Main');
    fireEvent.press(optin);
    const releaseButton = getByTestId('releaseButton');
    fireEvent.press(releaseButton);
    await waitFor(() => {
      expect(onRegister.mock.calls.length).toBe(1);
    });
  });

  it('should return a form_empty_error', async () => {
    const { getByTestId } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const mailInput = getByTestId('mailInput');
    fireEvent(mailInput, 'focus');
    fireEvent(mailInput, 'blur');

    await waitFor(() => {
      expect(getByTestId('form_empty_error')).toBeTruthy();
    });
  });

  it('should return a newsletter_error', async () => {
    const { getByTestId } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const mailInput = getByTestId('mailInput');
    fireEvent(mailInput, 'focus');
    fireEvent.changeText(mailInput, 'some text');
    fireEvent(mailInput, 'blur');

    await waitFor(() => {
      expect(getByTestId('newsletter_error')).toBeTruthy();
    });
  });
});
