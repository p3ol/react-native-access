import React, {
  useContext,
  useReducer,
  forwardRef,
  useImperativeHandle } from 'react';
import {
  View,
  Image,
  Text,
  Button,
  Linking,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import { mockState } from '../services/reducers';
import Translate from './Translate';

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
              placeholder={text}
              onChange={e => dispatch({ mail: e.target.value })}
              onFocus={() => dispatch({ inputFocused: true })}
              onBlur={() => dispatch({ inputFocused: false })}
            />
          )}
        </Translate>

        { !state.inputFocused && !emailRegex.test(state.mail)
          ? <Translate
            textKey={'newsletter_error'}
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

        <Button
          testID="registerButton"
          title={data?.texts?.newsletter_button || 'Merci, j\'en profite !'}
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
      <View
        style={defaultStyles.container}
        testID="dataInfos"
      >
        <Text
          testID="returnButton"
          style={defaultStyles.backButton}
          onPress={() => dispatch({ optin: 'closed' })}
        >
          Retour
        </Text>
        <Image
          style={defaultStyles.logo}
          source={{ uri: data?.styles?.brand_logo }}
        />
        <Translate
          textKey={'$gdpr_title'}
          style={defaultStyles.text}
        />
        <Translate
          textKey={'$gdpr_desc'}
          style={defaultStyles.title}
        />
        <View style={defaultStyles.newsletterDataInfos}>
          <Text style={defaultStyles.newsletterLabel}>
            Donnée collectée :
            <Translate
              textKey={'newsletter_processed_data'}
              style={defaultStyles.newsletterText}
            />
          </Text>
          <Text style={defaultStyles.newsletterLabel}>
            Donneur d&apos;ordre :
            <Text style={defaultStyles.newsletterText}>
              {' ' + data?.texts?.newsletter_process_ordering_institution}
            </Text>
          </Text>
          <Text style={defaultStyles.newsletterLabel}>
            Organisme collecteur (sous-traitant) :
            <Text style={defaultStyles.newsletterText}>
              {' '} Poool
            </Text>
          </Text>
          <Text style={defaultStyles.newsletterLabel}>
            But de la collecte :
            <Text style={defaultStyles.newsletterText}>
              {' ' + data?.texts?.newsletter_data_process_purpose}
            </Text>
          </Text>
          <Text style={defaultStyles.newsletterLabel}>
            Durée du traitement :
            <Text style={defaultStyles.newsletterText}>
              {' ' + data?.texts?.newsletter_data_process_duration}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={defaultStyles.newsletterLabel}>
            Vos droits concernant vos données. {'\n'}
            <Text style={defaultStyles.newsletterText}>
            Accès, rectification, mise à jour, effacement, portabilité,
            opposition pour des motifs légitimes, limitation du traitement,
            indication du sort de la donnée en cas de décès. Exercer vos droits
            </Text>
          </Text>
          <Text style={defaultStyles.newsletterLabel}>
            Nous mettons tous nos moyens en œuvre
            pour nous conformer au RGPD {'\n'}
            <Text style={defaultStyles.newsletterText}>
            Politiques de données : Donneur d&apos;ordre|
              <Text
                testID="pooolData"
                style={defaultStyles.subaction}
                onPress={() =>
                  Linking.openURL('https://www.poool.fr/gdpr')}>
                Organisme collecteur
              </Text>
            </Text>
          </Text>
        </View>
      </View>
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
