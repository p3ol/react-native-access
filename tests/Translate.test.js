import React from 'react';
import { Button, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import Translate from '../src/components/Translate';
import PaywallContext from '../src/components/PaywallContext';

describe('<Translate />', () => {

  it('should return the right text component', async () => {

    const { getByText } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <Translate
          testID='title'
          textKey={'question_title'}
        />
      </PaywallContext >
    );

    const title = getByText('Cet article offert contre votre avis !');
    expect(title).toBeTruthy();

  });

  it('should return the rigth string', async () => {

    const { getByText } = render(
      <PaywallContext>
        <Text>Test text</Text>
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
      </PaywallContext>
    );

    const button = getByText('Visiter la page');
    expect(button).toBeTruthy();

  });

  it('should return the rigth text component according to specified locale',
    async () => {
      const { getByText } = render(
        <PaywallContext config={{ locale: 'en' }}>
          <Text>Test text</Text>
          <Translate
            testID='title'
            textKey={'question_title'}
          />
        </PaywallContext>
      );

      const title = getByText('This article in exchange for your opinion!');
      expect(title).toBeTruthy();
    });

  it('should replace app_name and count in the translation', async () => {
    const { getByText } = render(
      <PaywallContext
        config={{ app_name: 'test app' }}
        texts={{ test: '{app_name}/{count}' }}
      >
        <Text>Test text</Text>
        <Translate
          testID='title'
          textKey={'test'}
          replace={{ app_name: true, count: true }}
        />
      </PaywallContext>
    );
    const appName = getByText('test app/0');
    expect(appName).toBeTruthy();
  });

});
