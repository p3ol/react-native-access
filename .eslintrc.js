module.exports = {
  extends: ['@poool/eslint-config-react-native'],
  rules: {
    'react/prop-types': [2, { ignore: ['className', 'children'] }],
  },
  overrides: [{
    files: ['tests/**/*.js'],
    parser: 'babel-eslint',
    env: {
      jest: true,
    },
  }, {
    files: ['examples/base/**/*.js'],
    rules: {
      'no-console': 0,
    },
  }],
};
