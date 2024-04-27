'use client'

import toast from 'react-hot-toast'
import {
  auth,
  closeAuthPopup,
  openAuthPopup,
  setIsAuth,
  singInFx,
  singUpFx,
} from '.'

export const $openAuthPopup = auth
  .createStore<boolean>(false)
  .on(openAuthPopup, () => true)
  .on(closeAuthPopup, () => false)

export const $isAuth = auth
  .createStore(false)
  .on(setIsAuth, (_, isAuth) => isAuth)

export const $auth = auth
  .createStore({})
  .on(singUpFx.done, (_, { result }) => result)
  .on(singUpFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
  .on(singInFx.done, (_, { result }) => result)
  .on(singInFx.fail, (_, { error }) => {
    toast.error(error.message)
  })
