/**
 * Specific eslint rules for this workspace, learn how to compose
 * @link https://github.com/aj-abhijeet21/nextjs-monorepo-ui/tree/main/packages/eslint-config-bases
 */

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
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@ajabhijeet21-internal/eslint-config-bases/typescript',
    '@ajabhijeet21-internal/eslint-config-bases/sonar',
    '@ajabhijeet21-internal/eslint-config-bases/regexp',
    '@ajabhijeet21-internal/eslint-config-bases/jest',
    // Apply prettier and disable incompatible rules
    '@ajabhijeet21-internal/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    // optional overrides per project
  },
  overrides: [
    // optional overrides per project file match
  ],
};
