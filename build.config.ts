/**
 * @file UnBuild config
 */

import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ['src/index'],
  rollup: {
    emitCJS: true,
    esbuild: {
      charset: 'utf8',
    },
  },
})
