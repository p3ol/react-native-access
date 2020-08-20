import nock from 'nock';
import React from 'react';
import { Button, Text } from 'react-native';
import { render, waitFor } from '@testing-library/react-native';

import Translate from '../src/components/Translate';
import Widget from '../src/components/Widget';
import PaywallContext from '../src/components/PaywallContext';

describe('<Translate />', () => {

  it('should return the rigth text component according to the textkey',
    async () => {

      const component = render(
        <Translate
          testID='title'
          textKey={'question_title'}
        />
      );

      const title = component.getByText(
        'Cet article offert contre votre avis !');

      await waitFor(() => {
        expect(title).toBeTruthy();
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

      const linkButton = component.getByText('Visiter la page');
      await waitFor(() => {
        expect(linkButton).toBeTruthy();
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

      await waitFor(() => {
        const title = component.getByText(
          'This article in exchange for your opinion!');

        expect(title).toBeTruthy();
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

      await waitFor(() => {
        const title = component.getByText('test title');
        expect(title).toBeTruthy();
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

      await waitFor(() => {
        const description = component.getByText('Test App');
        expect(description).toBeTruthy();
      });

    });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });
});
