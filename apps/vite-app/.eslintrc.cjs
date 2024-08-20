/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/aj-abhijeet21/nextjs-monorepo-ui/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
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
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@ajabhijeet21-internal/eslint-config-bases/typescript',
    '@ajabhijeet21-internal/eslint-config-bases/sonar',
    '@ajabhijeet21-internal/eslint-config-bases/regexp',
    '@ajabhijeet21-internal/eslint-config-bases/jest',
    '@ajabhijeet21-internal/eslint-config-bases/react',
    '@ajabhijeet21-internal/eslint-config-bases/rtl',
    // Apply prettier and disable incompatible rules
    '@ajabhijeet21-internal/eslint-config-bases/prettier-plugin',
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [],
};
