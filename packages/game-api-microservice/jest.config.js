module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/test/testSetup.ts'],
  globalSetup: '<rootDir>/src/test/helpers/testServer.ts',
  globalTeardown: '<rootDir>/src/test/helpers/endTests.ts',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageDirectory: './coverage',
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text']
}
