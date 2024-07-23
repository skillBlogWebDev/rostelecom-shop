import axios from 'axios'
import { createDomain } from 'effector'
import toast from 'react-hot-toast'
import { handleJWTError } from '@/lib/utils/errors'
import {
  IDeleteUserFx,
  IEditUserEmailFx,
  IEditUsernameFx,
  IUploadUserAvatarFx,
  IVerifyCodeFx,
  IVerifyEmailFx,
} from '@/types/profile'
import api from '@/api/apiInstance'
import { updateUserEmail, updateUserImage, updateUsername } from '../user'

export const profile = createDomain()

export const uploadAvatar = profile.createEvent<IUploadUserAvatarFx>()
export const editUsername = profile.createEvent<IEditUsernameFx>()
export const deleteUser = profile.createEvent<IDeleteUserFx>()

export const uploadUserAvatarFx = profile.createEffect(
  async ({ jwt, formData }: IUploadUserAvatarFx) => {
    try {
      const { data } = await axios({
        method: 'post',
        url: '/api/users/avatar',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${jwt}`,
        },
      })

      if (data?.error) {
        const result: { image: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'uploadUserAvatarFx',
            payload: { formData },
          }
        )
        return result
      }

      updateUserImage(data.image)
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const editUsernameFx = profile.createEffect(
  async ({ jwt, setEdit, name }: IEditUsernameFx) => {
    try {
      const { data } = await api.patch(
        '/api/users/edit/name',
        { name },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        const result: { name: string } = await handleJWTError(data.error.name, {
          repeatRequestMethodName: 'editUsernameFx',
          payload: { setEdit, name },
        })
        return result
      }

      toast.success('Имя сохранено!')
      setEdit(false)
      localStorage.setItem('auth', JSON.stringify(data.tokens))
      updateUsername(name)
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const verifyEmailFx = profile.createEffect(
  async ({ jwt, email }: IVerifyEmailFx) => {
    try {
      const { data } = await api.post(
        '/api/users/edit/email/verify-email',
        { email },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        if (
          data.error?.message === 'Пользователь с таким email уже существует'
        ) {
          toast.error(data.error.message)
          return
        }
        const result: { codeId: string } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'verifyEmailFx',
            payload: { email },
          }
        )
        return result
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const verifyCodeFx = profile.createEffect(
  async ({ jwt, code, codeId }: IVerifyCodeFx) => {
    try {
      const { data } = await api.post(
        '/api/users/verify-code',
        { code, codeId },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (data?.error) {
        if (data.error?.message) {
          toast.error(data.error.message)
          return
        }

        const result: { result: boolean } = await handleJWTError(
          data.error.name,
          {
            repeatRequestMethodName: 'verifyCodeFx',
            payload: { code, codeId },
          }
        )
        return result
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const editUserEmailFx = profile.createEffect(
  async ({ jwt, setEdit, code, codeId, email }: IEditUserEmailFx) => {
    try {
      const data = await verifyCodeFx({ code, codeId, jwt })

      if (!data) {
        return
      }

      const result = await api.patch(
        '/api/users/edit/email',
        { email },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      )

      if (result.data?.error) {
        const newData: { email: string } = await handleJWTError(
          result.data.error.name,
          {
            repeatRequestMethodName: 'editUsernameFx',
            payload: { setEdit, code, codeId, email },
          }
        )
        return newData
      }

      toast.success('Email сохранен!')
      setEdit(false)
      localStorage.setItem('auth', JSON.stringify(result.data.tokens))
      updateUserEmail(email)
      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const deleteUserFx = profile.createEffect(
  async ({ jwt, id, handleLogout }: IDeleteUserFx) => {
    try {
      const { data } = await api.delete(`/api/users/delete?id=${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      })

      if (data?.error) {
        handleJWTError(data.error.name, {
          repeatRequestMethodName: 'deleteUserFx',
          payload: { id, handleLogout },
        })
        return
      }

      toast.success('Аккаунт удален!')
      handleLogout()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)
