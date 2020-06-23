import React, {
  useContext,
  useReducer,
  forwardRef,
  useImperativeHandle } from 'react';
import {
  View,
  Image,
  Button,
  Linking,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';
import Translate from './Translate';
import GDPR from './GDPR';

import { defaultStyles } from '../theme/styles';

const NewsletterWidget = forwardRef(({
  data,
  release,
  register,
  widget,
}, ref) => {

  const {
    onDataPolicyClick,
    setAlternative,
    onLoginClick,
    onRegister,
    onRelease,
    onSubscribeClick,
  } = useContext(AppContext);

  const [state, dispatch] = useReducer(mockState, {
    approve: false,
    mail: '',
    optin: 'closed',
    inputFocused: true,
  });

  useImperativeHandle(ref, () => ({
    mail: state.mail,
  }));

  /* eslint-disable-next-line */
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (state.optin === 'closed') {
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
          textKey={'newsletter_title'}
          style={defaultStyles.title}
        />

        <Translate
          textKey={'newsletter_desc'}
          style={defaultStyles.text}
          replace={{
            newsletter_name: data?.config.newsletter_name,
          }}/>

        <Translate
          textKey={'newsletter_input'}
          asString={true}
        >
          { ({ text }) => (
            <TextInput
              testID="mailInput"
              style={state.inputFocused
                ? defaultStyles.input
                : emailRegex.test(state.mail)
                  ? defaultStyles.inputCorrect
                  : defaultStyles.inputWrong
              }
              placeholder={text.toString()}
              onChange={e => dispatch({ mail: e.target.value })}
              onFocus={() => dispatch({ inputFocused: true })}
              onBlur={() => dispatch({ inputFocused: false })}
            />
          )}
        </Translate>

        { !state.inputFocused && !emailRegex.test(state.mail)
          ? state.mail === ''
            ? <Translate
              textKey={'form_empty_error'}
              style={defaultStyles.inputWarning}
              testID="warningMessage"
            />
            : <Translate
              textKey={'form_email_error'}
              style={defaultStyles.inputWarning}
              testID="warningMessage"
            />
          : null
        }

        <Translate
          testID="acceptDataButton"
          style={defaultStyles.authorization}
          onPress={() => {
            dispatch({ approve: !state.approve });
          }}
          textKey={'newsletter_desc'}
          replace={{
            newsletter_name: data?.config.newsletter_name,
          }}
        />

        <Translate
          textKey={'newsletter_optin_link'}
          testID="dataButton"
          style={defaultStyles.subaction}
          onPress={() => {
            dispatch({ optin: 'open' });
            onDataPolicyClick();
          }}
        />

        <Translate textKey={'newsletter_button'} asString={true}>
          {({ text }) => (
            <Button
              testID="registerButton"
              title={text}
              style={defaultStyles.actions}
              disabled={ !(state.approve && emailRegex.test(state.mail))}
              color={data?.styles?.button_color}
              onPress={() => {
                onRelease();
                onRegister();
                release();
                register(state.mail);
              }}
            />
          )}
        </Translate>

        <View style={defaultStyles.subactions_container}>
          {data?.config.login_button_enabled &&
            <Translate
              textKey={'login_link'}
              testID="loginButton"
              style={defaultStyles.subaction}
              onPress={e => {
                Linking.openURL(data?.config.login_url);
                onLoginClick(
                  widget,
                  e?.target,
                  data?.config.login_url
                );
              }}
            />
          }
          { data?.config.alternative_widget !== 'none'
            ? <Translate
              textKey={'no_thanks'}
              testID="rejectButton"
              style={defaultStyles.subaction}
              onPress={() => setAlternative(true)}
            />
            : <Translate
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
              }}/>
          }
        </View>

      </View>
    );
  } else {
    return (
      <GDPR onBackClick={() => dispatch({ optin: 'closed' })}/>
    );
  }
});

NewsletterWidget.propTypes = {
  data: PropTypes.object,
  register: PropTypes.func,
  release: PropTypes.func,
  widget: PropTypes.string,
};

NewsletterWidget.displayName = 'NewsletterWidget';

export default NewsletterWidget;
