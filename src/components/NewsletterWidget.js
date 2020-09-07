import React, {
  useContext,
  useReducer,
  forwardRef,
  useImperativeHandle } from 'react';
import { Button, View } from 'react-native';
import { CheckboxField, TextField } from '@poool/junipero-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';

import Translate from './Translate';
import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';
import GDPR from './GDPR';

import { texts, layouts } from '../styles';

const NewsletterWidget = forwardRef(({ data, release, register }, ref) => {

  const {
    onDataPolicyClick,
    onRegister,
    onRelease,
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

  const onPress = (e, button) => {
    switch (button) {
      case 'dataPolicy':
        dispatch({ optin: 'open' });
        onDataPolicyClick({
          widget: data?.action,
          button: e?.target,
          originalEvent: e,
          url: data?.config?.data_policy_url,
        });
        break;
      case 'register':
        onRegister({
          email: state.mail,
          newsletter_id: data?.config?.newsletter_id,
        });
        release();
        register(state.mail);
        onRelease({
          widget: data?.action,
          actionName: data?.actionName,
        });
        break;
      default:

    }
  };

  /* eslint-disable-next-line */
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (state.optin === 'closed') {
    return (
      <View
        style={layouts.widget}
        testID="newsletterWidget"
      >
        <Translate
          textKey="newsletter_title"
          style={texts.title}
        />

        <Translate
          textKey="newsletter_desc"
          style={texts.desc}
          replace={{
            newsletter_name: data?.config.newsletter_name,
          }}/>

        <TextField
          value={state.mail}
          testID="mailInput"
          valid={state.inputFocused ? true : !!emailRegex.test(state.mail)}
          onChange={e => dispatch({ mail: e.value })}
          onFocus={() => dispatch({ inputFocused: true })}
          onBlur={() => dispatch({ inputFocused: false })}
        />

        { !state.inputFocused && !emailRegex.test(state.mail)
          ? state.mail === ''
            ? <Translate
              textKey="form_empty_error"
              style={texts.warning}
              testID="warningMessage"
            />
            : <Translate
              textKey="form_email_error"
              style={texts.warning}
              testID="warningMessage"
            />
          : null
        }
        <View style={ layouts.mediumSpacing } >
          <CheckboxField
            onChange={() => {
              dispatch({ approve: !state.approve });
            }}
            children={
              <Translate
                textKey="newsletter_optin_label"
                replace={{
                  app_name: true,
                }}
              />
            }
          />
        </View>

        <Translate
          textKey="newsletter_optin_link"
          testID="dataButton"
          style={[texts.link, layouts.mediumSpacing]}
          onPress={ e => onPress(e, 'dataPolicy')}
        />

        <Translate textKey="newsletter_button" asString={true}>
          {({ text }) => (
            <Button
              testID="registerButton"
              title={text}
              disabled={ !(state.approve && emailRegex.test(state.mail))}
              color={data?.styles?.button_color}
              onPress={e => onPress(e, 'register')}
            />
          )}
        </Translate>

        <View style={layouts.subactions[data?.styles?.layout]}>
          {data?.config?.login_button_enabled &&
            <LoginLink />
          }
          { data?.config?.alternative_widget !== 'none'
            ? <NoThanksLink />
            : <SubscribeLink />
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
