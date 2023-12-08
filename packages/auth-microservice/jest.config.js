module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/test/testSetup.ts'],
  coverageDirectory: './coverage',
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text']
}
