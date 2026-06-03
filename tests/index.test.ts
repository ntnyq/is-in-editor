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

  it('should return false when env CI is set', async () => {
    vi.stubEnv('CI', '1')
    vi.resetModules()
    const { isInEditor: isInEditorWithCI } = await import('../src')

    expect(isInEditorWithCI()).toBe(false)
  })

  // In CI, isInEditor intentionally returns false regardless of editor envs.
  it.skipIf(isCI)(
    'should return true in loose mode for VSCode terminal',
    () => {
      vi.stubEnv('TERM_PROGRAM', 'vscode')

      expect(isInEditor({ mode: 'loose' })).toBe(true)
    },
  )

  it('should return false in strict mode for VSCode terminal', () => {
    vi.stubEnv('TERM_PROGRAM', 'vscode')

    expect(isInEditor({ mode: 'strict' })).toBe(false)
  })

  // This assertion is meaningful only outside CI due to the CI short-circuit.
  it.skipIf(isCI)(
    'should still return true in strict mode for non-terminal VSCode env',
    () => {
      vi.stubEnv('VSCODE_PID', '1')

      expect(isInEditor({ mode: 'strict' })).toBe(true)
    },
  )

  // Same as above: all positive editor detections are masked in CI.
  it.skipIf(isCI).each(ENVS)('should return true when env %s is set', env => {
    vi.stubEnv(env, '1')

    expect(isInEditor()).toBe(true)
  })
})
