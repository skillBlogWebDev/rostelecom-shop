import { EventCallable } from 'effector'
import { useState } from 'react'
import { IBaseEffectProps } from '@/types/common'

export const useProductDelete = (
  id: string,
  deleteEvent: EventCallable<IBaseEffectProps>
) => {
  const [deleteSpinner, setDeleteSpinner] = useState(false)

  const handleDelete = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    deleteEvent({
      setSpinner: setDeleteSpinner,
      jwt: auth.accessToken,
      id,
    })
  }

  return { handleDelete, deleteSpinner }
}
