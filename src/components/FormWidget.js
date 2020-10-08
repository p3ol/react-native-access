import React, { useContext, useEffect, useReducer } from 'react';
import { Button, View } from 'react-native';
import PropTypes from 'prop-types';
import { CheckboxField, TextField } from '@poool/junipero-native';
import { mockState, cloneDeep } from '@poool/junipero-utils';

import { AppContext } from '../services/contexts';
import { validateEmail, validateDate } from '../services/validate';

import NoThanksLink from './NoThanksLink';
import LoginLink from './LoginLink';
import SubscribeLink from './SubscribeLink';
import Translate from './Translate';
import MainButton from './MainButton';
import BrandCover from './BrandCover';
import BrandLogo from './BrandLogo';
import WidgetContent from './WidgetContent';
import GDPR from './GDPR';

import { applyStyles, commons, colors } from '../styles';

const DEFAULT_FIELD = {
  fieldType: 'email',
  fieldName: 'jane@gmail.com',
  fieldKey: 'email',
  fieldRequired: true,
};

const STEPS = { FORM: 'form', GDPR: 'gdpr' };

const FormWidget = () => {
  const { trackData, fireEvent, getStyle, getConfig } = useContext(AppContext);
  const form = trackData?.form || {};
  const fields = cloneDeep(form.fields || [DEFAULT_FIELD]);
  const [state, dispatch] = useReducer(mockState, {
    optin: false,
    step: STEPS.FORM,
    values: {},
    valid: {},
    focused: {},
  });

  const onBlur = field => {
    state.focused[field.fieldKey] = false;
    state.valid[field.fieldKey] = validateField(field,
      state.values[field.fieldKey]);

    dispatch({ focused: state.focused, valid: state.valid });
    // state.fields[field.key].focused = false;
    // if (!field.value) {
    //   state.fields[field.key].valid = false;
    // }
    // dispatch({ fields: state.fields });
  };

  const onFocus = field => {
    state.focused[field.fieldKey] = true;
    dispatch({ focused: state.focused });
    // state.fields[field.key].focused = true;
    // dispatch({ fields: state.fields });
  };

  const onPress = (button, e) => {
    // switch (button) {
    //   case 'dataPolicy':
    //     dispatch({ optin: 'open' });
    //     onDataPolicyClick({
    //       widget: data?.action,
    //       button: e?.target,
    //       originalEvent: e,
    //       url: data?.config?.data_policy_url,
    //     });
    //     break;
    //   case 'submit':
    //     onFormSubmit({
    //       name: data?.form?.name,
    //       fields: data?.form?.fields,
    //       valid: getValidFields(),
    //     });
    //     onRelease({
    //       widget: data?.action,
    //       actionName: data?.actionName,
    //     });
    //     release();
    //     break;
    // }
  };

  const onOptin = () => {
    dispatch({ optin: !state.optin });
  };

  const onBackClick = () => {
    dispatch({ step: STEPS.FORM });
  };

  const onChange = (field, input) => {
    switch (field.fieldType) {
      case 'date':
        state.values[field.fieldKey] = formatDate(input.value);
        break;
      default:
        state.values[field.fieldKey] = input.value;
    }

    dispatch({ values: state.values, valid: state.valid });

    // state.fields[field.key].value = event.value;
    // if (!field.value) {
    //   state.fields[field.key].valid = !field.required;
    // } else {
    //   if (field.type === 'email') {
    //     state.fields[field.key].valid = mailRegex.test(field.value);
    //   } else if (field.type === 'date') {
    //     state.fields[field.key].valid = getDateRegex().test(field.value);
    //   } else {
    //     state.fields[field.key].valid = true;
    //   }
    // }
    // dispatch({ fields: state.fields });
  };

  const formatDate = date => {
    const format = form.config?.date_format || 'DD/MM/YYYY';
    const firstSlash = format.indexOf('/');
    const secondSlash = format.indexOf('/', firstSlash + 1);

    if ([firstSlash, secondSlash].includes(date.length)) {
      date += '/';
    }

    return date;
  };

  const validateField = (field, value) => {
    switch (field.fieldType) {
      case 'date':
        return validateDate(value, form.config?.date_format);
      case 'email':
        return validateEmail(value);
      default:
        return field.fieldRequired === false || !!value;
    }
  };

  const getFieldError = field => {
    //
    // let error;
    //
    // if (!field.focused && field.value) {
    //   if (field.type === 'email' && !field.valid) {
    //     error = 'form_email_error';
    //   }
    //   if (field.type === 'date' && !field.valid) {
    //     switch (data?.form?.config?.date_format) {
    //       case 'mm/dd/yyyy':
    //         error = 'form_date_mdy_error';
    //         break;
    //       case 'yyyy/mm/dd':
    //         error = 'form_date_ymd_error';
    //         break;
    //       default:
    //         error = 'form_date_dmy_error';
    //         break;
    //     }
    //   }
    // } else if (!field.focused && !field.value && field.required) {
    //   error = 'form_empty_error';
    // }
    // return (
    //   <Translate
    //     textKey={error}
    //     style={texts.warning}
    //     testID={error}
    //   />
    // );
    return null;
  };

  const getValidFields = () => {
    // const validFields = [];
    //
    // Object.values(state.fields).map(field => {
    //   validFields.push({ [field.key]: field.valid });
    // });
    // return validFields;
  };

  const isFormValid = () => {
    // let count = 0;
    // let isValid = 0;
    //
    // Object.values(state.fields).map(field => {
    //   field.valid && (isValid += 1);
    //   count += 1;
    // });
    //
    // return isValid === count;
  };

  const renderField = field => {
    switch (field.fieldType) {
      case 'creditCard':
        return null;

      default: {
        const renderedField = (
          <React.Fragment key={field.fieldKey}>
            <View style={styles.field}>
              <Translate
                textKey="form_optional"
                asString={true}
                replace={{ app_name: true }}
              >
                { ({ text }) => (
                  <TextField
                    value={state.values[field.fieldKey]}
                    rows={field.fieldType === 'multiline' ? 5 : null}
                    secureTextEntry={field.fieldType === 'password'}
                    placeholder={field.fieldName + (
                      field.fieldRequired === false ? text : ''
                    )}
                    testID={field.fieldKey}
                    valid={state.focused[field.fieldKey] ||
                      state.valid[field.fieldKey]}
                    onChange={onChange.bind(null, field)}
                    onFocus={onFocus.bind(null, field)}
                    onBlur={onBlur.bind(null, field)}
                    customStyle={{
                      input: [
                        styles.input,
                        applyStyles(state.focused[field.fieldKey], [
                          styles.input__focused,
                        ]),
                        applyStyles(state.valid[field.fieldKey] === false, [
                          styles.input__invalid,
                        ]),
                      ],
                      inputBackground: styles.inputBackground,
                    }}
                  />
                ) }
              </Translate>
              { getFieldError(field) }
            </View>
          </React.Fragment>
        );

        return renderedField;
      }
    }
  };

  return (
    <View testID="formWidget">
      <BrandCover />
      <BrandLogo />

      <WidgetContent>
        <Translate textKey="form_title" style={commons.title} />
        <Translate textKey="form_desc" style={commons.description} />

        <View>
          { fields.map(field => renderField(field)) }
        </View>

        <View style={styles.field}>
          <CheckboxField
            checked={state.optin}
            onChange={onOptin}
          >
            <Translate
              textKey="newsletter_optin_label"
              replace={{ app_name: true }}
            />
          </CheckboxField>
        </View>

        <Translate
          style={[styles.field, styles.gdprLink]}
          textKey="form_optin_link"
          testID="GDPRLink"
          onPress={onPress.bind(null, 'dataPolicy')}
        />
        <MainButton
          text="form_button"
          disabled={!isFormValid()}
          onPress={onPress}
        />
        <View
          style={[
            commons.subActions,
            applyStyles(getStyle('layout') === 'landscape', [
              commons.subActions__landscape,
            ]),
          ]}
        >
          { getConfig('login_button_enabled') !== false && <LoginLink /> }
          { getConfig('alternative_widget') !== 'none' && (
            <NoThanksLink />
          )}
        </View>
      </WidgetContent>
    </View>
  );
};

const styles = {
  field: {
    marginBottom: 20,
  },
  gdprLink: {
    paddingVertical: 10,
    marginLeft: 25,
    textDecoration: 'underline',
  },
  input: {
    paddingVertical: 15,
    background: colors.gallery,
  },
  input__focused: {
    background: colors.alto,
  },
  input__invalid: {
    background: colors.lavenderBlush,
  },
  inputBackground: {
    background: colors.shuttleGray,
    opacity: 1,
  },
};

FormWidget.propTypes = {};

FormWidget.displayName = 'FormWidget';

export default FormWidget;
