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

import { defaultStyles } from '../theme/styles';

const GDPR = ({ onBackClick }) => {

  const {
    trackData,
  } = useContext(AppContext);

  return (
    <View
      style={defaultStyles.container}
      testID="dataInfos"
    >
      <Text
        testID="returnButton"
        style={defaultStyles.backButton}
        onPress={() => onBackClick()}
      >
        Retour
      </Text>
      <Image
        style={defaultStyles.logo}
        source={{ uri: trackData?.styles?.brand_logo }}
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
          <Translate
            textKey={'$gdpr_processed_data_title'}
            style={defaultStyles.newsletterLabel}
          />
          <Translate
            textKey={'newsletter_processed_data'}
            style={defaultStyles.newsletterText}
          />
        </Text>
        <Text style={defaultStyles.newsletterLabel}>
          <Translate
            textKey={'$gdpr_process_ordering_institution_title'}
            style={defaultStyles.newsletterLabel}
          />
          <Translate
            textKey={'newsletter_process_ordering_institution'}
            style={defaultStyles.newsletterText}
            replace={{ app_name: true }}
          />
        </Text>
        <Text style={defaultStyles.newsletterLabel}>
          <Translate
            textKey={'$gdpr_data_processor'}
            style={defaultStyles.newsletterLabel}
          />
          <Text style={defaultStyles.newsletterText} >Poool</Text>
        </Text>
        <Text style={defaultStyles.newsletterLabel}>
          <Translate
            textKey={'$gdpr_data_process_purpose_title'}
            style={defaultStyles.newsletterLabel}
          />
          <Translate
            textKey={'newsletter_data_process_purpose'}
            style={defaultStyles.newsletterText}
          />
        </Text>
        <Text style={defaultStyles.newsletterLabel}>
          <Translate
            textKey={'$gdpr_data_process_duration_title'}
            style={defaultStyles.newsletterLabel}
          />
          <Translate
            textKey={'pass_data_process_duration'}
            style={defaultStyles.newsletterText}
          />
        </Text>
      </View>
      <View>
        <Translate
          textKey={'$gdpr_rights_title'}
          style={defaultStyles.newsletterLabel}
        />
        <Translate
          textKey={'$gdpr_rights_desc'}
          style={defaultStyles.newsletterText}
        />
        <Translate
          textKey={'$gdpr_conformity_title'}
          style={defaultStyles.newsletterLabel}
        />
        <Text style={defaultStyles.newsletterText}>
          <Translate
            textKey={'$gdpr_conformity_desc'}
          />
          <Translate
            textKey={'$gdpr_conformity_ordering_institution_button'}
            style={defaultStyles.subaction}
            onPress={() => {}}
          /> |
          <Translate
            textKey={'$gdpr_conformity_processing_institution_button'}
            testID="pooolData"
            style={defaultStyles.subaction}
            onPress={() =>
              Linking.openURL('https://www.poool.fr/gdpr')}
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
