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
    '@testing-library/jest-native/extend-expect',
  ],
};
