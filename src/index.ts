import { env, isCI } from 'std-env'

/**
 * @see https://github.com/unjs/std-env/blob/main/src/_utils.ts
 */
function toBoolean(val: boolean | string | undefined) {
  return val ? val !== 'false' : false
}

/**
 * Check if running in an editor.
 *
 * @example
 * ```
 * import { isInEditor } from 'is-in-editor'
 *
 * isInEditor()
 * //=> true if running in an Editor
 * ```
 */
export function isInEditor() {
  return (
    (toBoolean(env.VSCODE_PID) ||
      toBoolean(env.VSCODE_CWD) ||
      toBoolean(env.JETBRAINS_IDE) ||
      toBoolean(env.VIM)) &&
    !isCI
  )
}
