import React, {
  useContext,
  useReducer,
  useEffect,
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

const FormWidget = forwardRef(({
  data,
  release,
  widget,
}, ref) => {

  const {
    onDataPolicyClick,
    setAlternative,
    onLoginClick,
    onRelease,
    onSubscribeClick,
  } = useContext(AppContext);

  /* eslint-disable max-len */

  const getDateRegex = () => {
    switch (data?.form?.config?.date_format) {
      case 'mm/dd/yyyy':
        return /^(0[1-9]|[1][0-2])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]((19|20)\d\d)$/g;
      case 'yyyy/mm/dd':
        return /^((19|20)\d\d)[- /.](0[1-9]|[1][0-2])[- /.](0[1-9]|[12][0-9]|3[01])$/g;
      default:
        return /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|[1][0-2])[- /.]((19|20)\d\d)$/g;
    }
  };

  const mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

  /* eslint-enable max-len */

  useEffect(() => {
    init();
  }, []);

  const [state, dispatch] = useReducer(mockState, {
    approve: false,
    optin: 'closed',
    fields: {},
  });

  const init = () => {
    data?.form?.fields.map(formItem => {
      state.fields[formItem.fieldKey] =
      {
        key: formItem.fieldKey,
        name: formItem.fieldName,
        required: formItem.fieldRequired,
        type: formItem.fieldType,
        value: '',
        focused: true,
        valid: false,
      };
    });
    dispatch({ fields: state.fields });
  };

  const onBlur = field => {
    state.fields[field.key] = state.fields[field.key] || {};
    state.fields[field.key].focused = false;
    dispatch({ fields: state.fields });
  };

  const onFocus = field => {
    state.fields[field.key] = state.fields[field.key] || {};
    state.fields[field.key].focused = true;
    if (!field.required) {
      state.fields[field.key].valid = true;
    }
    dispatch({ fields: state.fields });
  };

  const onChange = (field, event) => {
    state.fields[field.key] = state.fields[field.key] || {};
    state.fields[field.key].value = event.target.value;
    if (field.type === 'email') {
      if (!mailRegex.test(field.value) && field.required) {
        state.fields[field.key].valid = false;
      } else {
        state.fields[field.key].valid = true;
      }
    } else if (field.type === 'date') {
      if (!getDateRegex().test(field.value) && field.required) {
        state.fields[field.key].valid = false;
      } else {
        state.fields[field.key].valid = true;
      }
    } else {
      if (field.value === '' && field.required) {
        state.fields[field.key].valid = false;
      } else {
        state.fields[field.key].valid = true;
      }
    }
    dispatch({ fields: state.fields });
  };

  const getFieldError = field => {

    let error;

    if (!field.focused && field.value !== '' && field.required) {
      if (field.type === 'email') {
        if (field.valid === false) {
          error = 'form_email_error';
        }
      }
      if (field.type === 'date') {
        if (field.valid === false) {
          switch (data?.form?.config?.date_format) {
            case 'mm/dd/yyyy':
              error = 'form_date_mdy_error';
              break;
            case 'yyyy/mm/dd':
              error = 'form_date_ymd_error';
              break;
            default:
              error = 'form_date_dmy_error';
              break;
          }
        }
      }
    } else if (!field.focused && field.value === '' && field.required) {
      error = 'form_empty_error';
    }
    return (
      <Translate
        textKey={error}
        style={defaultStyles.inputWarning}
        testID={error}
      />
    );
  };

  const isFormValid = () => {

    let isValid = false;

    Object.values(state.fields).map(field => {
      field.valid ? isValid = true : isValid = false;
    });

    return isValid;
  };

  const getFormItem = field => {

    switch (field.fieldType) {

      case 'CB':
        return null;

      default:
        return (
          <React.Fragment key={field.key}>
            <Translate textKey={'form_optional'} asString={true} >
              {({ text }) => (
                <TextInput
                  secureTextEntry={field.type === 'password'}
                  multiline={field.type === 'multiline'}
                  testID={'text' + field.key}
                  style={field.focused
                    ? defaultStyles.input
                    : field.valid
                      ? defaultStyles.inputCorrect
                      : defaultStyles.inputWrong
                  }
                  placeholder={field.name + (!field.required ? text : '')}
                  onChange={onChange.bind(null, field)}
                  onFocus={onFocus.bind(null, field)}
                  onBlur={onBlur.bind(null, field)}
                />
              )}
            </Translate>
            { getFieldError(field) }
          </React.Fragment>
        );
    }
  };
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

        <View>
          {
            Object.values(state.fields).map(field => getFormItem(field))
          }
        </View>

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
              disabled={ !(state.approve && isFormValid()) }
              color={data?.styles?.button_color}
              onPress={() => {
                onRelease();
                release();
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

FormWidget.propTypes = {
  data: PropTypes.object,
  register: PropTypes.func,
  release: PropTypes.func,
  widget: PropTypes.string,
};

FormWidget.displayName = 'FormWidget';

export default FormWidget;
