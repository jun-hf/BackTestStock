const { configDefaults, defineConfig } = require('vitest/config');

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [...configDefaults.exclude, '**/frontend']
    },
});