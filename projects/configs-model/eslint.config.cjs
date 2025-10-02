const prettierConfig = require('./prettier.config.cjs');
const tsParser = require('@typescript-eslint/parser');
const tsEslint = require('@typescript-eslint/eslint-plugin');
const angularEslint = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');
const unusedImports = require('eslint-plugin-unused-imports');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginImport = require('eslint-plugin-import');
const templateParser = require('@angular-eslint/template-parser');

module.exports = [
  {
    ignores: ['dist/**', '*.config.*']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      '@angular-eslint': angularEslint,
      'unused-imports': unusedImports,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport
    },
    rules: {
      // Prettier controla formatação
      'prettier/prettier': ['error', prettierConfig],
      'comma-dangle': 'off',
      semi: 'off',

      // Imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['sibling', 'parent'],
            'index',
            'unknown'
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            { pattern: '@angular/**', group: 'external', position: 'before' },
            { pattern: '@app/**', group: 'internal', position: 'after' },
            { pattern: '@env/**', group: 'internal', position: 'after' },
            { pattern: '@core/**', group: 'internal', position: 'after' },
            { pattern: '@shared/**', group: 'internal', position: 'after' }
          ],
          pathGroupsExcludedImportTypes: ['builtin']
        }
      ],

      // Angular
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'liv', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'liv', style: 'kebab-case' }
      ],

      // Code quality
      curly: ['error', 'all'],
      'no-empty-functions': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        { allow: ['constructors'] }
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'warn',
      '@typescript-eslint/unbound-method': ['warn', { ignoreStatic: true }],
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'max-len': [
        'error',
        {
          code: 120,
          tabWidth: 4,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreRegExpLiterals: true
        }
      ],
      'max-lines-per-function': [
        'error',
        { max: 45, skipBlankLines: true, skipComments: true }
      ],
      'prefer-spread': 'warn',
      'prefer-const': 'error',
      'rest-spread-spacing': ['warn'],
      'max-nested-callbacks': ['error', 4],
      'no-trailing-spaces': ['error', { skipBlankLines: true }],
      'object-shorthand': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-duplicate-imports': ['error', { includeExports: true }],
      eqeqeq: ['error', 'always']
    }
  },
  {
    files: ['**/*.html'],
    languageOptions: { parser: templateParser },
    plugins: { '@angular-eslint/template': angularTemplate },
    processor: '@angular-eslint/template/extract-inline-html',
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/banana-in-box': 'warn'
    }
  }
];
