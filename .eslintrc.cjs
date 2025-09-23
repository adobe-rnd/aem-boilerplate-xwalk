module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
  ],
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': ['error', 'unix'], // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: ['**/*.test.js', '**/*.spec.js', 'playwright.config.js'],
    }],
    'xwalk/max-cells': ['error', {
      '*': 4, // default limit for all models
      form: 17,
      wizard: 12,
      'form-button': 7,
      'checkbox-group': 20,
      checkbox: 19,
      'date-input': 21,
      'drop-down': 20,
      email: 22,
      'file-input': 20,
      'form-fragment': 16,
      'form-image': 7,
      'multiline-input': 23,
      'number-input': 22,
      panel: 17,
      'radio-group': 20,
      'form-reset-button': 7,
      'form-submit-button': 7,
      'telephone-input': 20,
      'text-input': 23,
      accordion: 14,
      modal: 11,
      rating: 18,
      password: 20,
      tnc: 12,
      range: 19
    }],
    'xwalk/no-orphan-collapsible-fields': 'off', // Disable until enhancement is done for Forms properties
  },
};
