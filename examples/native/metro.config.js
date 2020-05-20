const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    customResolver: {
      root: path.resolve('../../src'),
      base: path.resolve('../base'),
    },
  },
  watchFolders: [
    path.resolve('../../'),
    path.resolve('../base/'),
  ],
};
