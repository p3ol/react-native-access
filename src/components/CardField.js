import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Translate from './Translate';

const CardField = ({ onCardChange, card }) => {

  const [expDate, setExpDate] = useState('');

  const formatNumber = value => {
    var v = value.replace(/\D/g, '');
    var matches = v.match(/\d{4,16}/g);
    var match = matches ? matches[0] : '';
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      onCardChange('number', parts.join(' '));
    } else {
      onCardChange('number', v);
    }
  };

  const formatDate = value => {
    var v = value.replace(/\D/g, '');
    var matches = v.match(/\d{2,4}/g);
    var match = matches ? matches[0] : '';
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      setExpDate(parts.join('/'));
      onCardChange('exp_month', parts[0]);
      onCardChange('exp_year', parts[1]);
    } else {
      setExpDate(v);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.number}>
        <Translate textKey='form_card_number' asString={true}>
          {
            ({ text }) => (
              <TextInput
                style={styles.input}
                value={card.number}
                onChange={ e => formatNumber(e.target.value)}
                placeholder={text}
              />
            )}
        </Translate>
      </View>
      <View style={styles.date}>
        <Translate textKey='form_card_date' asString={true}>
          {
            ({ text }) => (
              <TextInput
                style={styles.input}
                value={expDate}
                onChange={ e => formatDate(e.target.value)}
                placeholder={text}
              />
            )}
        </Translate>
      </View>
      <View style={styles.cvc}>
        <TextInput
          style={styles.input}
          maxLength={3}
          onChange={ e => onCardChange('cvc', e.target.value)}
          placeholder="CVC"
        />
      </View>
    </View>
  );
};

CardField.propTypes = {
  onCardChange: PropTypes.func,
  card: PropTypes.object,
};

CardField.displayName = 'FormWidget';

export default CardField;

const styles = StyleSheet.create({
  cvc: {
    flex: 2,
  },
  date: {
    flex: 2,
  },
  input: {
    outlineWidth: 0,
  },
  number: {
    flex: 6,
  },
  wrapper: {
    backgroundColor: '#D4D4D4',
    boderColor: '#567',
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
});
