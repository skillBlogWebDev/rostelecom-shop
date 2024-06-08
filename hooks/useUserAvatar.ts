import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'
import { $user } from '@/context/user/state'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (user.image) {
      setSrc(user.image)
      return
    }

    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@oneclientjs@@::l3Q4jO58IChQRwUkzkHI::@@user@@'
      ) as string
    )

    if (!oauthAvatar) {
      return
    }

    setSrc(oauthAvatar.decodedToken.user.photoURL)
  }, [user.image])

  return { src, alt: user.name }
}
