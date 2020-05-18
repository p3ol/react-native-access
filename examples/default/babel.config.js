const path = require('path');

module.exports = {
  presets: ['module:@haul-bundler/babel-preset-react-native'],
  plugins: [
    ['module-resolver', {
      alias: {
        '@poool/react-native-access': path.resolve('../../src'),
      },
    }],
  ],
};
