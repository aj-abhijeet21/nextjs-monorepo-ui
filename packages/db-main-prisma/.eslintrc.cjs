/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/aj-abhijeet21/perso/tree/main/packages/eslint-config-bases
 */

// Workaround for https://github.com/eslint/eslint/issues/3458
require('@ajabhijeet21-internal/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@ajabhijeet21-internal/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), 'src/generated'],
  extends: [
    '@ajabhijeet21-internal/eslint-config-bases/typescript',
    '@ajabhijeet21-internal/eslint-config-bases/sonar',
    '@ajabhijeet21-internal/eslint-config-bases/regexp',
    // Apply prettier and disable incompatible rules
    '@ajabhijeet21-internal/eslint-config-bases/prettier-plugin',
  ],
  overrides: [
    // optional overrides per project file match
    {
      files: ['**/*seed.ts'],
      rules: {
        'sonarjs/no-duplicate-string': 'off',
      },
    },
  ],
};
