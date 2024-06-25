'use client'

import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import ProfileAvatar from '@/components/modules/ProfilePage/ProfileAvatar'
import { $user } from '@/context/user/state'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { usePageTitle } from '@/hooks/usePageTitle'
import { useUnit } from 'effector-react'
import styles from '@/styles/profile/index.module.scss'
import ProfileName from '@/components/modules/ProfilePage/ProfileName'
import ProfileEmail from '@/components/modules/ProfilePage/ProfileEmail'
import { useLang } from '@/hooks/useLang'
import { deleteUser, deleteUserFx } from '@/context/profile'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserLogout } from '@/hooks/useLogout'

const ProfilePage = () => {
  const { lang, translations } = useLang()
  const user = useUnit($user)
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('profile')
  usePageTitle('profile', user.name)
  const deleteUserSpinner = useUnit(deleteUserFx.pending)
  const handleLogout = useUserLogout()

  const handleDeleteUser = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    deleteUser({
      jwt: auth.accessToken,
      id: user._id,
      handleLogout,
    })
  }

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.profile}>
        <div className={`container ${styles.profile__container}`}>
          <div className={styles.profile__inner}>
            <ProfileAvatar />
            <ProfileName />
            <ProfileEmail />
            <div className={styles.profile__actions}>
              <button
                className={`btn-reset ${styles.profile__logout}`}
                onClick={handleLogout}
              >
                {translations[lang].header.logout}
              </button>
              <button
                className={`btn-reset ${styles.profile__delete}`}
                onClick={handleDeleteUser}
              >
                {deleteUserSpinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].common.delete_account
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
