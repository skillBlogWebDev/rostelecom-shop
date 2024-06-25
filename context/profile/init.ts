import { sample } from 'effector'
import {
  deleteUser,
  deleteUserFx,
  editUsername,
  editUsernameFx,
  uploadAvatar,
  uploadUserAvatarFx,
} from '.'

sample({
  clock: uploadAvatar,
  source: {},
  fn: (_, data) => data,
  target: uploadUserAvatarFx,
})

sample({
  clock: editUsername,
  source: {},
  fn: (_, data) => data,
  target: editUsernameFx,
})

sample({
  clock: deleteUser,
  source: {},
  fn: (_, data) => data,
  target: deleteUserFx,
})
