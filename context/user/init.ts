'use client'
import { sample } from 'effector'
import { loginCheck, loginCheckFx } from '.'
import { $user } from './state'

sample({
  clock: loginCheck,
  source: $user,
  fn: (_, { jwt }) => ({
    jwt,
  }),
  target: loginCheckFx,
})
