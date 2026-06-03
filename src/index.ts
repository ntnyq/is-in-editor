import { env, isCI } from 'std-env'

export interface IsInEditorOptions {
  /**
   * Detection mode.
   *
   * - `loose`: returns `true` for editor-hosted terminals (default).
   * - `strict`: excludes editor-hosted terminals and only detects non-terminal editor runtime.
   */
  mode?: 'loose' | 'strict'
}

/**
 * Convert a value to a boolean.
 *
 * @param val - The value to convert.
 * @returns The boolean representation of the value.
 *
 * @see https://github.com/unjs/std-env/blob/main/src/_utils.ts
 */
function toBoolean(val: boolean | string | undefined) {
  return val ? val !== 'false' : false
}

function isEditorTerminal() {
  return env.TERM_PROGRAM === 'vscode'
}

function isBaseEditorEnv() {
  return (
    toBoolean(env.JETBRAINS_IDE) ||
    toBoolean(env.VIM) ||
    toBoolean(env.NVIM) ||
    toBoolean(env.ZED_IMPERSONATE) ||
    toBoolean(env.EMACS) ||
    toBoolean(env.ELLSP_EMACS) ||
    toBoolean(env.INSIDE_EMACS) ||
    toBoolean(env.EASK_EMACS)
  )
}

function isVSCodeEnv() {
  return toBoolean(env.VSCODE_PID) || toBoolean(env.VSCODE_CWD)
}

/**
 * Check if running in an editor.
 *
 * @param options - Configure detection strictness.
 * @returns `true` if running in an Editor, otherwise `false`.
 *
 * @example
 * ```
 * import { isInEditor } from 'is-in-editor'
 *
 * isInEditor()
 * //=> true if running in an Editor
 * ```
 */
export function isInEditor(options: IsInEditorOptions = {}): boolean {
  const { mode = 'loose' } = options

  if (isCI) {
    return false
  }

  if (mode === 'strict') {
    if (isEditorTerminal()) {
      return false
    }
    return isVSCodeEnv() || isBaseEditorEnv()
  }

  return isVSCodeEnv() || isBaseEditorEnv() || isEditorTerminal()
}
