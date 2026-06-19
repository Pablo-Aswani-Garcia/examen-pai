module.exports = {
  // Base Google rules (JS)
  extends: ['google'],
  env: { es2021: true, node: true, browser: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'import'],
      extends: ['google', 'plugin:@typescript-eslint/recommended'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'max-len': 'off',
      },
    },
  ],
};