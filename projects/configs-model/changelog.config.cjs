module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji} {subject}',
  list: [
    'wip',
    'linter',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'fix2',
    'cleandeadcode',
    'perf',
    'refactor',
    'release',
    'style',
    'test'
  ],
  maxMessageLength: 72,
  minMessageLength: 3,
  questions: ['type', 'scope', 'subject', 'body', 'issues', 'lerna'],
  scopes: [],
  types: {
    wip: {
      description: 'Work in progress.',
      emoji: '🚧',
      value: 'wip'
    },
    linter: {
      description:
        'Fix compiler / linter warnings / Improve structure / format of the code.',
      emoji: '🚨',
      value: 'linter'
    },
    chore: {
      description: 'Build process or auxiliary tool changes',
      emoji: '🤖',
      value: 'chore'
    },
    ci: {
      description: 'Add or update CI build system.',
      emoji: '👷',
      value: 'ci'
    },
    docs: {
      description: 'Add or update documentation.',
      emoji: '📝',
      value: 'docs'
    },
    feat: {
      description: 'Introduce new features.',
      emoji: '✨',
      value: 'feat'
    },
    fix: {
      description: 'Fix a bug.',
      emoji: '🐛',
      value: 'fix'
    },
    fix2: {
      description: 'Simple fix for a non-critical issue.',
      emoji: '🩹',
      value: 'fix'
    },
    cleandeadcode: {
      description: 'Remove dead code.',
      emoji: '⚰️',
      value: 'cleandeadcode'
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '🚀',
      value: 'perf'
    },
    refactor: {
      description: 'Refactor code.',
      emoji: '♻️',
      value: 'refactor'
    },
    release: {
      description: 'Release / Version tags.',
      emoji: '🔖',
      value: 'release'
    },
    style: {
      description: 'Add or update the UI or style files',
      emoji: '💄',
      value: 'style'
    },
    test: {
      description: 'Add, update, or pass tests.',
      emoji: '✅',
      value: 'test'
    }
  }
};
