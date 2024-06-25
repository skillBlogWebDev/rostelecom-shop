import { Effect } from 'effector'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { editUserEmailFx, editUsername, verifyEmailFx } from '@/context/profile'
import { isUserAuth } from '@/lib/utils/common'

export const useProfileEdit = <T, K>(
  initialValue: string,
  effect: Effect<T, K, Error>
) => {
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState(false)
  const spinner = useUnit(effect.pending)
  const [showCodeInput, setShowCodeInput] = useState(false)
  const [codeId, setCodeId] = useState('')

  const handleEdit = () => setEdit(true)
  const handleCancelEdit = () => {
    setValue(initialValue)
    setEdit(false)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleSaveNewName = () => {
    if (!isUserAuth()) {
      return
    }

    if (value === initialValue) {
      setEdit(false)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    editUsername({
      jwt: auth.accessToken,
      name: value,
      setEdit,
    })
  }

  const handleVerifyEmail = async () => {
    if (!isUserAuth()) {
      return
    }

    if (value === initialValue) {
      setEdit(false)
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const result = await verifyEmailFx({
      email: value,
      jwt: auth.accessToken,
    })

    if (!result) {
      return
    }

    setCodeId(result.codeId)
    setShowCodeInput(true)
  }

  const handleCompleteEmailVerification = async (codeFromInput: string) => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const data = await editUserEmailFx({
      jwt: auth.accessToken,
      code: +codeFromInput,
      codeId,
      setEdit,
      email: value,
    })

    if (data?.result) {
      setShowCodeInput(false)
    }
  }

  return {
    handleSaveNewName,
    edit,
    setEdit,
    handleEdit,
    handleCancelEdit,
    spinner,
    handleChange,
    showCodeInput,
    handleVerifyEmail,
    handleCompleteEmailVerification,
  }
}
