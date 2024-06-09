import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUnit } from 'effector-react'
import {
  getRostelecomOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import {
  $chosenPickupAddressData,
  $rostelecomDataByCity,
  $shouldLoadRostelecomData,
} from '@/context/order/state'
import { useLang } from '@/hooks/useLang'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressesListProps, IRostelecomAddressData } from '@/types/order'
import PickupAddressItem from './PickupAddressItem'
import styles from '@/styles/order/index.module.scss'

const AddressesList = ({
  listClassName,
  handleSelectAddressByMarkers,
}: IAddressesListProps) => {
  const { lang, translations } = useLang()
  const rostelecomDataByCity = useUnit($rostelecomDataByCity)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const shouldLoadRostelecomData = useUnit($shouldLoadRostelecomData)
  const { handleSelectAddress } = useTTMap()
  const loadRostelecomDataSpinner = useUnit(
    getRostelecomOfficesByCityFx.pending
  )

  const handleChosenAddressData = (data: Partial<IRostelecomAddressData>) => {
    setShouldLoadRostelecomData(false)
    setChosenPickupAddressData(data)
    setShouldShowCourierAddressData(false)
  }

  return (
    <>
      {shouldLoadRostelecomData && (
        <>
          {loadRostelecomDataSpinner && (
            <span
              className={styles.order__list__item__delivery__inner__spinner}
            >
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='2x' />
            </span>
          )}
          {!loadRostelecomDataSpinner && (
            <ul className={`list-reset ${listClassName}`}>
              {rostelecomDataByCity?.length ? (
                rostelecomDataByCity.map((item) => (
                  <PickupAddressItem
                    key={item.place_id}
                    addressItem={item}
                    handleChosenAddressData={handleChosenAddressData}
                    handleSelectAddress={
                      handleSelectAddressByMarkers || handleSelectAddress
                    }
                  />
                ))
              ) : (
                <span>{translations[lang].common.nothing_is_found}</span>
              )}
            </ul>
          )}
        </>
      )}
      {!!chosenPickupAddressData.address_line1 && !shouldLoadRostelecomData && (
        <div className={styles.order__list__item__delivery__pickup__choose}>
          <span>{chosenPickupAddressData.address_line1}</span>
          <span>
            {chosenPickupAddressData.address_line2},{' '}
            {chosenPickupAddressData.city}
          </span>
        </div>
      )}
    </>
  )
}

export default AddressesList
