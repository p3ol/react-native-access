import React from 'react';
import { Linking, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';

const GDPR = ({ onBackClick }) => {

  return (
    <>
      <View
        testID='dataInfos'
      >
        <Translate
          textKey='$gdpr_title'
        />
        <Translate
          textKey='$gdpr_desc'
        />
        <Text>
          <Translate
            textKey='$gdpr_processed_data_title'
          />
          <Translate
            textKey='newsletter_processed_data'
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_process_ordering_institution_title'
          />
          <Translate
            textKey='newsletter_process_ordering_institution'
            replace={{ app_name: true }}
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_processor'
          />
          <Text>Poool</Text>
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_process_purpose_title'
          />
          <Translate
            textKey='newsletter_data_process_purpose'
          />
        </Text>
        <Text>
          <Translate
            textKey='$gdpr_data_process_duration_title'
          />
          <Translate
            textKey='pass_data_process_duration'
          />
        </Text>
      </View>
      <View>
        <Translate
          textKey='$gdpr_rights_title'
        />
        <Translate
          textKey='$gdpr_rights_desc'
        />
        <Translate
          textKey='$gdpr_conformity_title'
        />
        <Text>
          <Translate
            textKey='$gdpr_conformity_desc'
          />
          <Translate
            textKey='$gdpr_conformity_ordering_institution_button'
          /> |
          <Translate
            textKey='$gdpr_conformity_processing_institution_button'
            testID='pooolData'
            onPress={() => Linking.openURL('https://www.poool.fr/gdpr')}
          />
        </Text>
      </View>
    </>
  );

};

GDPR.propTypes = {
  onBackClick: PropTypes.func,
};

GDPR.displayName = 'GDPR';

export default GDPR;
