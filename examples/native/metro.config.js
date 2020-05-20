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
    rootResolver: {
      root: path.resolve('../../src'),
      base: path.resolve('../base'),
    },
  },
  watchFolders: [
    path.resolve('../../node_modules'),
    path.resolve('../../src'),
    path.resolve('../base'),
  ],
};
