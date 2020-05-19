const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        '@poool/react-native-access': path.resolve('../../src'),
      },
    }],
  ],
};
