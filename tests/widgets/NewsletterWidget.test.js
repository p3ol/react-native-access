import React, { createRef } from 'react';
import { Text, Linking } from 'react-native';
import {
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react-native';
import { shallow } from 'enzyme';

import { AppContext } from '../../src/services/contexts';
import PaywallContext from '../../src/components/PaywallContext';
import NewsletterWidget from '../../src/components/NewsletterWidget';

describe('<NewsletterWidget />', () => {

  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

  it('should render without issues', async () => {
    const component = shallow(<NewsletterWidget />);
    await waitFor(() => expect(component.length).toBe(1));
  });

  it('should fire onLoginClick event by clicking on login', async () => {
    const onLoginClick = jest.fn();
    const component = render(
      <PaywallContext onLoginClick={onLoginClick} >
        <Text>Test text</Text>
        <NewsletterWidget data={{ config: { login_button_enabled: true } }} />
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
    };
    const component = render(
      <AppContext.Provider value={context}>
        <NewsletterWidget />
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
          <NewsletterWidget />
        </PaywallContext>
      );
      const dataButton = component.getByTestId('dataButton');
      fireEvent.press(dataButton);
      await waitFor(() => {
        expect(component.getByTestId('dataInfos')).toBeTruthy();
      });
    });

  it('should be able to click links in data processing infos',
    async () => {
      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          <NewsletterWidget />
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
        <NewsletterWidget />
      </PaywallContext>
    );
    const dataButton = component.getByTestId('dataButton');
    fireEvent.press(dataButton);
    const returnButton = component.getByTestId('returnButton');
    fireEvent.press(returnButton);
    await waitFor(() => {
      expect(component.getByTestId('newsletterWidget')).toBeTruthy();
    });
  });

  it('should display a subscribe button that fire onSubscribeClick',
    async () => {
      const onSubscribeClick = jest.fn();
      const component = render(
        <PaywallContext onSubscribeClick={onSubscribeClick} >
          <Text>Test text</Text>
          <NewsletterWidget data={{ config: { alternative_widget: 'none' } }}/>
        </PaywallContext>
      );
      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);
      await waitFor(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });

    });

  it('should be able to click on registerButton',
    async () => {
      const ref = createRef();
      const onRelease = jest.fn();
      const component = render(
        <PaywallContext onRelease={onRelease} >
          <Text>Test text</Text>
          <NewsletterWidget
            register={() => {}}
            ref={ref}
            release={() => {}}
          />
        </PaywallContext>
      );
      const mailInput = component.getByTestId('mailInput');
      fireEvent(mailInput, 'focus');
      fireEvent.changeText(mailInput, 'test@poool.fr');
      fireEvent(mailInput, 'blur');
      expect(ref.current.mail).toBe('test@poool.fr');
      const acceptDataButton = component.getByTestId('CheckboxField/Main');
      fireEvent.press(acceptDataButton);
      const registerButton = component.getByTestId('registerButton');
      fireEvent.press(registerButton);
      await waitFor(() => {
        expect(onRelease.mock.calls.length).toBe(1);
      });
    });

  it('should display a warning on a wrong mail format input',
    async () => {
      const ref = createRef();
      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          <NewsletterWidget ref={ref} />
        </PaywallContext>
      );
      const mailInput = component.getByTestId('mailInput');
      fireEvent.changeText(mailInput, 'wrong#mail.fr');
      fireEvent(mailInput, 'blur');
      await waitFor(() => {
        expect(component.getByTestId('warningMessage')).toBeTruthy();
      });
    });

  it('should display a warning on a missing mail input',
    async () => {
      const ref = createRef();
      const context = {
        trackData: {
          config: {
            locale: 'fr',
          },
        },
      };
      const component = render(
        <AppContext.Provider value={context}>
          <Text>Test text</Text>
          <NewsletterWidget ref={ref} />
        </AppContext.Provider>
      );

      await waitFor(() => {
        component.getByTestId('mailInput');
      });
      const mailInput = component.getByTestId('mailInput');
      fireEvent(mailInput, 'blur');

      // this error/warning happens when I use more than 1 await waitFor
      // within a it statement
      // await waitFor(() => component.getByTestId('warningMessage'));
      const warningMessage = component.getByTestId('warningMessage');
      expect(warningMessage).toBeTruthy();
    });
});
