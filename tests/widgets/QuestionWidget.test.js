import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import { render, wait, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import QuestionWidget from '../../src/components/QuestionWidget';

describe('<QuestionWidget />', () => {

  jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity',
    () => 'TouchableOpacity');
  const onLoginClick = jest.fn();
  const onSubscribeClick = jest.fn();
  const component = render(
    <PaywallContext
      onLoginClick={onLoginClick}
      onSubscribeClick={onSubscribeClick}
    >
      <Text>Test text</Text>
      <QuestionWidget
        release={() => {}}
        data={{
          config: { login_button_enabled: true },
        }}
      />
    </PaywallContext>
  );

  it('should release the paywall by clicking an answer', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .get('/access/question/roll')
      .reply(200, {
        question: {
          answers: ['answer0', 'answer1'],
        },
      });
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/question/answer')
      .reply(200, {});
    const onRelease = jest.fn();
    const component = render(
      <PaywallContext onRelease={onRelease} >
        <Text>Test text</Text>
        <QuestionWidget release={() => {}} />
      </PaywallContext>
    );
    await wait(() => {
      const answer = component.getByTestId('answer0');
      fireEvent.press(answer);
      expect(onRelease.mock.calls.length).toBe(1);
    });

  });

  it('should throw an error when it cannot get a question', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .get('/access/question/roll')
      .replyWithError('cannot get a question');
    const onError = jest.fn();
    const component = render(
      <PaywallContext onError={onError}>
        <Text>Test text</Text>
        <QuestionWidget release={() => {}} />
      </PaywallContext>
    );
    await wait(() => {
      expect(component.getByTestId('questionWidget')).toBeDefined();
      expect(onError.mock.calls.length).toBe(1);
    });

  });

  it('should throw an error when it cannot post an answer', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .get('/access/question/roll')
      .reply(200, {
        question: {
          answers: ['answer0', 'answer1'],
        },
      });
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/question/answer')
      .replyWithError('cannot post an answer');
    const onError = jest.fn();
    const component = render(
      <PaywallContext onError={onError}>
        <Text>Test text</Text>
        <QuestionWidget release={() => {}} />
      </PaywallContext>
    );
    await wait(() => {
      const answer = component.getByTestId('answer0');
      fireEvent.press(answer);
      expect(onError.mock.calls.length).toBe(1);
    });

  });

  it('should fire onLoginClick event by clicking on login', async () => {
    const loginButton = component.getByTestId('loginButton');
    fireEvent.press(loginButton);
    await wait(() => {
      expect(onLoginClick.mock.calls.length).toBe(1);
    });

  });

  it('should fire onSubscribeClick event by clicking on subscribe',
    async () => {
      const subscribeButton = component.getByTestId('subscribeButton');
      fireEvent.press(subscribeButton);
      await wait(() => {
        expect(onSubscribeClick.mock.calls.length).toBe(1);
      });

    });

});
