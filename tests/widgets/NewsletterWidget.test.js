import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import NewsletterWidget from '../../src/components/NewsletterWidget';

describe('<NewsletterWidget />', () => {

  it('should display GDPR by clicking the GDPR button', async () => {
    const { getByTestId, queryByTestId } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const gdprlink = getByTestId('GDPRLink');
    fireEvent.press(gdprlink);
    expect(queryByTestId('GDPR')).toBeTruthy();
  });

  it('should close GDPR by clicking the back button', async () => {
    const { getByTestId, queryByTestId } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    const gdprlink = getByTestId('GDPRLink');
    fireEvent.press(gdprlink);
    const backButton = getByTestId('backButton');
    fireEvent.press(backButton);
    expect(queryByTestId('GDPR')).toBeNull();
  });

  it('should be able to submit the newsletter', async () => {
    const onRegister = jest.fn();
    const { getByTestId, findByTestId } = render(
      <PaywallContext
        events={{ onregister: onRegister }}
        config={{ alternative_widget: 'none' }}>
        <Text>Test text</Text>
        <NewsletterWidget />
      </PaywallContext>
    );
    await findByTestId('newsletterWidget');
    const mailInput = getByTestId('mailInput');
    fireEvent(mailInput, 'focus');
    fireEvent.changeText(mailInput, 'test@test.com');
    fireEvent(mailInput, 'blur');

    const optin = getByTestId('CheckboxField/Main');
    fireEvent.press(optin);
    const releaseButton = getByTestId('releaseButton');
    fireEvent.press(releaseButton);
    expect(onRegister.mock.calls.length).toBe(1);
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

    expect(getByTestId('form_empty_error')).toBeTruthy();
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

    expect(getByTestId('newsletter_error')).toBeTruthy();
  });

});
