'use client'
import { useUnit } from 'effector-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock'
import MapModal from '@/components/modules/OrderPage/MapModal'
import OrderCartItem from '@/components/modules/OrderPage/OrderCartItem'
import OrderDelivery from '@/components/modules/OrderPage/OrderDelivery'
import OrderDetailsForm from '@/components/modules/OrderPage/OrderDetailsForm'
import OrderPayment from '@/components/modules/OrderPage/OrderPayment'
import OrderTitle from '@/components/modules/OrderPage/OrderTitle'
import { basePropsForMotion } from '@/constants/motion'
import { $cart, $cartFromLs } from '@/context/cart/state'
import { $mapModal } from '@/context/modals/state'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { useLang } from '@/hooks/useLang'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { isUserAuth } from '@/lib/utils/common'
import { checkPaymentFx } from '@/context/order'
import { handleDeleteAllFromCart } from '@/lib/utils/cart'
import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('order')
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const isMedia1220 = useMediaQuery(1220)
  const mapModal = useUnit($mapModal)

  useEffect(() => {
    clearCartByPayment()
  }, [])

  const clearCartByPayment = async () => {
    const paymentId = JSON.parse(localStorage.getItem('paymentId') as string)

    if (!isUserAuth() || !paymentId) {
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    const data = await checkPaymentFx({ paymentId })

    if (data) {
      if (data.result.status === 'succeeded') {
        handleDeleteAllFromCart(auth.accessToken)
      }
    }

    localStorage.removeItem('paymentId')
  }

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.order}>
        <div className='container'>
          <h1 className={styles.order__title}>
            {translations[lang].breadcrumbs.order}
          </h1>
          <div className={styles.order__inner}>
            <div className={styles.order__inner__left}>
              <ul className={`list-reset ${styles.order__list}`}>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='1'
                    text={translations[lang].order.order}
                  />
                  {isMedia1220 ? (
                    <ul
                      className={`list-reset ${styles.order__list__item__list}`}
                    >
                      {currentCartByAuth.map((item, i) => (
                        <OrderCartItem
                          key={item._id || item.clientId}
                          item={item}
                          position={i + 1}
                        />
                      ))}
                    </ul>
                  ) : (
                    <table className={styles.order__list__item__table}>
                      <thead>
                        <tr>
                          <th>{translations[lang].order.name}</th>
                          <th>{translations[lang].order.size}</th>
                          <th>{translations[lang].order.color}</th>
                          <th>{translations[lang].order.count}</th>
                          <th>{translations[lang].order.sum}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCartByAuth.map((item, i) => (
                          <OrderCartItem
                            key={item._id || item.clientId}
                            item={item}
                            position={i + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </li>
                <li className={`${styles.order__list__item} order-block`}>
                  <OrderDelivery />
                </li>
                <li className={styles.order__list__item}>
                  <OrderTitle
                    orderNumber='3'
                    text={translations[lang].order.payment}
                  />
                  <OrderPayment />
                </li>
                <li className={`${styles.order__list__item} details-block`}>
                  <OrderTitle
                    orderNumber='4'
                    text={translations[lang].order.recipient_details}
                  />
                  <div className={styles.order__list__item__details}>
                    <p className={styles.order__list__item__details__title}>
                      {translations[lang].order.enter_details}
                    </p>
                    <OrderDetailsForm />
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right__order}>
                <OrderInfoBlock isOrderPage />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {mapModal && (
          <motion.div className={styles.map_modal} {...basePropsForMotion}>
            <MapModal />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default OrderPage
