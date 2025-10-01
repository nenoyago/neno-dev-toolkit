const configsModel = require('@nenoyago/configs-model');

module.exports = [
  ...configsModel,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          './projects/design-system/tsconfig.lib.json',
          './projects/design-system/tsconfig.lib.prod.json',
          './projects/design-system/tsconfig.spec.json'
        ]
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