const { list } = require('./changelog.config.cjs');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', list],
  },
};
