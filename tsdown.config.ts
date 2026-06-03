import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  deps: {
    onlyBundle: ['std-env'],
  },
  dts: {
    tsgo: true,
  },
  entry: ['src/index.ts'],
  minify: 'dce-only',
  platform: 'node',
})
