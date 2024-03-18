/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { basePropsForMotion } from '@/constants/motion'
import {
  $favorites,
  $favoritesFromLS,
  $shouldShowEmptyFavorites,
  getFavoriteItemsFx,
} from '@/context/favorites'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import styles from '@/styles/favorites/index.module.scss'
import FavoritesList from '@/components/modules/FavoritesPage/FavoritesList'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'

const FavoritesPage = () => {
  const currentFavoritesByAuth = useGoodsByAuth($favorites, $favoritesFromLS)
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('favorites')
  const shouldShowEmptyFavorites = useUnit($shouldShowEmptyFavorites)
  const { lang, translations } = useLang()
  const favoritesSpinner = useUnit(getFavoriteItemsFx.pending)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      {!shouldShowEmptyFavorites ? (
        <section className={styles.favorites}>
          <div className={`container ${styles.favorites__container}`}>
            <HeadingWithCount
              count={currentFavoritesByAuth.length}
              title={translations[lang].breadcrumbs.favorites}
              spinner={favoritesSpinner}
            />
            {(isUserAuth()
              ? favoritesSpinner || loginCheckSpinner
              : favoritesSpinner) && (
              <motion.ul
                {...basePropsForMotion}
                className={cartSkeletonStyles.skeleton}
              >
                {Array.from(new Array(3)).map((_, i) => (
                  <li key={i} className={cartSkeletonStyles.skeleton__item}>
                    <div
                      className={cartSkeletonStyles.skeleton__item__light}
                    />
                  </li>
                ))}
              </motion.ul>
            )}
            {!favoritesSpinner && (
              <motion.ul
                {...basePropsForMotion}
                className={`list-reset ${styles.favorites__list}`}
              >
                <FavoritesList />
              </motion.ul>
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.favorites_empty}
              description={translations[lang].common.favorites_empty_advice}
              btnText={translations[lang].common.go_catalog}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default FavoritesPage
