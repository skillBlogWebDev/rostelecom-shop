import Link from 'next/link'
import { useUnit } from 'effector-react'
import { MutableRefObject, useRef, useState } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLang } from '@/hooks/useLang'
import { useTotalPrice } from '@/hooks/useTotalPrice'
import { countWholeCartItemsAmount } from '@/lib/utils/cart'
import {
  formatPrice,
  handleOpenAuthPopup,
  isUserAuth,
  showCountMessage,
} from '@/lib/utils/common'
import { IOrderInfoBlockProps } from '@/types/modules'
import { useGoodsByAuth } from '@/hooks/useGoodsByAuth'
import { $cart, $cartFromLs } from '@/context/cart/state'
import {
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $onlinePaymentTab,
  $orderDetailsValues,
  $pickupTab,
} from '@/context/order/state'
import { makePayment, makePaymentFx } from '@/context/order'
import styles from '@/styles/order-block/index.module.scss'
import toast from 'react-hot-toast'

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage,
}: IOrderInfoBlockProps) => {
  const { lang, translations } = useLang()
  const currentCartByAuth = useGoodsByAuth($cart, $cartFromLs)
  const [isUserAgree, setIsUserAgree] = useState(false)
  const { animatedPrice } = useTotalPrice()
  const onlinePaymentTab = useUnit($onlinePaymentTab)
  const pickupTab = useUnit($pickupTab)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const paymentSpinner = useUnit(makePaymentFx.pending)
  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)
  const orderDetailsValues = useUnit($orderDetailsValues)

  const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

  const scrollToBlock = (selector: HTMLLIElement) =>
    window.scrollTo({
      top: selector.getBoundingClientRect().top + window.scrollY + -50,
      behavior: 'smooth',
    })

  const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key == ' ' || e.code == 'Space') {
      e.preventDefault()
      setIsUserAgree(!checkboxRef.current.checked)
      checkboxRef.current.checked = !checkboxRef.current.checked
    }
  }

  const handleMakePayment = async () => {
    if (
      !chosenCourierAddressData.address_line1 &&
      !chosenPickupAddressData.address_line1
    ) {
      const orderBlock = document.querySelector('.order-block') as HTMLLIElement
      scrollToBlock(orderBlock)
      toast.error('Нужно выбрать адрес!')
      return
    }

    if (!orderDetailsValues.isValid) {
      const detailsBlock = document.querySelector(
        '.details-block'
      ) as HTMLLIElement
      scrollToBlock(detailsBlock)
      return
    }

    if (!isUserAuth()) {
      handleOpenAuthPopup()
      return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)
    let description = ''

    if (chosenCourierAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес достаки товара курьером: ${chosenCourierAddressData.address_line1}, ${chosenCourierAddressData.address_line2}`
    }

    if (chosenPickupAddressData.address_line1) {
      // eslint-disable-next-line max-len
      description = `Адрес получения товара: ${chosenPickupAddressData.address_line1}, ${chosenPickupAddressData.address_line2}`
    }

    console.log(orderDetailsValues)

    makePayment({
      jwt: auth.accessToken,
      description,
      amount: `${priceWithDiscount.replace(' ', '')}`,
      metadata: orderDetailsValues,
    })
  }

  return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countWholeCartItemsAmount(currentCartByAuth)}`,
            lang
          )}{' '}
          {translations[lang].order.worth}{' '}
          <span className={styles.order_block__info__text}>
            {formatPrice(animatedPrice)} ₽
          </span>
        </p>
        <p className={styles.order_block__info}>
          {translations[lang].order.amount_with_discounts}:{' '}
          <span className={styles.order_block__info__text}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage && (
          <>
            <p className={styles.order_block__info}>
              {translations[lang].order.delivery}:{' '}
              <span className={styles.order_block__info__text}>
                {pickupTab
                  ? translations[lang].order.pickup_free
                  : translations[lang].order.courier_delivery}
              </span>
            </p>
            <p className={styles.order_block__info}>
              {translations[lang].order.payment}:{' '}
              <span className={styles.order_block__info__text}>
                {onlinePaymentTab
                  ? translations[lang].order.online_payment
                  : translations[lang].order.upon_receipt}
              </span>
            </p>
          </>
        )}
        <p className={styles.order_block__total}>
          <span>{translations[lang].order.total}:</span>
          <span className={styles.order_block__total__price}>
            {priceWithDiscount} ₽
          </span>
        </p>
        {isOrderPage ? (
          <button
            className={`btn-reset ${styles.order_block__btn}`}
            disabled={
              !isUserAgree || !currentCartByAuth.length || paymentSpinner
            }
            onClick={handleMakePayment}
          >
            {paymentSpinner ? (
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
            ) : (
              translations[lang].order.make_order
            )}
          </button>
        ) : (
          <Link
            href='/order'
            className={`${styles.order_block__btn} ${
              !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
            }`}
          >
            {translations[lang].order.make_order}
          </Link>
        )}
        <label className={styles.order_block__agreement}>
          <input
            className={styles.order_block__agreement__input}
            type='checkbox'
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            className={styles.order_block__agreement__checkbox}
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span className={styles.order_block__agreement__text}>
            {translations[lang].order.agreement_text}{' '}
            <Link
              href='/privacy'
              className={styles.order_block__agreement__link}
            >
              {translations[lang].order.agreement_link}
            </Link>
          </span>
        </label>
      </div>
    </div>
  )
}

export default OrderInfoBlock
