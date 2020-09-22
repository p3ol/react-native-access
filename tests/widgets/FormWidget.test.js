import React from 'react';
import { Text, Linking } from 'react-native';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';

import { AppContext } from '../../src/services/contexts';
import PaywallContext from '../../src/components/PaywallContext';
import FormWidget from '../../src/components/FormWidget';

describe('<FormWidget />', () => {

  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

  const onSubscribeClick = jest.fn();
  const onLoginClick = jest.fn();

  it('should fire onLoginClick event by clicking on login', async () => {
    const component = render(
      <PaywallContext
        onLoginClick={onLoginClick}
        onSubscribeClick={onSubscribeClick}
      >
        <Text>Test text</Text>
        <FormWidget data={{
          config: { login_button_enabled: true },
          form: {
            config: { date_format: 'yyyy/mm/dd' },
            fields: [
              {
                fieldName: 'date',
                fieldType: 'date',
                fieldKey: 'dateTest',
                fieldRequired: true,
              },
              {
                fieldName: 'mail',
                fieldType: 'email',
                fieldKey: 'mailTest',
                fieldRequired: false,
              },
            ],
            name: 'test',
          },
        }}/>
      </PaywallContext>
    );

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });
  });

  it('should set Alternative to true by clicking on no thanks', async () => {
    const context = {
      setAlternative: alternative => { context.alternative = alternative; },
      alternative: false,
      onAlternativeClick: () => {},
    };
    const component = render(
      <AppContext.Provider value={context}>
        <FormWidget />
      </AppContext.Provider>
    );
    const rejectButton = component.getByTestId('rejectButton');
    fireEvent.press(rejectButton);
    await waitFor(() => {
      expect(context.alternative).toBe(true);
    });
  });

  it('should open data processing infos by clicking on dataInfos button',
    async () => {
      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          <FormWidget />
        </PaywallContext>
      );
      const dataButton = component.getByTestId('dataButton');
      fireEvent.press(dataButton);
      await waitFor(() => {
        expect(component.getByTestId('dataInfos')).toBeTruthy();
      });
    });

  it('should be able to click on poool link in data processing infos',
    async () => {
      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          <FormWidget />
        </PaywallContext>
      );
      Linking.openUrl = jest.fn();
      const dataButton = component.getByTestId('dataButton');
      fireEvent.press(dataButton);
      const pooolData = component.getByTestId('pooolData');
      fireEvent.press(pooolData);
      await waitFor(() => {
        expect(Linking.openURL.mock.calls.length).toBe(1);
      });
    });

  it('should close data processing infos by clicking on return', async () => {
    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        <FormWidget />
      </PaywallContext>
    );
    const dataButton = component.getByTestId('dataButton');
    fireEvent.press(dataButton);
    const returnButton = component.getByTestId('returnButton');
    fireEvent.press(returnButton);
    await waitFor(() => {
      expect(component.getByTestId('formWidget')).toBeTruthy();
    });
  });

  it('should display a subscribe button that fire onSubscribeClick',
    async () => {
      const component = render(
        <PaywallContext onSubscribeClick={onSubscribeClick} >
          <Text>Test text</Text>
          <FormWidget data={{ config: { alternative_widget: 'none' } }}/>
        </PaywallContext>
      );
      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);
      await waitFor(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });
    });

  it('should display a date and an email field',
    async () => {

      const component = render(
        <PaywallContext
          onLoginClick={onLoginClick}
          onSubscribeClick={onSubscribeClick}
        >
          <Text>Test text</Text>
          <FormWidget data={{
            config: { login_button_enabled: true },
            form: {
              config: { date_format: 'yyyy/mm/dd' },
              fields: [
                {
                  fieldName: 'date',
                  fieldType: 'date',
                  fieldKey: 'dateTest',
                  fieldRequired: true,
                },
                {
                  fieldName: 'mail',
                  fieldType: 'email',
                  fieldKey: 'mailTest',
                  fieldRequired: false,
                },
              ],
              name: 'test',
            },
          }}/>
        </PaywallContext>
      );

      await waitFor(() => {
        expect(component.getByTestId('mailTest')).toBeTruthy();
        expect(component.getByTestId('dateTest')).toBeTruthy();
      });
    });

  it('should display the "form_date_ymd_error" error message',
    async () => {

      const component = render(
        <PaywallContext
          onLoginClick={onLoginClick}
          onSubscribeClick={onSubscribeClick}
        >
          <Text>Test text</Text>
          <FormWidget data={{
            config: { login_button_enabled: true },
            form: {
              config: { date_format: 'yyyy/mm/dd' },
              fields: [
                {
                  fieldName: 'date',
                  fieldType: 'date',
                  fieldKey: 'dateTest',
                  fieldRequired: true,
                },
                {
                  fieldName: 'mail',
                  fieldType: 'email',
                  fieldKey: 'mailTest',
                  fieldRequired: false,
                },
              ],
              name: 'test',
            },
          }}/>
        </PaywallContext>
      );

      const dateInput = component.getByTestId('dateTest');
      fireEvent(dateInput, 'focus');
      fireEvent.changeText(dateInput, '10/03/1998');
      fireEvent(dateInput, 'blur');
      const mailInput = component.getByTestId('mailTest');
      fireEvent.changeText(mailInput, '');
      await waitFor(() => {
        expect(component.getByTestId('form_date_ymd_error')).toBeTruthy();
      });
    });

  it('should display the "form_date_mdy_error" error message',
    async () => {
      const component = render(
        <PaywallContext
          onLoginClick={onLoginClick}
          onSubscribeClick={onSubscribeClick}
        >
          <Text>Test text</Text>
          <FormWidget data={{
            config: { login_button_enabled: true },
            form: {
              config: { date_format: 'mm/dd/yyyy' },
              fields: [
                {
                  fieldName: 'date',
                  fieldType: 'date',
                  fieldKey: 'dateTest',
                  fieldRequired: true,
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
          }}/>
        </PaywallContext>
      );
      const dateInput = component.getByTestId('dateTest');
      fireEvent(dateInput, 'focus');
      fireEvent.changeText(dateInput, '1998/10/28');
      fireEvent(dateInput, 'blur');
      const mailInput = component.getByTestId('mailTest');
      fireEvent.changeText(mailInput, '');
      await waitFor(() => {
        expect(component.getByTestId('form_date_mdy_error')).toBeTruthy();
      });

    });

  it('should display the "form_date_dmy_error" error message',
    async () => {
      const component = render(
        <PaywallContext
          onLoginClick={onLoginClick}
          onSubscribeClick={onSubscribeClick}
        >
          <Text>Test text</Text>
          <FormWidget data={{
            config: { login_button_enabled: true },
            form: {
              config: { date_format: 'dd/mm/yyyy' },
              fields: [
                {
                  fieldName: 'date',
                  fieldType: 'date',
                  fieldKey: 'dateTest',
                  fieldRequired: true,
                },
                {
                  fieldName: 'CB',
                  fieldType: 'creditCard',
                  fieldKey: 'cbTest',
                  fieldRequired: false,
                },
              ],
              name: 'test',
            },
          }}/>
        </PaywallContext>
      );
      const dateInput = component.getByTestId('dateTest');
      fireEvent(dateInput, 'focus');
      fireEvent.changeText(dateInput, '1998/10/28');
      fireEvent(dateInput, 'blur');
      await waitFor(() => {
        expect(component.getByTestId('form_date_dmy_error')).toBeTruthy();
      });
    });

  it('should display email and form empty error message & hide submitButton',
    async () => {

      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          <FormWidget data={{
            config: { login_button_enabled: true },
            form: {
              config: { date_format: 'dd/mm/yyyy' },
              fields: [
                {
                  fieldName: 'date',
                  fieldType: 'date',
                  fieldKey: 'dateTest',
                  fieldRequired: true,
                },
                {
                  fieldName: 'mail',
                  fieldType: 'email',
                  fieldKey: 'mailTest',
                  fieldRequired: false,
                },
              ],
              name: 'test',
            },
          }}/>
        </PaywallContext>
      );
      const dateInput = component.getByTestId('dateTest');
      fireEvent(dateInput, 'focus');
      fireEvent(dateInput, 'blur');
      const mailInput = component.getByTestId('mailTest');
      fireEvent(mailInput, 'focus');
      fireEvent.changeText(mailInput, 'wrong mail format');
      fireEvent(mailInput, 'blur');
      const acceptDataButton = component.getByTestId('CheckboxField/Main');
      fireEvent.press(acceptDataButton);
      const submitButton = component.getByTestId('submitButton');
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(component.getByTestId('form_email_error')).toBeTruthy();
        expect(component.getByTestId('form_empty_error')).toBeTruthy();
      });

    });

  it('should be able to click on submit and send the form',
    async () => {
      const onRelease = jest.fn();
      const component = render(
        <PaywallContext onRelease={onRelease}>
          <Text>Test text</Text>
          <FormWidget
            data={{
              config: { login_button_enabled: true },
              form: {
                config: { date_format: 'dd/mm/yyyy' },
                fields: [
                  {
                    fieldName: 'text',
                    fieldType: 'multiline',
                    fieldKey: 'textTest',
                    fieldRequired: true,
                  },
                  {
                    fieldName: 'mail',
                    fieldType: 'email',
                    fieldKey: 'mailTest',
                    fieldRequired: true,
                  },
                  {
                    fieldName: 'date',
                    fieldType: 'date',
                    fieldKey: 'dateTest',
                    fieldRequired: true,
                  },
                ],
                name: 'test',
              },
            }}
            release={() => {}}
          />
        </PaywallContext>
      );
      const textInput = component.getByTestId('textTest');
      fireEvent(textInput, 'focus');
      fireEvent.changeText(textInput, 'test');
      fireEvent(textInput, 'blur');
      const dateInput = component.getByTestId('dateTest');
      fireEvent(dateInput, 'focus');
      fireEvent.changeText(dateInput, '10/03/1998');
      fireEvent(dateInput, 'blur');
      const mailInput = component.getByTestId('mailTest');
      fireEvent(mailInput, 'focus');
      fireEvent.changeText(mailInput, 'test@test.fr');
      fireEvent(mailInput, 'blur');
      const acceptDataButton = component.getByTestId('CheckboxField/Main');
      fireEvent.press(acceptDataButton);
      const submitButton = component.getByTestId('submitButton');
      fireEvent.press(submitButton);
      await waitFor(() => {
        expect(onRelease.mock.calls.length).toBe(1);
      });
    });
});
