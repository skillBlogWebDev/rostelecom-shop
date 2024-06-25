'use client'
import { IUser, IUserGeolocation } from '@/types/user'
import {
  user,
  loginCheckFx,
  setUserGeolocation,
  updateUsername,
  updateUserImage,
  updateUserEmail,
} from '.'

export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)
  .on(updateUsername, (state, name) => ({ ...state, name }))
  .on(updateUserImage, (state, image) => ({ ...state, image }))
  .on(updateUserEmail, (state, email) => ({ ...state, email }))

export const $userGeolocation = user
  .createStore<IUserGeolocation>({} as IUserGeolocation)
  .on(setUserGeolocation, (_, data) => data)
