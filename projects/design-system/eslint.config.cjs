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
          '.storybook/tsconfig.json'
        ]
      }
    },
  },
  {
    files: ['.storybook/**/*.ts', '.storybook/**/*.js'],
    languageOptions: {
      parserOptions: {
        project: ['./.storybook/tsconfig.json']
      }
    }
  }
];
