const path = require('node:path');

const { makeMetroConfig } = require('@rnx-kit/metro-config');
const { getDefaultConfig } = require('@react-native/metro-config');
const { getConfig } = require('react-native-builder-bob/metro-config');

const pkg = require('../package.json');

const root = path.resolve(__dirname, '../');

// module.exports = makeMetroConfig({
//   ...getConfig(getDefaultConfig(__dirname), { root, pkg, project: __dirname }),
//   // transformer: {
//   //   getTransformOptions: async () => ({
//   //     transform: {
//   //       experimentalImportSupport: false,
//   //       inlineRequires: false,
//   //     },
//   //   }),
//   // },
// });

module.exports = getConfig(getDefaultConfig(__dirname), {
  root,
  pkg,
  project: __dirname,
});
