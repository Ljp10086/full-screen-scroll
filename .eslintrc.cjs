module.exports = {
  files: ['packages/**/*.ts'],
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
};
