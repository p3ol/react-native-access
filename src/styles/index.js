import * as texts from './texts';

export { default as colors } from './colors';
export { default as commons } from './commons';
export { default as overrides } from './overrides';

export const applyStyles = (condition, styles) =>
  condition ? [].concat(styles) : [];

export { texts };
