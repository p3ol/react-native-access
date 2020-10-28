import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { getQuestion, postAnswer } from '@poool/sdk';

import { AppContext } from '../services/contexts';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import Translate from './Translate';
import WidgetContent from './WidgetContent';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';

import { commons, applyStyles, colors } from '../styles';

const QuestionWidget = () => {
  const { getStyle, doRelease } = useContext(AppContext);

  const [question, setQuestion] = useState();

  useEffect(() => {
    retrieveQuestion();
  }, []);

  const retrieveQuestion = async () => {
    try {
      const question = await getQuestion();
      setQuestion(question);
    } catch (e) {
      console.warn('Cannot retrieve oroginal question', e);
    }
  };

  const sendResponse = async (questionId, answer, options) => {
    try {
      await postAnswer(questionId, answer, options);
    } catch (e) {
      console.warn('Cannot post the answer', e);
    }
  };

  const onPress = answer => {
    sendResponse(
      question?.question._id,
      answer,
      { body: { cookiesEnabled: true } }
    );
    doRelease();
  };

  return (
    <View testID="questionWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate textKey="question_title" style={commons.title} />
        <Translate
          textKey="question_desc"
          style={commons.description}
          replace={{ app_name: true }}
        />
        <Text style={styles.question}>
          {question?.question.text}
        </Text>
        <View style={styles.answers}>
          {
            question?.question.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                testID={answer}
                style={styles.answer}
                onPress={onPress.bind(null, answer)}
              >
                <Text>{answer}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View
          style={[
            commons.subActions,
            applyStyles(getStyle('layout') === 'landscape', [
              commons.subActions__landscape,
            ]),
          ]}
        >
          <LoginLink />
          <SubscribeLink />
        </View>
      </WidgetContent>
    </View>
  );
};

const styles = {
  question: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 28,
  },
  answers: {
    marginTop: 20,
  },
  answer: {
    backgroundColor: colors.gallery,
    borderColor: colors.shuttleGray,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    marginBottom: 15,
  },
};

QuestionWidget.propTypes = {};

QuestionWidget.displayName = 'QuestionWidget';

export default QuestionWidget;
