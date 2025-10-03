const configsModel = require('@nenoyago/configs-model');

module.exports = [
  ...configsModel,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './projects/*/tsconfig*.json']
      }
    }
  },
  {
    files: ['projects/design-system/**/*.ts'],
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
  }
];