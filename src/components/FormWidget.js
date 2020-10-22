import React, { useContext, useReducer } from 'react';
import { Text, View } from 'react-native';
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
  const {
    trackData,
    fireEvent,
    getStyle,
    getConfig,
    doRelease,
  } = useContext(AppContext);
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
  };

  const onFocus = field => {
    state.focused[field.fieldKey] = true;
    dispatch({ focused: state.focused });
  };

  const onDataPolicyPress = e => {
    dispatch({ step: STEPS.GDPR });
    fireEvent('onDataPolicyClick', {
      widget: trackData?.action,
      button: 'link_button',
      originalEvent: e,
      url: getConfig('link_url'),
    });
  };

  const onSubmitPress = e => {
    fireEvent('onFormSubmit', {
      widget: trackData?.action,
      button: 'link_button',
      originalEvent: e,
      url: getConfig('link_url'),
    });
    doRelease();
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

  const getDateError = () => {
    switch (form.config?.date_format) {
      case 'mm/dd/yyyy':
        return 'form_date_mdy_error';
      case 'yyyy/mm/dd':
        return 'form_date_ymd_error';
      default:
        return 'form_date_dmy_error';
    }
  };

  const validateField = (field, value) => {
    switch (field.fieldType) {
      case 'date':
        return {
          valid: validateDate(value, form.config?.date_format),
          type: getDateError(),
        };
      case 'email':
        return {
          valid: validateEmail(value),
          type: 'form_email_error',
        };
      default:
        return {
          valid: field.fieldRequired === false || !!value,
          type: 'form_empty_error',
        };
    }
  };

  const getFieldError = field => {
    let error;
    if (!state.valid[field.fieldKey]?.valid) {
      error = state.valid[field.fieldKey]?.type;
    }
    return (
      <Translate
        style={styles.error}
        textKey={error}
        testID={error}
      />
    );
  };

  const isFormValid = () => {
    return Object.keys(state.valid).length === fields.length &&
    Object.keys(state.valid).every(k => state.valid[k]?.valid) &&
    state.optin;
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
                      state.valid[field.fieldKey]?.valid}
                    onChange={onChange.bind(null, field)}
                    onFocus={onFocus.bind(null, field)}
                    onBlur={onBlur.bind(null, field)}
                    customStyle={{
                      input: [
                        styles.input,
                        applyStyles(state.focused[field.fieldKey], [
                          styles.input__focused,
                        ]),
                        applyStyles(
                          state.valid[field.fieldKey]?.valid === false, [
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

      { state.step === 'gdpr' && (
        <Text
          testID="returnButton"
          onPress={onBackClick}
          style={[
            styles.backLink,
            applyStyles(
              getStyle('button_color'),
              { color: getStyle('button_color').toString() },
            ),
          ]}
        >
          {'\u{e901}'}
        </Text>
      ) }

      <BrandCover />
      <BrandLogo />

      {state.step === 'gdpr' ? (
        <GDPR />
      ) : (
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
            onPress={onDataPolicyPress}
          />
          <MainButton
            text="form_button"
            disabled={!isFormValid()}
            onPress={onSubmitPress}
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
            { getConfig('alternative_widget') !== 'none'
              ? <NoThanksLink />
              : <SubscribeLink />
            }
          </View>
        </WidgetContent>
      ) }
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
  backLink: {
    fontFamily: 'Poool-Ico-2',
    position: 'absolute',
    zIndex: 1000,
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
  error: {
    color: colors.monza,
  },
};

FormWidget.propTypes = {};

FormWidget.displayName = 'FormWidget';

export default FormWidget;
