import { motion } from 'framer-motion'
import { useUnit } from 'effector-react'
import { setOnlinePaymentTb, setCashPaymentTb } from '@/context/order'
import { $onlinePaymentTab, $cashPaymentTab } from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import TabControls from './TabControls'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/styles/order/index.module.scss'

const OrderPayment = () => {
  const { lang, translations } = useLang()
  const onlinePaymentTab = useUnit($onlinePaymentTab)
  const cashPaymentTab = useUnit($cashPaymentTab)

  const handleTab1 = () => {
    setOnlinePaymentTb(true)
    setCashPaymentTb(false)
  }

  const handleTab2 = () => {
    setOnlinePaymentTb(false)
    setCashPaymentTb(true)
  }

  return (
    <div className={styles.order__list__item__payment}>
      <TabControls
        handleTab1={handleTab1}
        handleTab2={handleTab2}
        tab1Active={onlinePaymentTab}
        tab2Active={cashPaymentTab}
        tab1Text={translations[lang].order.online_payment}
        tab2Text={translations[lang].order.upon_receipt}
      />
      <div className={styles.order__list__item__payment__inner}>
        {onlinePaymentTab && (
          <motion.div
            {...basePropsForMotion}
            className={styles.order__list__item__payment__content}
          >
            <p
              className={styles.order__list__item__payment__content__advice}
              dangerouslySetInnerHTML={{
                __html: translations[lang].order.payment_advice,
              }}
            />
            <form>
              <p className={styles.order__list__item__payment__content__radio}>
                <input
                  type='radio'
                  id='payment-1'
                  name='radio-group'
                  defaultChecked
                />
                <label
                  htmlFor='payment-1'
                  className={styles.order__list__item__payment__content__label}
                >
                  <span
                    className={
                      styles.order__list__item__payment__content__label__info
                    }
                  >
                    {translations[lang].order.card_number}
                  </span>
                  <span>5555 5555 5555 5555</span>
                </label>
              </p>
              <p className={styles.order__list__item__payment__content__radio}>
                <input type='radio' id='payment-2' name='radio-group' />
                <label
                  htmlFor='payment-2'
                  className={styles.order__list__item__payment__content__label}
                >
                  {translations[lang].order.qr_code}
                </label>
              </p>
              <p className={styles.order__list__item__payment__content__radio}>
                <input type='radio' id='payment-3' name='radio-group' />
                <label
                  htmlFor='payment-3'
                  className={styles.order__list__item__payment__content__label}
                >
                  SberPay
                </label>
              </p>
            </form>
          </motion.div>
        )}
        {cashPaymentTab && (
          <motion.div
            {...basePropsForMotion}
            className={styles.order__list__item__payment__content}
          >
            <form>
              <p className={styles.order__list__item__payment__content__radio}>
                <input
                  type='radio'
                  id='payment-1'
                  name='radio-group'
                  defaultChecked
                />
                <label
                  htmlFor='payment-1'
                  className={`${styles.order__list__item__payment__content__label} ${styles.no_bg}`}
                >
                  {translations[lang].order.cash_office}
                </label>
              </p>
              <p className={styles.order__list__item__payment__content__radio}>
                <input type='radio' id='payment-2' name='radio-group' />
                <label
                  htmlFor='payment-2'
                  className={`${styles.order__list__item__payment__content__label} ${styles.no_bg}`}
                >
                  {translations[lang].order.card_office}
                </label>
              </p>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrderPayment
