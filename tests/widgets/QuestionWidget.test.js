import nock from 'nock';
import React from 'react';
import { Text } from 'react-native';
import { render, waitFor, fireEvent } from '@testing-library/react-native';

import PaywallContext from '../../src/components/PaywallContext';
import QuestionWidget from '../../src/components/QuestionWidget';
import Paywall from '../../src/components/Paywall';

describe('<QuestionWidget />', () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it('should release the paywall by clicking an answer', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .get('/access/question')
      .reply(200, {
        question: {
          answers: ['answer0', 'answer1'],
        },
      });
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/question/answer')
      .reply(200, { success: true });

    const onAnswer = jest.fn();

    const { findByTestId } = render(
      <PaywallContext events={{ onanswer: onAnswer }} >
        <Text>Test text</Text>
        <QuestionWidget/>
      </PaywallContext>
    );

    const answer = await findByTestId('answer0');

    fireEvent.press(answer);

    await waitFor(() => expect(onAnswer.mock.calls.length).toBe(1));

  });

  it('should get the question returned by track', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .post('/access/track')
      .reply(200, {
        action: 'question',
        question: { text: 'it is a test ?', answers: ['test'] },
        config: { questionId: 'test' },
      });

    const onAnswer = jest.fn();

    const { findByText, findByTestId } = render(
      <PaywallContext events={{ onanswer: onAnswer }} >
        <Text>Test text</Text>
        <Paywall/>
      </PaywallContext>
    );

    const question = await findByText('it is a test ?');
    const answer = await findByTestId('test');

    expect(question).toBeTruthy();
    expect(answer).toBeTruthy();

  });

  it('should throw a warning when there is no question', async () => {

    global.console = { warn: jest.fn() };

    render(
      <PaywallContext>
        <Text>Test text</Text>
        <QuestionWidget/>
      </PaywallContext>
    );

    await waitFor(() => expect(console.warn.mock.calls.length).toBe(1));

  });

  it('should throw a warning when the answer cannot be posted', async () => {
    nock('https://api.poool.develop:8443/api/v3')
      .get('/access/question')
      .reply(200, {
        question: {
          answers: ['answer0', 'answer1'],
        },
      });

    global.console = { warn: jest.fn() };

    const { findByTestId } = render(
      <PaywallContext>
        <Text>Test text</Text>
        <QuestionWidget/>
      </PaywallContext>
    );

    const answer = await findByTestId('answer0');

    fireEvent.press(answer);

    await waitFor(() => expect(console.warn.mock.calls.length).toBe(1));

  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
