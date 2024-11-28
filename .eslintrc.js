module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'max-len': ['warn', { code: 150 }],
    'no-unused-vars': 'off',
    'no-console': 'off',
  },
};
