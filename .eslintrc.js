module.exports = {
  extends: ['@poool/eslint-config/frontend'],
  overrides: [{
    files: ['tests/**/*.js'],
    parser: 'babel-eslint',
    env: {
      jest: true,
    },
  }],
}
