import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';

import CardField from '../src/components/CardField';
import PaywallContext from '../src/components/PaywallContext';

describe('<CardField />', () => {

  let card;

  const onChange = (field, input) => { card = input; };

  const today = new Date();

  it('should return all fields as invalid', async () => {

    const date = '13/' + (today.getYear() - 101);

    const { getByTestId } = render(
      <PaywallContext>
        <CardField
          onChange={onChange}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Text>Test</Text>
      </PaywallContext>
    );

    const cardNumber = getByTestId('cardNumber');
    fireEvent(cardNumber, 'focus');
    fireEvent.changeText(cardNumber, '4242');
    fireEvent(cardNumber, 'blur');

    const cardDate = getByTestId('cardDate');
    fireEvent(cardDate, 'focus');
    fireEvent.changeText(cardDate, date);
    fireEvent(cardDate, 'blur');

    const cardCvc = getByTestId('cardCvc');
    fireEvent(cardCvc, 'focus');
    fireEvent.changeText(cardCvc, '01');
    fireEvent(cardCvc, 'blur');

    expect(card.number.valid).toBe(false);
    expect(card.cvc.valid).toBe(false);
    expect(card.exp_month.valid).toBe(false);
    expect(card.exp_year.valid).toBe(false);
  });

  it('should return number field as invalid if number is unrecognized',
    async () => {

      const { getByTestId } = render(
        <PaywallContext>
          <CardField
            onChange={onChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <Text>Test</Text>
        </PaywallContext>
      );

      const cardNumber = getByTestId('cardNumber');
      fireEvent(cardNumber, 'focus');
      fireEvent.changeText(cardNumber, '9999999999999999');
      fireEvent(cardNumber, 'blur');

      const cardDate = getByTestId('cardDate');
      fireEvent(cardDate, 'focus');
      fireEvent.changeText(cardDate, '1');
      fireEvent(cardDate, 'blur');

      expect(card.number.valid).toBe(false);

    });

  it('should return date field as invalid for an earlier month of the year',
    async () => {

      const date = `${
        today.getMonth().length === 2
          ? today.getMonth()
          : '0' + today.getMonth()
      }/${today.getYear() - 100}`;

      const { getByTestId } = render(
        <PaywallContext>
          <CardField
            onChange={onChange}
            onFocus={() => {}}
            onBlur={() => {}}
          />
          <Text>Test</Text>
        </PaywallContext>
      );

      const cardDate = getByTestId('cardDate');
      fireEvent(cardDate, 'focus');
      fireEvent.changeText(cardDate, date);
      fireEvent(cardDate, 'blur');

      expect(card.exp_month.valid).toBe(true);
      expect(card.exp_year.valid).toBe(false);
    });

  it('should return all field as valid for AE cards', async () => {

    const date = '12/' + (today.getYear() - 99);

    const { getByTestId } = render(
      <PaywallContext>
        <CardField
          onChange={onChange}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Text>Test</Text>
      </PaywallContext>
    );

    const cardNumber = getByTestId('cardNumber');
    fireEvent(cardNumber, 'focus');
    fireEvent.changeText(cardNumber, '371449635398431');
    fireEvent(cardNumber, 'blur');

    const cardDate = getByTestId('cardDate');
    fireEvent(cardDate, 'focus');
    fireEvent.changeText(cardDate, date);
    fireEvent(cardDate, 'blur');

    const cardCvc = getByTestId('cardCvc');
    fireEvent(cardCvc, 'focus');
    fireEvent.changeText(cardCvc, '111');
    fireEvent(cardCvc, 'blur');

    expect(card.number.valid).toBeTruthy();
    expect(card.cvc.valid).toBeTruthy();
    expect(card.exp_month.valid).toBeTruthy();
    expect(card.exp_year.valid).toBeTruthy();
  });

  it('should return all field as valid for DC cards', async () => {

    const date = `${
      today.getMonth().length === 2
        ? today.getMonth() + 1
        : '0' + (today.getMonth() + 1)
    }/${today.getYear() - 100}`;

    const { getByTestId } = render(
      <PaywallContext>
        <CardField
          onChange={onChange}
          onFocus={() => {}}
          onBlur={() => {}}
        />
        <Text>Test</Text>
      </PaywallContext>
    );

    const cardNumber = getByTestId('cardNumber');
    fireEvent(cardNumber, 'focus');
    fireEvent.changeText(cardNumber, '30569309025904');
    fireEvent(cardNumber, 'blur');

    const cardDate = getByTestId('cardDate');
    fireEvent(cardDate, 'focus');
    fireEvent.changeText(cardDate, date);
    fireEvent(cardDate, 'blur');

    const cardCvc = getByTestId('cardCvc');
    fireEvent(cardCvc, 'focus');
    fireEvent.changeText(cardCvc, '111');
    fireEvent(cardCvc, 'blur');

    expect(card.number.valid).toBeTruthy();
    expect(card.cvc.valid).toBeTruthy();
    expect(card.exp_month.valid).toBeTruthy();
    expect(card.exp_year.valid).toBeTruthy();
  });
});
