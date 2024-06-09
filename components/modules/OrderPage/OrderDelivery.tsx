/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'
import { useUnit } from 'effector-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import '@tomtom-international/web-sdk-plugin-searchbox/dist/SearchBox.css'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import {
  $chosenCourierAddressData,
  $chosenPickupAddressData,
  $courierTab,
  $pickupTab,
  $shouldShowCourierAddressData,
} from '@/context/order/state'
import OrderTitle from './OrderTitle'
import TabControls from './TabControls'
import { setCourierTab, setMapInstance, setPickupTab } from '@/context/order'
import { basePropsForMotion } from '@/constants/motion'
import { getGeolocationFx, setUserGeolocation } from '@/context/user'
import { $userGeolocation } from '@/context/user/state'
import AddressesList from './AddressesList'
import { addOverflowHiddenToBody, addScriptToHead } from '@/lib/utils/common'
import {
  SearchMarkersManager,
  handleResultClearing,
  handleResultSelection,
  handleResultsFound,
  handleSelectPickupAddress,
  initSearchMarker,
} from '@/lib/utils/map'
import { useTTMap } from '@/hooks/useTTMap'
import { IAddressBBox } from '@/types/order'
import { mapOptions } from '@/constants/map'
import { openMapModal } from '@/context/modals'
import CourierAddressInfo from './CourierAddressInfo'
import styles from '@/styles/order/index.module.scss'

const OrderDelivery = () => {
  const { lang, translations } = useLang()
  const pickupTab = useUnit($pickupTab)
  const courierTab = useUnit($courierTab)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)
  const userGeolocation = useUnit($userGeolocation)
  const { handleSelectAddress } = useTTMap()
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const chosenCourierAddressData = useUnit($chosenCourierAddressData)
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>
  const labelRef = useRef() as MutableRefObject<HTMLLabelElement>
  const shouldShowCourierAddressData = useUnit($shouldShowCourierAddressData)

  const handlePickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)

    if (chosenPickupAddressData.address_line1) {
      handleLoadMap(
        chosenPickupAddressData.city,
        {
          lat: chosenPickupAddressData.lat as number,
          lng: chosenPickupAddressData.lon as number,
        },
        true
      )
      return
    }

    if (userGeolocation?.features) {
      handleLoadMap(userGeolocation?.features[0].properties.city)
      return
    }

    handleLoadMap()
  }

  const handleCourierTab = () => {
    if (courierTab) {
      return
    }

    setPickupTab(false)
    setCourierTab(true)
  }

  const handleOpenMapModal = () => {
    openMapModal()
    addOverflowHiddenToBody()
  }

  useEffect(() => {
    getUserGeolocation()
  }, [])

  useEffect(() => {
    if (shouldLoadMap) {
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.1.2-public-preview.15/services/services-web.min.js'
      )
      addScriptToHead(
        'https://api.tomtom.com/maps-sdk-for-web/cdn/plugins/SearchBox/3.1.3-public-preview.0/SearchBox-web.js'
      )
      handleLoadMap()
    }
  }, [shouldLoadMap])

  const getUserGeolocation = () => {
    const success = async (pos: GeolocationPosition) => {
      const { latitude, longitude } = pos.coords

      const result = await getGeolocationFx({ lat: latitude, lon: longitude })

      if (!result) {
        return
      }

      setUserGeolocation(result.data)
      setShouldLoadMap(true)
    }

    const error = async (error: GeolocationPositionError) => {
      setShouldLoadMap(true)
      toast.error(`${error.code} ${error.message}`)
    }

    navigator.geolocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    })
  }

  const handleLoadMap = async (
    initialSearchValue = '',
    initialPosition = {
      lat: 55.755819,
      lng: 37.617644,
    },
    withMarker = false
  ) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)

    const map = ttMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: mapRef.current,
      center: initialPosition,
      zoom: 10,
    })

    setMapInstance(map)
    withMarker &&
      handleSelectAddress(
        chosenPickupAddressData.bbox as IAddressBBox,
        {
          lat: chosenPickupAddressData.lat as number,
          lon: chosenPickupAddressData.lon as number,
        },
        map
      )

    initSearchMarker(ttMaps)

    //@ts-ignore
    const ttSearchBox = new tt.plugins.SearchBox(tt.services, mapOptions)

    const searchBoxHTML = ttSearchBox.getSearchBoxHTML()
    searchBoxHTML.classList.add('delivery-search-input')
    labelRef.current.append(searchBoxHTML)

    initialSearchValue && ttSearchBox.setValue(initialSearchValue)

    //@ts-ignore
    const searchMarkersManager = new SearchMarkersManager(map)
    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultsfound', (e) =>
      handleResultsFound(e, searchMarkersManager, map)
    )
    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultselected', (e) =>
      handleResultSelection(e, searchMarkersManager, map)
    )
    ttSearchBox.on('tomtom.searchbox.resultscleared', () =>
      handleResultClearing(searchMarkersManager, map, userGeolocation)
    )

    if (userGeolocation?.features && !withMarker) {
      ttSearchBox.setValue(userGeolocation?.features[0].properties.city)
      handleSelectPickupAddress(userGeolocation?.features[0].properties.city)

      map
        .setCenter([
          userGeolocation?.features[0].properties.lon,
          userGeolocation?.features[0].properties.lat,
        ])
        .zoomTo(10)
    }
  }

  return (
    <>
      <OrderTitle orderNumber='2' text={translations[lang].order.delivery} />
      <div className={styles.order__list__item__delivery}>
        <TabControls
          handleTab1={handlePickupTab}
          handleTab2={handleCourierTab}
          tab1Active={pickupTab}
          tab2Active={courierTab}
          tab1Text={translations[lang].order.pickup_free}
          tab2Text={translations[lang].order.courier_delivery}
        />
        {pickupTab && (
          <motion.div
            className={styles.order__list__item__delivery__pickup}
            {...basePropsForMotion}
          >
            <div className={styles.order__list__item__delivery__inner}>
              <label
                className={styles.order__list__item__delivery__label}
                ref={labelRef}
              >
                <span>{translations[lang].order.search_title}</span>
              </label>
              <AddressesList
                listClassName={styles.order__list__item__delivery__list}
              />
            </div>
            <div
              className={styles.order__list__item__delivery__map}
              ref={mapRef}
              onClick={handleOpenMapModal}
            />
          </motion.div>
        )}
        {courierTab && (
          <motion.div {...basePropsForMotion}>
            {!shouldShowCourierAddressData && (
              <div className={styles.order__list__item__delivery__courier}>
                <span>{translations[lang].order.where_deliver_order}</span>
                <span>{translations[lang].order.enter_address_on_map}</span>
                <button className='btn-reset' onClick={handleOpenMapModal}>
                  {translations[lang].order.map}
                </button>
              </div>
            )}
            {shouldShowCourierAddressData &&
              !!chosenCourierAddressData.address_line1 && (
            // eslint-disable-next-line indent
                <CourierAddressInfo />
            )}
          </motion.div>
        )}
      </div>
    </>
  )
}

export default OrderDelivery
