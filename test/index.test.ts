import { expect, it } from 'vitest'
import { isInEditor } from '../src'

it('should not in editor', () => {
  expect(isInEditor()).toBeFalsy()
})
