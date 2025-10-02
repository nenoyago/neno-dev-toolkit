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
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'ds',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ds',
          style: 'kebab-case'
        }
      ]
    }
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
