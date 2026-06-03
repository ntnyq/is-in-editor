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

  // Emacs
  'EMACS',
  'EASK_EMACS',
  'ELLSP_EMACS',
  'INSIDE_EMACS',

  // Zed
  'ZED_IMPERSONATE',
]

const EXTRA_EDITOR_ENVS = ['TERM_PROGRAM']

function clearEditorEnvs() {
  for (const env of [...ENVS, ...EXTRA_EDITOR_ENVS]) {
    vi.stubEnv(env, '')
  }
}

describe('is-in-editor', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
    clearEditorEnvs()
  })

  it('should return false since it is not run in editor', () => {
    expect(isInEditor()).toBe(false)
  })

  it('should return false when env CI is set', () => {
    vi.stubEnv('CI', '1')

    expect(isInEditor()).toBe(false)
  })

  it.skipIf(isCI).each(ENVS)('should return true when env %s is set', env => {
    vi.stubEnv(env, '1')

    expect(isInEditor()).toBe(true)
  })
})
