const configsModel = require('@nenoyago/configs-model');

module.exports = [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '**/.angular/**',
      '**/coverage/**',
      '**/*.js',
      '!eslint.config.cjs',
      '!**/*.config.cjs'
    ]
  },
  ...configsModel,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './projects/*/tsconfig*.json']
      }
    }
  }
];