import { validateDate, validateEmail } from '../../src/services/validate';

describe('validate.js', () => {

  it('should return false when it is called without date value ', () => {
    expect(validateDate()).toBe(false);
  });

  it('should return false when it is called with wrong date value ', () => {
    expect(validateDate('not a date')).toBe(false);
  });

  it('should return true when it is called with a valid date value ', () => {
    expect(validateDate('05/11/2020')).toBe(true);
  });

  it('should return false when it is called without email value ', () => {
    expect(validateEmail()).toBe(false);
  });

  it('should return false when it is called with wrong email value ', () => {
    expect(validateDate('not a mail')).toBe(false);
  });

  it('should return false when it is called with a valid email value ', () => {
    expect(validateDate('test@test.fr')).toBe(false);
  });

});
