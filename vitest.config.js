const { configDefaults, defineConfig } = require('vitest/config');

export default defineConfig({
  test: {
    globals: true,
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude, '**/frontend']
    },
});