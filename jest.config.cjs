module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['babel-jest', { presets: ['@exercism/babel-preset-typescript'] }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
