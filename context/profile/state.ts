import { profile, uploadUserAvatarFx } from '.'

export const $userImage = profile
  .createStore<string>('')
  .on(uploadUserAvatarFx.done, (_, { result }) => result.image)
