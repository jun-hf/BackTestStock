const { configDefaults, defineConfig } = require('vitest/config')

export default defineConfig({
  test: {
    include: ['**/test/**'],
    exclude: [...configDefaults.exclude, '**/frontend'],
  },
})