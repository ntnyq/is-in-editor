import { isCI } from 'std-env'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isInEditor } from '../src'

describe('is-in-editor', () => {
  beforeEach(() => {
    vi.unstubAllEnvs()
  })

  it('should not pass when in CI', () => {
    expect(isInEditor()).toBeFalsy()
  })

  it.skipIf(isCI)('should pass when env VSCODE_PID is set', () => {
    vi.stubEnv('VSCODE_PID', '1')

    expect(isInEditor()).toBeTruthy()
  })

  it.skipIf(isCI)('should pass when env JETBRAINS_IDE is set', () => {
    vi.stubEnv('JETBRAINS_IDE', '1')

    expect(isInEditor()).toBeTruthy()
  })
})
