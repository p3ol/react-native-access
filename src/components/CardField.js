import React, { useReducer } from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import creditCardType from 'credit-card-type';
import StringMask from 'string-mask';
import PropTypes from 'prop-types';
import { mockState } from '../services/reducers';
import Translate from './Translate';

const CardField = ({ cardKey, onChange, onFocus, onBlur, field }) => {

  const [state, dispatch] = useReducer(mockState, {
    expDate: '',
    card: {
      number: {},
      exp_month: {},
      exp_year: {},
      cvc: {},
      name: {},
    },
  });

  const formatDate = e => {
    var v = e.target.value.replace(/\D/g, '');
    var matches = v.match(/\d{2,4}/g);
    var match = matches ? matches[0] : '';
    var parts = [];
    for (var i = 0, len = match.length; i < len; i += 2) {
      parts.push(match.substring(i, i + 2));
    }
    if (parts.length) {
      dispatch({ expDate: parts.join('/') });
      _onChange('exp_month', null, parts[0]);
      _onChange('exp_year', null, parts[1]);
    } else {
      dispatch({ expDate: v });
    }
  };

  const setMask = (value, mask, isCard = false) => {
    if (value?.slice(-1) !== ' ') {
      if (isCard && value) { value = value.replace(/\s/g, ''); }
      const formatter = new StringMask(mask);
      const result = formatter.apply(value);
      if (result.slice(-1) === ' ') {
        return result.slice(0, -1);
      } else {
        return result;
      }
    } else {
      return value?.slice(0, -1);
    }

  };

  const setValid = (info, valid) => {
    state.card[info].valid = valid;
    dispatch({ card: state.card });
  };

  const isFieldValid = (info, value) => {
    const date = new Date();
    switch (info) {

      case 'number':
        if (getCardType(value) === 'credit-card') {
          setValid('number', false);
        } else if (getCardMask(value)[1] > value.length) {
          setValid('number', false);
        } else {
          setValid('number', true);
        }
        break;

      case 'exp_month':
        if ((date.getMonth() + 1) < parseInt(value, 10) &&
          parseInt(value, 10) <= 12) {
          setValid('exp_month', true);
        } else {
          setValid('exp_month', false);
        }
        break;

      case 'exp_year':
        if ((date.getYear() - 100) < parseInt(value, 10)) {
          setValid('exp_year', true);
          setValid('exp_month', true);
        } else if ((date.getYear() - 100) === parseInt(value, 10)) {
          setValid('exp_year', true);
        } else {
          setValid('exp_year', false);
        }
        break;

      default:
        if (value?.length === 3) {
          setValid('cvc', true);
        } else {
          setValid('cvc', false);
        }
    }
    dispatch({ error: state.error });
    const isValid = state.card.number.valid && state.card.exp_month.valid &&
      state.card.exp_year.valid && state.card.cvc.valid;
    const fieldsState = {
      number: state.card.number.valid,
      exp_date: state.card.exp_year.valid && state.card.exp_month.valid,
      cvc: state.card.cvc.valid,
    };
    return { valid: isValid, fieldsState: fieldsState };

  };

  const _onChange = (info, e, date) => {
    const value = e?.target?.value || date;
    state.card[info].value = value?.replace(/\s/g, '');
    dispatch({ card: state.card });
    const valid = isFieldValid(info, value);
    const field = {
      key: cardKey,
      type: 'creditCard',
      valid: valid.isValid,
      fieldsState: valid.fieldsState,
      value: {
        number: state.card.number.value,
        exp_month: state.card.exp_month.value,
        exp_year: state.card.exp_year.value,
        cvc: state.card.cvc.value,
      },
    };
    onChange(field, null);
  };

  const _onFocus = () => onFocus(field);

  const _onBlur = () => onBlur(field);

  const getCardMask = cardNumber => {
    switch (getCardType(cardNumber)) {
      case 'american-express':
        return ['0000 000000 00000', 17];
      case 'diners-club':
        return ['00000 0000 00000', 16];
      default:
        return ['0000 0000 0000 0000', 19];
    }
  };

  const getCardType = cardNumber => {
    const card = creditCardType(cardNumber);
    if (card && card.length === 1) {
      return card[0].type;
    } else {
      return 'credit-card';
    }
  };

  const getCardIcon = () => {
    if (state.card.number.value) {
      return 'https://cdn.poool.fr/assets/pay/' +
        getCardType(state.card.number.value) +
      '.svg';
    } else {
      return 'https://cdn.poool.fr/assets/pay/credit-card.svg';
    }
  };

  return (
    <View style={styles.wrapper}>
      { state.card.number !== '' &&
        <Image
          style={styles.cardPicture}
          source={{ uri: getCardIcon() }}
        />
      }
      <View style={styles.number}>
        <Translate textKey='form_card_number' asString={true}>
          {
            ({ text }) => (
              <TextInput
                style={styles.input}
                maxLength={getCardMask(state.card.number.value)[1]}
                value={setMask(
                  state.card.number.value,
                  getCardMask(state.card.number.value)[0],
                  true,
                )}
                onChange={_onChange.bind(null, 'number')}
                onFocus={_onFocus}
                onBlur={_onBlur}
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
                value={state.expDate}
                onChange={formatDate}
                onFocus={_onFocus}
                onBlur={_onBlur}
                placeholder={text}
              />
            )}
        </Translate>
      </View>
      <View style={styles.cvc}>
        <TextInput
          style={styles.input}
          maxLength={3}
          onChange={_onChange.bind(null, 'cvc')}
          onFocus={_onFocus}
          onBlur={_onBlur}
          placeholder="CVC"
        />
      </View>
    </View>
  );
};

CardField.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  field: PropTypes.object,
  cardKey: PropTypes.string,
};

CardField.displayName = 'FormWidget';

export default CardField;

const styles = StyleSheet.create({
  cardPicture: {
    flex: 1,
    marginVertical: -7,
    resizeMode: 'contain',

  },
  cvc: {
    flex: 2,
    paddingLeft: 6,
  },
  date: {
    flex: 2,
    paddingLeft: 6,
  },
  input: {
    outlineWidth: 0,
  },
  number: {
    flex: 6,
    paddingLeft: 6,
  },
  wrapper: {
    overflow: 'hidden',
    backgroundColor: '#D4D4D4',
    borderColor: '#567',
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
});
