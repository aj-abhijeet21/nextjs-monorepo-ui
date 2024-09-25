import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: true,
  treeshake: true,
  dts: true,
  clean: true,
  format: ['esm', 'cjs'],
  outDir: 'dist',
  platform: 'browser',
  target: ['es2020', 'chrome70', 'edge18', 'firefox70', 'node18'],
  tsconfig: new URL('./tsconfig.build.json', import.meta.url).pathname,
  sourcemap: !options.watch,
  minify: !options.watch,
  outExtension: ({ format }) => ({
    js: format === 'esm' ? '.esm.mjs' : '.js', // Use .esm.mjs for ESM and .js for CJS
  }),
}));
