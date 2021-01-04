import {
  validateDate,
  validateEmail,
  validateCreditCard,
} from '../../src/services/validate';

describe('validate.js', () => {

  it('should return false when it is called without date value ', () => {
    expect(validateDate()).toBe(false);
  });

  it('should return false when it is called with wrong date value ', () => {
    expect(validateDate('not a date')).toBe(false);
  });

  it('should return true for DMY format ', () => {
    expect(validateDate('05/11/2020', 'dd/mm/yyyy')).toBe(true);
  });

  it('should return true for MDY format', () => {
    expect(validateDate('05/11/2020', 'mm/dd/yyyy')).toBe(true);
  });

  it('should return true for YMD format ', () => {
    expect(validateDate('2020/10/05', 'yyyy/mm/dd')).toBe(true);
  });

  it('should return false when it is called without email value ', () => {
    expect(validateEmail()).toBe(false);
  });

  it('should return false when it is called with wrong email value ', () => {
    expect(validateEmail('not a mail')).toBe(false);
  });

  it('should return false when it is called with a valid email value ', () => {
    expect(validateEmail('test@test.fr')).toBe(true);
  });

  it('should return false when it is called without card infos ', () => {
    expect(validateCreditCard()).toBe(false);
  });

  it('should return false for an incomplete card ', () => {
    const card = {
      number: { value: '4242424242424242', valid: true },
      exp_month: { value: '01', valid: true },
      exp_year: { value: '2056', valid: true },
      cvc: {},
    };
    expect(validateCreditCard(card)).toBe(false);
  });

  it('should return false for an card with invalid field', () => {
    const card = {
      number: { value: '4242424242424242', valid: true },
      exp_month: { value: '01', valid: true },
      exp_year: { value: '1998', valid: false },
      cvc: { value: '330', valid: true },
    };
    expect(validateCreditCard(card)).toBe(false);
  });

  it('should return true for a valid card ', () => {
    const card = {
      number: { value: '4242424242424242', valid: true },
      exp_month: { value: '01', valid: true },
      exp_year: { value: '2056', valid: true },
      cvc: { value: '330', valid: true },
    };
    expect(validateCreditCard(card)).toBe(true);
  });

});
