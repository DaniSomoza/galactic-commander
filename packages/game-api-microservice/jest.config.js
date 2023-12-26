module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/test/testSetup.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageDirectory: './coverage',
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text']
}
