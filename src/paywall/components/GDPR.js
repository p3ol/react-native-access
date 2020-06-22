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

const GDPR = () => {
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
      <Text style={defaultStyles.text}>
        { data?.texts?.newsletter_optin_link || 'Où vont mes données ?'}
      </Text>
      <Text style={defaultStyles.title}>
        À propos des données collectées
      </Text>
      <View style={defaultStyles.newsletterDataInfos}>
        <Text style={defaultStyles.newsletterLabel}>
          Donnée collectée :
          <Text style={defaultStyles.newsletterText}>
            {' ' + data?.texts?.newsletter_processed_data}
          </Text>
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
  )
}
