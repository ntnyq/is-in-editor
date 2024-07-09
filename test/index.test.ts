import { isCI } from 'std-env'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isInEditor } from '../src'

const ENVS = [
  // VSCode
  'VSCODE_PID',
  'VSCODE_CWD',

  // Vim
  'VIM',
  // NeoVim
  'NVIM',

  // JetBrains IDE
  'JETBRAINS_IDE',
]

describe('is-in-editor', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  it('should return false since it is not run in editor', () => {
    expect(isInEditor()).toBe(false)
  })

  it('should return false when env CI is set', () => {
    vi.stubEnv('CI', '1')

    expect(isInEditor()).toBe(false)
  })

  ENVS.forEach(env => {
    it.skipIf(isCI)(`should return true when env ${env} is set`, () => {
      vi.stubEnv(env, '1')

      expect(isInEditor()).toBe(true)
    })
  })
})
