import { withClickOutside } from '@/components/hocs/withClickOutside'
import { useLang } from '@/hooks/useLang'
import { useUserLogout } from '@/hooks/useLogout'
import { useUserAvatar } from '@/hooks/useUserAvatar'
import { IWrappedComponentProps } from '@/types/hocs'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { forwardRef } from 'react'

const HeaderProfile = forwardRef<HTMLDivElement, IWrappedComponentProps>(
  ({ open, setOpen }, ref) => {
    const handleTogglePopup = () => setOpen(!open)
    const handleLogout = useUserLogout()
    const { src, alt } = useUserAvatar()
    const { lang, translations } = useLang()

    return (
      <div className='header-profile__popup' ref={ref}>
        <button
          className='btn-reset header-profile__btn'
          onClick={handleTogglePopup}
        >
          <Image
            src={src ? src : '/img/profile.svg'}
            alt={alt ? alt : 'profile'}
            width={24}
            height={24}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className='list-reset header-profile__inner'
            >
              <li className='header-profile__arrow' />
              <li className='header-profile__item'>
                <button className='btn-reset header-profile__item__btn'>
                  {translations[lang].header.profile}
                </button>
              </li>
              <li className='header-profile__item'>
                <button
                  className='btn-reset header-profile__item__btn'
                  onClick={handleLogout}
                >
                  {translations[lang].header.logout}
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

HeaderProfile.displayName = 'HeaderProfile'

export default withClickOutside(HeaderProfile)
