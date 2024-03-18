/* eslint-disable react/jsx-indent */
'use client'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { getCartItemsFx } from '@/api/cart'
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import CartList from '@/components/modules/CartPage/CartList'
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import { basePropsForMotion } from '@/constants/motion'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import { $cart, $cartFromLs, $shouldShowEmpty } from '@/context/cart'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import styles from '@/styles/cart-page/index.module.scss'
import { isUserAuth } from '@/lib/utils/common'
import { loginCheckFx } from '@/context/user'

const CartPage = () => {
  const cartSpinner = useUnit(getCartItemsFx.pending)
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('cart')
  const isMedia930 = useMediaQuery(930)
  const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] =
    useState(false)
  const shouldShowEmpty = useUnit($shouldShowEmpty)
  const loginCheckSpinner = useUnit(loginCheckFx.pending)

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      {!shouldShowEmpty ? (
        <section className={styles.cart}>
          <div className='container'>
            <HeadingWithCount
              count={countWholeCartItemsAmount(currentCartByAuth)}
              title={translations[lang].breadcrumbs.cart}
              spinner={cartSpinner}
            />
            <div className={styles.cart__inner}>
              <div className={styles.cart__left}>
                {(isUserAuth()
                  ? cartSpinner || loginCheckSpinner
                  : cartSpinner) && (
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
                {!cartSpinner && (
                  <motion.ul
                    {...basePropsForMotion}
                    className={`list-reset ${styles.cart__list}`}
                  >
                    <CartList />
                  </motion.ul>
                )}
              </div>
              <div className={styles.cart__right}>
                {isMedia930 && (
                  <PromotionalCode
                    setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                  />
                )}
                <div className={styles.cart__right__order}>
                  <OrderInfoBlock
                    isCorrectPromotionalCode={isCorrectPromotionalCode}
                  />
                </div>
              </div>
            </div>
            {!isMedia930 && (
              <PromotionalCode
                setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
              />
            )}
          </div>
        </section>
      ) : (
        <section>
          <div className='container'>
            <EmptyPageContent
              subtitle={translations[lang].common.cart_empty}
              description={translations[lang].common.cart_empty_advice}
              btnText={translations[lang].common.go_shopping}
              bgClassName={styles.empty_bg}
            />
          </div>
        </section>
      )}
    </main>
  )
}

export default CartPage
