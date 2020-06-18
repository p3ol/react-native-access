import React from 'react';
import { Text, Linking } from 'react-native';
import {
  render,
  wait,
  fireEvent,
  getNodeText,
} from '@testing-library/react-native';
import { shallow } from 'enzyme';

import { AppContext } from '../../src/paywall/services/contexts';
import PaywallContext from '../../src/paywall/components/PaywallContext';
import NewsletterWidget from '../../src/paywall/components/NewsletterWidget';

describe('<NewsletterWidget />', () => {

  it('should render without issues', async () => {
    const component = shallow(< NewsletterWidget />);

    expect(component.length).toBe(1);

  });

  it('should fire onLoginClick event by clicking on login', async () => {

    const onLoginClick = jest.fn();

    const component = render(
      <PaywallContext onLoginClick={onLoginClick} >
        <Text>Test text</Text>
        < NewsletterWidget data={{ config: { login_button_enabled: true } }}/>
      </PaywallContext>
    );

    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);

    await wait(() => {
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
        < NewsletterWidget/>
      </AppContext.Provider >
    );

    const rejectButton = component.getByTestId('rejectButton');
    fireEvent.press(rejectButton);

    await wait(() => {
      expect(context.alternative).toBe(true);
    });

  });

  it('should open data processing infos by clicking on dataInfos button',
    async () => {

      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          < NewsletterWidget/>
        </PaywallContext>
      );

      const dataButton = component.getByTestId('dataButton');
      fireEvent.press(dataButton);

      await wait(() => {
        expect(component.getByTestId('dataInfos')).toBeTruthy();
      });

    });

  it('should be able to click on poool link in data processing infos',
    async () => {

      const component = render(
        <PaywallContext>
          <Text>Test text</Text>
          < NewsletterWidget/>
        </PaywallContext>
      );

      Linking.openUrl = jest.fn();

      const dataButton = component.getByTestId('dataButton');
      fireEvent.press(dataButton);
      const pooolData = component.getByTestId('pooolData');
      fireEvent.press(pooolData);

      await wait(() => {
        expect(Linking.openURL.mock.calls.length).toBe(1);
      });

    });

  it('should close data processing infos by clicking on return', async () => {

    const component = render(
      <PaywallContext>
        <Text>Test text</Text>
        < NewsletterWidget/>
      </PaywallContext>
    );

    const dataButton = component.getByTestId('dataButton');
    fireEvent.press(dataButton);
    const returnButton = component.getByTestId('returnButton');
    fireEvent.press(returnButton);

    await wait(() => {
      expect(component.getByTestId('newsletterWidget')).toBeTruthy();
    });

  });

  it('should display a subscribe button that fire onSubscribeClick',
    async () => {

      const onSubscribeClick = jest.fn();

      const component = render(
        <PaywallContext onSubscribeClick={onSubscribeClick} >
          <Text>Test text</Text>
          < NewsletterWidget data={{ config: { alternative_widget: 'none' } }}/>
        </PaywallContext>
      );

      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);

      await wait(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });

    });

  // it('should be able to click on registerButton',
  //   async () => {
  //
  //     const onRegister = jest.fn();
  //
  //     const component = render(
  //       <PaywallContext onRegister={onRegister} >
  //         <Text>Test text</Text>
  //         < NewsletterWidget/>
  //       </PaywallContext>
  //     );
  //
  //     const mailInput = component.getByTestId('mailInput');
  //     fireEvent.changeText(mailInput, 'test@poool.fr');
  //
  //     const acceptDataButton = component.getByTestId('acceptDataButton');
  //     fireEvent.press(acceptDataButton);
  //
  //     const registerButton = component.getByTestId('registerButton');
  //     fireEvent.press(registerButton);
  //
  //     console.log(getNodeText(mailInput));
  //
  //     await wait(() => {
  //       expect(onRegister.mock.calls.length).toBe(1);
  //     });
  //
  //   });

});
