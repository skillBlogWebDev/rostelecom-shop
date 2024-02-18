import { useEarthoOne } from '@eartho/one-client-react'
import { useRouter } from 'next/navigation'
import { setIsAuth } from '@/context/auth'

export const useUserLogout = () => {
  const router = useRouter()
  const { logout } = useEarthoOne()

  return () => {
    logout({ client_id: `${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}` })
    localStorage.removeItem('auth')
    setIsAuth(false)
    router.push('/')
    window.location.reload()
  }
}
