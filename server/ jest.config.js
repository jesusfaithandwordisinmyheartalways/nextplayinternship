export default {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.js'],
    testEnvironment: 'node',
    testPathIgnorePatterns: [
      "/node_modules/",
      "/tests/test.js",
    ],
  };