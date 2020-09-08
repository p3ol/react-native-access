import React, { useContext, useEffect, useReducer } from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { CheckboxField, TextField } from '@poool/junipero-native';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';

import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';
import Translate from './Translate';
import GDPR from './GDPR';

import { texts, layouts } from '../styles';

const FormWidget = ({ data, release }) => {

  const { onDataPolicyClick, onRelease, onFormSubmit } = useContext(AppContext);

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
        valid: !formItem.fieldRequired,
      };
    });
    dispatch({ fields: state.fields });
  };

  const onBlur = field => {
    state.fields[field.key].focused = false;
    if (!field.value) {
      state.fields[field.key].valid = false;
    }
    dispatch({ fields: state.fields });
  };

  const onFocus = field => {
    state.fields[field.key].focused = true;
    dispatch({ fields: state.fields });
  };

  const onPress = (button, e) => {
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
      case 'submit':
        onFormSubmit({
          name: data?.form?.name,
          fields: data?.form?.fields,
          valid: getValidFields(),
        });
        onRelease({
          widget: data?.action,
          actionName: data?.actionName,
        });
        release();
        break;
    }
  };

  const onOptin = () => {
    dispatch({ approve: !state.approve });
  };

  const onBackClick = () => dispatch({ optin: 'closed' });

  const onChange = (field, event) => {
    state.fields[field.key].value = event.value;
    if (!field.value) {
      state.fields[field.key].valid = !field.required;
    } else {
      if (field.type === 'email') {
        state.fields[field.key].valid = mailRegex.test(field.value);
      } else if (field.type === 'date') {
        state.fields[field.key].valid = getDateRegex().test(field.value);
      } else {
        state.fields[field.key].valid = true;
      }
    }
    dispatch({ fields: state.fields });
  };

  const getFieldError = field => {

    let error;

    if (!field.focused && field.value) {
      if (field.type === 'email' && !field.valid) {
        error = 'form_email_error';
      }
      if (field.type === 'date' && !field.valid) {
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
    } else if (!field.focused && !field.value && field.required) {
      error = 'form_empty_error';
    }
    return (
      <Translate
        textKey={error}
        style={texts.warning}
        testID={error}
      />
    );
  };

  const getValidFields = () => {
    const validFields = [];

    Object.values(state.fields).map(field => {
      validFields.push({ [field.key]: field.valid });
    });
    return validFields;
  };

  const isFormValid = () => {
    let count = 0;
    let isValid = 0;

    Object.values(state.fields).map(field => {
      field.valid && (isValid += 1);
      count += 1;
    });

    return isValid === count;
  };

  const getFormItem = field => {

    switch (field.type) {

      case 'creditCard':
        return null;

      default:
        return (
          <React.Fragment key={field.key}>
            <View style={layouts.mediumSpacing}>
              <Translate
                textKey='form_optional'
                asString
                replace={{ app_name: true }}
              >
                {({ text }) => (
                  <TextField
                    value={field.value}
                    rows={field.type === 'multiline' ? 5 : 1}
                    secureTextEntry={field.type === 'password'}
                    placeholder={field.name + (field.required ? '' : text)}
                    testID={field.key}
                    valid={field.focused ? true : !!field.valid}
                    onChange={onChange.bind(null, field)}
                    onFocus={onFocus.bind(null, field)}
                    onBlur={onBlur.bind(null, field)}
                  />
                )}
              </Translate>
              { getFieldError(field) }
            </View>
          </React.Fragment>
        );
    }
  };
  if (state.optin === 'closed') {
    return (
      <View
        style={layouts.widget}
        testID='formWidget'
      >

        <Translate
          textKey='form_title'
          style={texts.title}
        />

        <Translate
          textKey='form_desc'
          style={texts.desc}
        />

        <View>
          {
            Object.values(state.fields).map(field => getFormItem(field))
          }
        </View>

        <View style={layouts.largeSpacing} >
          <CheckboxField
            onChange={onOptin}
            children={
              <Translate
                textKey='newsletter_optin_label'
                replace={{ app_name: true }}
              />
            }
          />
        </View>

        <Translate
          textKey='form_optin_link'
          testID='dataButton'
          style={texts.link}
          onPress={onPress.bind(null, 'dataPolicy')}
        />

        <Translate textKey='form_button' asString={true}>
          {({ text }) => (
            <Button
              testID='submitButton'
              title={text}
              style={layouts.mediumSpacing}
              disabled={ !(state.approve && isFormValid()) }
              color={data?.styles?.button_color}
              onPress={onPress.bind(null, 'submit')}
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
      <GDPR onBackClick={onBackClick}/>
    );
  }
};

FormWidget.propTypes = {
  data: PropTypes.object,
  register: PropTypes.func,
  release: PropTypes.func,
  widget: PropTypes.string,
};

FormWidget.displayName = 'FormWidget';

export default FormWidget;
