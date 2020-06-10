module.exports = {
  preset: 'react-native',
  timers: 'fake',
  clearMocks: true,
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/examples',
  ],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: [
    '<rootDir>/tests/config/enzyme.js',
    '<rootDir>/tests/config/atob.js',
    '<rootDir>/tests/config/crypto.js',
    '<rootDir>/tests/config/fetch.js',
    '@testing-library/jest-native/extend-expect',
  ],
};
