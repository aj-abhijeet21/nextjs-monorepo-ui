/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/aj-abhijeet21/nextjs-monorepo-ui/blob/main/docs/about-linters.md
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
