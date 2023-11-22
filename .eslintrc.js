module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  env: {
    browser: true,
    es6: true,
    node: true
  },
  rules: {
    'prettier/prettier': 'error'
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows parsing modern ECMAScript features
    sourceType: 'module' // Allows the use of imports
  },
  ignorePatterns: ['/node_modules/', '/dist/']
}
