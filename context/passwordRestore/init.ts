import { sample } from 'effector'
import { updateUserPassword, updateUserPasswordFx } from '.'

sample({
  clock: updateUserPassword,
  source: {},
  fn: (_, data) => data,
  target: updateUserPasswordFx,
})
