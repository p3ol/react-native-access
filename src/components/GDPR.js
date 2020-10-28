import React from 'react';
import { Linking, Text, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Translate from './Translate';

import { commons } from '../styles';

const GDPR = () => {

  const onLongPress = (type, e) => {

  };

  const onPooolPress = () => {
    Linking.openURL('https://poool.tech/privacy-policy');
  };

  const onPooolGDPRPress = () => {
    Linking.openURL('https://www.poool.fr/gdpr');
  };

  const onGDPRPress = () => {
    Linking.openURL('');
  };

  return (
    <Text testID="GDPR" style={styles.gdpr}>
      <View style={styles.head}>
        <Translate textKey="$gdpr_title" style={commons.description} />
        <Translate textKey="$gdpr_desc" style={commons.title} />
        <Text style={styles.dataLine}>
          <Translate
            textKey="$gdpr_processed_data_title"
            style={styles.label}
          />
          <Translate
            textKey="newsletter_processed_data"
          />
        </Text>
        <Text style={styles.dataLine}>
          <Translate
            textKey="$gdpr_process_ordering_institution_title"
            style={styles.label}
          />
          <Translate
            textKey="newsletter_process_ordering_institution"
            replace={{ app_name: true }}
          />
        </Text>
        <Text style={styles.dataLine}>
          <Translate
            textKey="$gdpr_data_processor"
            style={styles.label}
          />
          <Text>Poool</Text>
          <Text
            style={styles.infoIcon}
            onPress={onPooolPress}>
            {'\u{e904}'}
          </Text>
        </Text>
        <Text style={styles.dataLine}>
          <Translate
            textKey="$gdpr_data_process_purpose_title"
            style={styles.label}
          />
          <Translate
            textKey="newsletter_data_process_purpose"
          />
        </Text>
        <Text style={styles.dataLine}>
          <Translate
            textKey="$gdpr_data_process_duration_title"
            style={styles.label}
          />
          <Translate
            textKey="pass_data_process_duration"
          />
        </Text>
      </View>
      <View>
        <View style={styles.footPart}>
          <Text style={styles.icon}>{'\u{e905}'}</Text>
          <View style={styles.textBlock}>
            <Translate
              textKey="$gdpr_rights_title"
              style={styles.label}
            />
            <Translate textKey="$gdpr_rights_desc" />
            <Text>
              <Translate
                textKey="$gdpr_rights_button"
                style={styles.link}
                onPress={{}}
              />
              <TouchableWithoutFeedback
                onLongPress={onLongPress.bind(null, 'mail')}>
                <Text
                  style={styles.infoIcon}>
                  {'\u{e904}'}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
        <View style={styles.footPart}>
          <Text style={styles.icon}>{'\u{e902}'}</Text>
          <View style={styles.textBlock}>
            <Text>
              <Translate
                textKey="$gdpr_conformity_title"
                style={styles.label}
              />
              <TouchableWithoutFeedback
                onLongPress={onLongPress.bind(null, 'gdpr')}>
                <Text
                  style={styles.infoIcon}
                  onLongPress={onLongPress}>
                  {'\u{e904}'}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
            <Translate textKey="$gdpr_conformity_desc" />
            <Text style={styles.textBlock}>
              <Translate
                style={styles.link}
                textKey="$gdpr_conformity_ordering_institution_button"
                onPress={onGDPRPress}
              />{'\u00A0'}|{'\u00A0'}
              <Translate
                style={styles.link}
                textKey="$gdpr_conformity_processing_institution_button"
                testID="pooolData"
                onPress={onPooolGDPRPress}
              />
            </Text>
          </View>
        </View>
      </View>
    </Text>
  );

};

GDPR.propTypes = {
  onBackClick: PropTypes.func,
};

const styles = {
  gdpr: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    lineHeight: 26,
  },
  head: {
    marginBottom: 25,
  },
  dataLine: {
    marginBottom: 10,
    lineHeight: 26,
  },
  textBlock: {
    lineHeight: 26,
    flex: 1,
    flexWrap: 'wrap',
  },
  footPart: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  icon: {
    fontFamily: 'Poool-Ico-2',
    fontSize: 18,
    lineHeight: 26,
    marginRight: 10,
  },
  infoIcon: {
    position: 'relative',
    top: 3,
    fontFamily: 'Poool-Ico-2',
    fontSize: 22,
    marginLeft: 10,
  },
  link: {
    textDecorationLine: 'underline',
  },
};

GDPR.displayName = 'GDPR';

export default GDPR;
