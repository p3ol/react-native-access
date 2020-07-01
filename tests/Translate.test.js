import nock from 'nock';
import React from 'react';
import { Button, Text } from 'react-native';
import { render, wait, getNodeText } from '@testing-library/react-native';

import Translate from '../src/paywall/components/Translate';
import Widget from '../src/paywall/components/Widget';
import PaywallContext from '../src/paywall/components/PaywallContext';

describe('<Paywall />', () => {

  it('should return the rigth text component according to the textkey',
    async () => {

      const component = render(
        <Translate
          testID='title'
          textKey={'question_title'}
        />
      );

      const title = component.getByTestId('title');

      await wait(() => {
        expect(getNodeText(title))
          .toEqual('Cet article offert contre votre avis !');
      });

    });

  it('should return the rigth string according to the textkey',
    async () => {

      const component = render(
        <Translate
          textKey={'link_button'}
          asString={true}
        >
          {({ text }) => (
            <Button
              testID="linkButton"
              title={text}
            />
          )}
        </Translate>
      );

      const linkButton = component.getByTestId('linkButton');
      await wait(() => {
        expect(getNodeText(linkButton))
          .toEqual('Visiter la page');
      });

    });

  it('should return the rigth text component according to specified locale',
    async () => {

      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'question',
          styles: {},
          texts: {},
          config: {
            locale: 'en',
          },
        });

      const component = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <Widget />
        </PaywallContext>
      );

      await wait(() => {
        const title = component.getByTestId('title');
        expect(getNodeText(title))
          .toEqual('This article in exchange for your opinion!');
      });

    });

  it('should override the expected return Text by the data text value',
    async () => {

      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'question',
          styles: {},
          texts: { question_title: 'test title' },
          config: {
            locale: 'fr',
          },
        });

      const component = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <Widget />
        </PaywallContext>
      );

      await wait(() => {
        const title = component.getByTestId('title');
        expect(getNodeText(title))
          .toEqual('test title');
      });

    });

  it('should replace the app_name variable by its value ',
    async () => {

      nock('https://api.poool.develop:8443/api/v3')
        .post('/access/track')
        .reply(200, {
          action: 'gift',
          styles: {},
          texts: { gift_desc: '{app_name}' },
          config: {
            app_name: 'Test App',
          },
        });

      const component = render(
        <PaywallContext>
          <Text> Test Text </Text>
          <Widget />
        </PaywallContext>
      );

      await wait(() => {
        const description = component.getByTestId('description');
        expect(getNodeText(description))
          .toEqual('Test App');
      });

    });
});
