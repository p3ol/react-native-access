import React, { useContext } from 'react';
import {
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import { AppContext } from '../services/contexts';
import Translate from './Translate';

import { texts, layouts } from '../styles';

const GDPR = ({ onBackClick }) => {

  const {
    trackData,
  } = useContext(AppContext);

  return (
    <View
      style={layouts.widget}
      testID='dataInfos'
    >
      <Text
        testID='returnButton'
        style={[texts.link, {top: 0}]}
        onPress={() => onBackClick()}
      >
        Retour
      </Text>
      <Translate
        textKey='$gdpr_title'
        style={texts.desc}
      />
      <Translate
        textKey='$gdpr_desc'
        style={texts.title}
      />
      <View style={texts.text}>
        <Text>
          <Translate
            textKey='$gdpr_processed_data_title'
            style={texts.label}
          />
          <Translate
            textKey='newsletter_processed_data'
            style={texts.text}
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_process_ordering_institution_title'
            style={texts.label}
          />
          <Translate
            textKey='newsletter_process_ordering_institution'
            style={texts.text}
            replace={{ app_name: true }}
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_processor'
            style={texts.label}
          />
          <Text style={texts.text} >Poool</Text>
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_process_purpose_title'
            style={texts.label}
          />
          <Translate
            textKey='newsletter_data_process_purpose'
            style={texts.text}
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_process_duration_title'
            style={texts.label}
          />
          <Translate
            textKey='pass_data_process_duration'
            style={texts.text}
          />
        </Text>
      </View>
      <View>
        <Translate
          textKey='$gdpr_rights_title'
          style={texts.label}
        />
        <Translate
          textKey='$gdpr_rights_desc'
          style={texts.text}
        />
        <Translate
          textKey='$gdpr_conformity_title'
          style={texts.label}
        />
        <Text style={texts.text}>
          <Translate
            textKey='$gdpr_conformity_desc'
          />
          <Translate
            textKey='$gdpr_conformity_ordering_institution_button'
            style={texts.link}
            onPress={() => {}}
          /> |
          <Translate
            textKey='$gdpr_conformity_processing_institution_button'
            testID='pooolData'
            style={texts.link}
            onPress={() => Linking.openURL('https://www.poool.fr/gdpr')}
          />
        </Text>
      </View>
    </View>
  );

};

GDPR.propTypes = {
  onBackClick: PropTypes.func,
};

GDPR.displayName = 'GDPR';

export default GDPR;
