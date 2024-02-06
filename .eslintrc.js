module.exports = {
  extends: ['@poool/eslint-config-react-native'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react/prop-types': [2, { ignore: ['className', 'children'] }],
    'max-len': [2, { code: 80, tabWidth: 2, ignoreRegExpLiterals: true }],
    'react/react-in-jsx-scope': 0,
    '@poool/no-extra-parens': 0,
  },
  overrides: [{
    files: ['tests/**/*.js'],
    env: {
      jest: true,
    },
  }, {
    files: ['*.ts', '*.tsx'],
    extends: [
      '@poool/eslint-config-react-native',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
    },
  }, {
    files: ['example/**/*.js'],
    rules: {
      'no-console': 0,
      'react-native/no-inline-styles': 0,
      'react-native/no-color-literals': 0,
    },
  }],
};
