import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import { closeMapModal } from '@/context/modals'
import {
  setChosenCourierAddressData,
  setChosenPickupAddressData,
  setCourierTab,
  setPickupTab,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import { $courierAddressData } from '@/context/order/state'
import { getGeolocationFx } from '@/context/user'
import { useLang } from '@/hooks/useLang'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import styles from '@/styles/order/index.module.scss'

const CourierAddressesItem = () => {
  const { lang, translations } = useLang()
  const spinner = useUnit(getGeolocationFx.pending)
  const courierAddressData = useUnit($courierAddressData)

  const handleSelectCourierAddress = () => {
    setChosenPickupAddressData({})
    setShouldLoadRostelecomData(false)
    setShouldShowCourierAddressData(true)
    setPickupTab(false)
    setCourierTab(true)
    closeMapModal()
    removeOverflowHiddenFromBody()
    setChosenCourierAddressData(courierAddressData)
  }

  return (
    <>
      {spinner && (
        <span className={styles.order__list__item__delivery__inner__spinner}>
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
        </span>
      )}
      {!spinner && (
        <div className={styles.map_modal__control__content__courier_address}>
          <h3
            className={
              styles.map_modal__control__content__courier_address__title
            }
          >
            {courierAddressData.address_line1}
          </h3>
          <p
            className={
              styles.map_modal__control__content__courier_address__subtitle
            }
          >
            {courierAddressData.address_line2}
          </p>
          <p
            className={
              styles.map_modal__control__content__courier_address__coordinates
            }
          >
            <span>
              {translations[lang].order.longitude}{' '}
              <strong
                className={
                  styles.map_modal__control__content__courier_address__coordinates__value
                }
              >
                {courierAddressData.lon}
              </strong>
            </span>
            <span>
              {translations[lang].order.latitude}{' '}
              <strong
                className={
                  styles.map_modal__control__content__courier_address__coordinates__value
                }
              >
                {courierAddressData.lat}
              </strong>
            </span>
          </p>
          <p
            className={
              styles.map_modal__control__content__courier_address__warning
            }
          >
            {translations[lang].order.courier_warning}
          </p>
          <button
            className={`btn-reset ${styles.map_modal__control__content__courier_address__choose}`}
            onClick={handleSelectCourierAddress}
          >
            {translations[lang].order.choose}
          </button>
        </div>
      )}
    </>
  )
}

export default CourierAddressesItem
