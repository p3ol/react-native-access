import colors from '../../src/styles/colors';

describe('colors.js', () => {
  it('should return monzeAlpha with the correct alpha value', () => {
    expect(colors.monzaAlpha(0.5)).toBe('rgba(208, 2, 27, 0.5)');
  });
});
