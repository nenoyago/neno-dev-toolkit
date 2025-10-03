const configsModel = require('@nenoyago/configs-model');

module.exports = [
  ...configsModel,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          './tsconfig.lib.json',
          './tsconfig.lib.prod.json',
          './tsconfig.spec.json',
        ]
      }
    },
  }
];
