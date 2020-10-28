import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import FormWidget from '../../src/components/FormWidget';
import Paywall from '../../src/components/paywall';

describe('<FormWidget />', () => {

  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

  it('should display GDPR by clicking the GDPR button', async () => {
    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        <FormWidget />
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
        <FormWidget />
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

  it('should be able to submit the form', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'form',
        styles: {},
        texts: {},
        config: { alternative_widget: 'none' },
        form: {
          config: {},
          fields: [
            {
              fieldName: 'text',
              fieldType: 'multiline',
              fieldKey: 'textTest',
              fieldRequired: true,
            },
            {
              fieldName: 'cb',
              fieldType: 'creditCard',
              fieldKey: 'cardTest',
              fieldRequired: false,
            },
            {
              fieldName: 'date',
              fieldType: 'date',
              fieldKey: 'dateTest',
              fieldRequired: false,
            },
            {
              fieldName: 'mail',
              fieldType: 'email',
              fieldKey: 'mailTest',
              fieldRequired: true,
            },
          ],
          name: 'test',
        },
      });

    const onFormSubmit = jest
      .fn()
      .mockImplementationOnce(() => []);

    const { getByTestId } = render(
      <PaywallContext events={{ onformsubmit: onFormSubmit }}>
        <Text>Test text</Text>
        <Paywall />
      </PaywallContext>
    );
    await waitFor(() => {
      getByTestId('formWidget');
    });

    const textField = getByTestId('textTest');
    fireEvent(textField, 'focus');
    fireEvent.changeText(textField, 'test');
    fireEvent(textField, 'blur');

    const mailField = getByTestId('mailTest');
    fireEvent(mailField, 'focus');
    fireEvent.changeText(mailField, 'test@test.com');
    fireEvent(mailField, 'blur');

    const dateField = getByTestId('dateTest');
    fireEvent(dateField, 'focus');
    fireEvent.changeText(dateField, '27');
    fireEvent(dateField, 'blur');

    fireEvent(dateField, 'focus');
    fireEvent.changeText(dateField, '27/10/2020');
    fireEvent(dateField, 'blur');

    const optin = getByTestId('CheckboxField/Main');
    fireEvent.press(optin);
    const releaseButton = getByTestId('releaseButton');
    fireEvent.press(releaseButton);
    await waitFor(() => {
      expect(onFormSubmit.mock.calls.length).toBe(1);
    });
  });

  it('should return the form_date_mdy_error & keep submit button disabled',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'form',
          styles: {},
          texts: {},
          config: { alternative_widget: 'none' },
          form: {
            config: { date_format: 'mm/dd/yyyy' },
            fields: [
              {
                fieldName: 'date',
                fieldType: 'date',
                fieldKey: 'dateTest',
                fieldRequired: true,
              },
            ],
            name: 'test',
          },
        });
      const { getByTestId } = render(
        <PaywallContext>
          <Text>Test text</Text>
          <Paywall />
        </PaywallContext>
      );
      await waitFor(() => {
        getByTestId('formWidget');
      });

      const dateField = getByTestId('dateTest');
      fireEvent(dateField, 'focus');
      fireEvent.changeText(dateField, '27/10/2020');
      fireEvent(dateField, 'blur');

      const releaseButton = getByTestId('releaseButton');

      await waitFor(() => {
        expect(getByTestId('form_date_mdy_error')).toBeTruthy();
        expect(releaseButton).toBeDisabled();
      });

    });

  it('should return the form_date_ymd_error & keep submit button disabled',
    async () => {
      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'form',
          styles: {},
          texts: {},
          config: { alternative_widget: 'none' },
          form: {
            config: { date_format: 'yyyy/mm/dd' },
            fields: [
              {
                fieldName: 'date',
                fieldType: 'date',
                fieldKey: 'dateTest',
                fieldRequired: true,
              },
            ],
            name: 'test',
          },
        });
      const { getByTestId } = render(
        <PaywallContext>
          <Text>Test text</Text>
          <Paywall />
        </PaywallContext>
      );
      await waitFor(() => {
        getByTestId('formWidget');
      });

      const dateField = getByTestId('dateTest');
      fireEvent(dateField, 'focus');
      fireEvent.changeText(dateField, '27/10/2020');
      fireEvent(dateField, 'blur');

      const releaseButton = getByTestId('releaseButton');

      await waitFor(() => {
        expect(getByTestId('form_date_ymd_error')).toBeTruthy();
        expect(releaseButton).toBeDisabled();
      });

    });

  it('should diplay a custom error returned by the publisher', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'form',
        styles: {},
        texts: {},
        config: { alternative_widget: 'none' },
        form: {
          config: { date_format: 'dd/mm/yyyy' },
          fields: [
            {
              fieldName: 'text',
              fieldType: 'text',
              fieldKey: 'textTest',
              fieldRequired: true,
            },
          ],
          name: 'test',
        },
      });
    const onFormSubmit = () => {
      return [{ fieldKey: 'textTest', message: 'custom_error_message' }];
    };

    const { getByTestId } = render(
      <PaywallContext events={{ onformsubmit: onFormSubmit }}>
        <Text>Test text</Text>
        <Paywall />
      </PaywallContext>
    );

    await waitFor(() => {
      getByTestId('formWidget');
    });

    const textField = getByTestId('textTest');
    fireEvent(textField, 'focus');
    fireEvent.changeText(textField, 'test');
    fireEvent(textField, 'blur');

    const optin = getByTestId('CheckboxField/Main');
    fireEvent.press(optin);
    const releaseButton = getByTestId('releaseButton');
    fireEvent.press(releaseButton);

    await waitFor(() => {
      const error = getByTestId('custom_error_message');
      expect(error).toBeTruthy();
    });
  });
});
