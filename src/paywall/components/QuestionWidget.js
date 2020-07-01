import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {
  getQuestion,
  postAnswer,
} from '@poool/sdk';

import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { defaultStyles } from '../theme/styles';

const QuestionWidget = ({ data, release, widget }) => {

  const [question, setQuestion] = useState();

  useEffect(() => {
    init();
  }, []);

  const {
    onLoginClick,
    onRelease,
    onSubscribeClick,
  } = useContext(AppContext);

  const init = async () => {
    setQuestion(await getaQuestion());
  };

  const getaQuestion = async () => {
    try {
      const question = await getQuestion();
      return question;
    } catch (e) {
      console.error(e);
    }
  };

  const answering = async (questionId, answer, options) => {
    try {
      await postAnswer(questionId, answer, options);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View
      style={defaultStyles.container}
      testID="newsletterWidget"
    >

      <Image
        style={defaultStyles.logo}
        source={{ uri: data?.styles?.brand_logo }}
      />

      <Translate
        textKey={'question_title'}
        style={defaultStyles.title}
      />

      <Translate
        textKey={'question_desc'}
        style={defaultStyles.text}
      />

      <Text style={defaultStyles.question}>
        {question?.question.text}
      </Text>
      <View>
        {
          question?.question.answers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              testID={answer}
              style={defaultStyles.answer}
              onPress={() => {
                onRelease();
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
      <View style={defaultStyles.subactions_container}>
        {data?.config?.login_button_enabled &&
          <Translate
            textKey={'login_link'}
            testID="loginButton"
            style={defaultStyles.subaction}
            onPress={e => {
              Linking.openURL(data?.config?.login_url);
              onLoginClick(
                widget,
                e?.target,
                data?.config?.login_url
              );
            }}
          />
        }
        <Translate
          textKey={'subscribe_link'}
          testID="subscribeButton"
          style={defaultStyles.subaction}
          onPress={e => {
            Linking.openURL(data?.config.subscription_url);
            onSubscribeClick(
              widget,
              e?.target,
              data?.config.subscription_url
            );
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
