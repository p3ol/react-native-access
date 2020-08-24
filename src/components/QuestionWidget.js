import React, { useContext, useEffect, useState } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { getQuestion, postAnswer } from '@poool/sdk';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';

import Translate from './Translate';

import { texts, layouts } from '../styles';

const QuestionWidget = ({ data, release, widget }) => {

  const [question, setQuestion] = useState();

  useEffect(() => {
    retrieveQuestion();
  }, []);

  const {
    onLoginClick,
    onError,
    onRelease,
    onSubscribeClick,
  } = useContext(AppContext);

  const retrieveQuestion = async () => {
    try {
      const question = await getQuestion();
      setQuestion(question);
    } catch (e) {
      onError(e);
    }
  };

  const answering = async (questionId, answer, options) => {
    try {
      await postAnswer(questionId, answer, options);
    } catch (e) {
      onError(e);
    }
  };

  return (
    <View
      style={layouts.widget}
      testID="questionWidget"
    >
      <Translate
        testID="title"
        textKey="question_title"
        style={texts.title}
      />

      <Translate
        textKey="question_desc"
        style={texts.desc}
      />

      <Text style={texts.question}>
        {question?.question.text}
      </Text>
      <View>
        {
          question?.question.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              testID={answer}
              style={layouts.answer}
              onPress={() => {
                onRelease({
                  widget: data?.action,
                  actionName: data?.actionName,
                });
                release();
                answering(
                  question?.question._id,
                  answer,
                  { body: { cookiesEnabled: true } }
                );
              }}
            >
              <Text>{answer}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      <View style={layouts.subactions[data?.styles?.layout]}>
        {data?.config?.login_button_enabled &&
          <Translate
            textKey="login_link"
            testID="loginButton"
            style={texts.subaction[data?.styles?.layout]}
            onPress={e => {
              Linking.openURL(data?.config?.login_url);
              onLoginClick({
                widget: widget,
                button: e?.target,
                originalEvent: e,
                url: data?.config.login_url,
              });
            }}
          />
        }
        <Translate
          textKey="subscribe_link"
          testID="subscribeButton"
          style={texts.subaction[data?.styles?.layout]}
          onPress={e => {
            Linking.openURL(data?.config.subscription_url);
            onSubscribeClick({
              widget: widget,
              button: e?.target,
              originalEvent: e,
              url: data?.config.login_url,
            });
          }}
        />
      </View>

    </View>
  );
};

QuestionWidget.propTypes = {
  data: PropTypes.object,
  release: PropTypes.func,
  widget: PropTypes.string,
};

QuestionWidget.displayName = 'QuestionWidget';

export default QuestionWidget;
