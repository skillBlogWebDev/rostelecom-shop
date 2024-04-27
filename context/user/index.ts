'use client'
import toast from 'react-hot-toast'
import { createDomain, createEffect } from 'effector'
import api from '@/api/apiInstance'
import { handleJWTError } from '@/lib/utils/errors'
import { setIsAuth } from '../auth'

export const user = createDomain()

export const loginCheck = user.createEvent<{ jwt: string }>()

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)
    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})
