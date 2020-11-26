import React, { useContext, useReducer } from 'react';
import { Text, View } from 'react-native';
import { CheckboxField, TextField } from '@poool/junipero-native';
import { mockState } from '@poool/junipero-utils';

import { AppContext } from '../services/contexts';
import { validateEmail } from '../services/validate';
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

const STEPS = { NEWSLETTER: 'newsletter', GDPR: 'gdpr' };

const NewsletterWidget = () => {
  const {
    trackData,
    fireEvent,
    getStyle,
    getConfig,
    doRelease,
  } = useContext(AppContext);
  const [state, dispatch] = useReducer(mockState, {
    optin: false,
    step: STEPS.NEWSLETTER,
    value: '',
    valid: false,
    focused: true,
  });

  const onBlur = () => {
    state.focused = false;
    state.valid = validateEmail(state.value);
    dispatch({ focused: state.focused, valid: state.valid });
  };

  const onFocus = () => {
    dispatch({ focused: true });
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

  const onSubmitPress = () => {
    fireEvent('onRegister', {
      email: state.value,
      newsletter_id: getConfig('newsletter_id'),
    });
    doRelease();
  };

  const onOptin = () => {
    dispatch({ optin: !state.optin });
  };

  const onBackClick = () => {
    dispatch({ step: STEPS.NEWSLETTER });
  };

  const onChange = input => {
    dispatch({ value: input.value });
  };

  const getError = () => {
    let error;

    if (!state.focused && state.value === '') {
      error = 'form_empty_error';
    } else if (!state.focused && !state.valid) {
      error = 'newsletter_error';
    }

    return (
      <Translate style={styles.error} textKey={error} testID={error}>
        {error}
      </Translate>
    );
  };

  return (
    <View testID="newsletterWidget">

      { state.step === 'gdpr' && (
        <Text
          testID="backButton"
          onPress={onBackClick}
          style={[
            styles.backLink,
            applyStyles(!!getStyle('button_color'), {
              color: getStyle('button_color')?.toString(),
            }),
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
          <Translate textKey="newsletter_title" style={commons.title} />
          <Translate
            textKey="newsletter_desc"
            style={commons.description}
            replace={{ newsletter_name: getConfig('newsletter_name') }}
          />
          <View style={styles.field}>
            <TextField
              value={state.value}
              testID="mailInput"
              valid={state.focused || state.valid}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              customStyle={{
                input: [
                  styles.input,
                  applyStyles(!state.valid, [
                    styles.input__invalid,
                  ]),
                  applyStyles(state.focused, [
                    styles.input__focused,
                  ]),
                ],
                inputBackground: styles.inputBackground,
              }}
            />
            { getError() }
          </View>
          <View style={styles.field}>
            <CheckboxField checked={state.optin} onChange={onOptin}>
              <Translate
                style={styles.optinLabel}
                textKey="newsletter_optin_label"
                replace={{ app_name: true }}
              />
            </CheckboxField>
          </View>

          <Translate
            style={[styles.field, styles.gdprLink]}
            textKey="newsletter_optin_link"
            testID="GDPRLink"
            onPress={onDataPolicyPress}
          />
          <MainButton
            text="newsletter_button"
            disabled={!state.valid || !state.optin}
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
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  backLink: {
    fontFamily: 'Poool-Ico-2',
    position: 'absolute',
    zIndex: 1000,
  },
  input: {
    paddingVertical: 15,
    backgroundColor: colors.gallery,
  },
  input__focused: {
    backgroundColor: colors.alto,
  },
  input__invalid: {
    backgroundColor: colors.lavenderBlush,
  },
  inputBackground: {
    backgroundColor: colors.shuttleGray,
    opacity: 1,
  },
  error: {
    color: colors.monza,
  },
  optinLabel: {
    marginLeft: 10,
  },
};

NewsletterWidget.propTypes = {};

NewsletterWidget.displayName = 'NewsletterWidget';

export default NewsletterWidget;
