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

  it('should not pass when in CI', () => {
    expect(isInEditor()).toBeFalsy()
  })

  ENVS.forEach(env => {
    it.skipIf(isCI)(`should pass when env ${env} is set`, () => {
      vi.stubEnv(env, '1')

      expect(isInEditor()).toBeTruthy()
    })
  })
})
