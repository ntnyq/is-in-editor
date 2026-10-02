import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  deps: {
    onlyBundle: ['std-env'],
  },
  dts: {
    generator: 'tsgo',
  },
  entry: ['src/index.ts'],
  minify: 'dce-only',
  platform: 'node',
})
