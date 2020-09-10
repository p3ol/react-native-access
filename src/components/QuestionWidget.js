import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getQuestion, postAnswer } from '@poool/sdk';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';

import Translate from './Translate';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';

import { texts, layouts } from '../styles';

const QuestionWidget = ({ data, release }) => {

  const [question, setQuestion] = useState();

  useEffect(() => {
    retrieveQuestion();
  }, []);

  const { onError, onRelease } = useContext(AppContext);

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

  const onPress = answer => {
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
              onPress={onPress.bind(null, answer)}
            >
              <Text>{answer}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      <View style={layouts.subactions[data?.styles?.layout]}>
        { data?.config?.login_button_enabled && <LoginLink /> }
        <SubscribeLink />
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
