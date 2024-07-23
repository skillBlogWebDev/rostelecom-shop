'use client'
import { IUpdateUserPasswordFx, IVerifyCodeFx } from '@/types/passwordRestore'
import { createDomain } from 'effector'
import toast from 'react-hot-toast'
import api from '@/api/apiInstance'

export const passwordRestore = createDomain()

export const updateUserPassword =
  passwordRestore.createEvent<IUpdateUserPasswordFx>()

export const verifyEmailFx = passwordRestore.createEffect(
  async ({ email }: { email: string }) => {
    try {
      const { data } = await api.post(
        '/api/users/password-restore/verify-email',
        {
          email,
        }
      )

      if (data?.error) {
        toast.error(data.error.message)
        return
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const verifyCodeFx = passwordRestore.createEffect(
  async ({ code, codeId }: IVerifyCodeFx) => {
    try {
      const { data } = await api.post('/api/users/verify-code', {
        code,
        codeId,
      })

      if (data?.error) {
        toast.error(data.error.message)
        return
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const updateUserPasswordFx = passwordRestore.createEffect(
  async ({ email, password }: IUpdateUserPasswordFx) => {
    try {
      const { data } = await api.post('/api/users/password-restore', {
        email,
        password,
      })

      toast.success('Пароль успешно изменен!')
      window.location.href = '/'
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
