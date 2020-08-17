const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        '@poool/react-native-access': path.resolve('../../src'),
        react: path.resolve('../../node_modules/react'),
        'react-dom': path.resolve('../../node_modules/react-dom'),
        'react-native': path.resolve('../../node_modules/react-native'),
        stream: 'readable-stream',
      },
    }],
  ],
};
