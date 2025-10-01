// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

const configsModel = require('@neno-liv/configs-model');
module.exports = [
  ...configsModel,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: [
          './projects/design-system/tsconfig.lib.json',
          './projects/design-system/tsconfig.lib.prod.json',
          './projects/design-system/tsconfig.spec.json',
          './projects/design-system/.storybook/tsconfig.json',
          './projects/demo/tsconfig.app.json',
          './projects/demo/tsconfig.spec.json',
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
          prefix: 'ui',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'ui',
          style: 'kebab-case'
        }
      ]
    }
  }
];