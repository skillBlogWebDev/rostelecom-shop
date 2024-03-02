'use client'
import Link from 'next/link'
import {
  closeCatalogMenu,
  closeMenu,
  openCatalogMenu,
  openMenu,
} from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { addOverflowHiddenToBody } from '@/lib/utils/common'
import CatalogMenu from '../Header/CatalogMenu'
import { $cart, $cartFromLs } from '@/context/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $favorites, $favoritesFromLS } from '@/context/favorites'

const MobileNavbar = () => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)

  const handleOpenMenu = () => {
    addOverflowHiddenToBody()
    openMenu()
    closeCatalogMenu()
  }

  const handleOpenCatalogMenu = () => {
    addOverflowHiddenToBody('0')
    openCatalogMenu()
    closeMenu()
  }

  return (
    <>
      <CatalogMenu />
      <div className='mobile-navbar'>
        <Link href='/' className='mobile-navbar__btn'>
          {translations[lang].breadcrumbs.main}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenCatalogMenu}
        >
          {translations[lang].breadcrumbs.catalog}
        </button>
        <Link className='btn-reset mobile-navbar__btn' href='/favorites'>
          {!!currentFavoritesByAuth.length && (
            <span className='not-empty not-empty-mobile-favorite' />
          )}
          {translations[lang].breadcrumbs.favorites}
        </Link>
        <Link className='btn-reset mobile-navbar__btn' href='/cart'>
          {!!currentCartByAuth.length && (
            <span className='not-empty not-empty-mobile' />
          )}
          {translations[lang].breadcrumbs.cart}
        </Link>
        <button
          className='btn-reset mobile-navbar__btn'
          onClick={handleOpenMenu}
        >
          {translations[lang].common.more}
        </button>
      </div>
    </>
  )
}

export default MobileNavbar
