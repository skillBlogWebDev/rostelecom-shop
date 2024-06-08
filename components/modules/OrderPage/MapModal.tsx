/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { closeMapModal } from '@/context/modals'
import { useLang } from '@/hooks/useLang'
import { removeOverflowHiddenFromBody } from '@/lib/utils/common'
import { useRef, MutableRefObject, useState, useEffect } from 'react'
import styles from '@/styles/order/index.module.scss'
import { mapOptions } from '@/constants/map'
import {
  SearchMarkersManager,
  handleResultClearing,
  handleResultSelection,
  handleResultsFound,
  handleSelectPickupAddress,
} from '@/lib/utils/map'
import { basePropsForMotion } from '@/constants/motion'
import { motion } from 'framer-motion'
import AddressesList from './AddressesList'
import { useTTMap } from '@/hooks/useTTMap'
import {
  setChosenCourierAddressData,
  setCourierAddressData,
  setShouldLoadRostelecomData,
  setShouldShowCourierAddressData,
} from '@/context/order'
import { useUnit } from 'effector-react'
import {
  $chosenPickupAddressData,
  $courierAddressData,
  $mapInstance,
  $rostelecomDataByCity,
  $shouldShowCourierAddressData,
} from '@/context/order/state'
import { $userGeolocation } from '@/context/user/state'
import { IRostelecomAddressData } from '@/types/order'
import CourierAddressesItem from './CourierAddressesItem'
import { getGeolocationFx } from '@/context/user'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const MapModal = () => {
  const pickUpMapRef = useRef() as MutableRefObject<HTMLDivElement>
  const courierMapRef = useRef() as MutableRefObject<HTMLDivElement>
  const [ttMapInstance, setTtMapInstance] = useState<any>()
  const [pickupTab, setPickupTab] = useState(true)
  const [courierTab, setCourierTab] = useState(false)
  const { lang, translations } = useLang()
  const shouldLoadMap = useRef(true)
  const { handleSelectAddress } = useTTMap()
  const userGeolocation = useUnit($userGeolocation)
  const rostelecomDataByCity = useUnit($rostelecomDataByCity)
  const mapInstance = useUnit($mapInstance)
  const shouldShowCourierAddressData = useUnit($shouldShowCourierAddressData)
  const chosenPickupAddressData = useUnit($chosenPickupAddressData)
  const courierAddressData = useUnit($courierAddressData)
  const isMedia940 = useMediaQuery(940)

  const removeMapMarkers = () => {
    const markers = document.querySelectorAll('.modal-map-marker')
    markers.forEach((marker) => marker.remove())
  }

  const drawMarker = async (lon: number, lat: number, map: any) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)

    const element = document.createElement('div')
    element.classList.add('modal-map-marker')

    new ttMaps.Marker({ element }).setLngLat([lon, lat]).addTo(map)
  }

  const handleCloseModal = () => {
    closeMapModal()
    removeOverflowHiddenFromBody()
  }

  const handleSelectPickupTab = () => {
    if (pickupTab) {
      return
    }

    setPickupTab(true)
    setCourierTab(false)
    handleLoadMap()
  }

  const handleSelectCourierTab = async () => {
    if (courierTab) {
      return
    }

    setPickupTab(false)
    setCourierTab(true)

    const map = await handleLoadMap(courierMapRef)
    setTimeout(removeMapMarkers, 0)

    if (chosenPickupAddressData.address_line1) {
      setShouldShowCourierAddressData(false)
      return
    }

    if (courierAddressData.lat) {
      setTimeout(
        () => drawMarker(courierAddressData.lon, courierAddressData.lat, map),
        0
      )
    }
  }

  //@ts-ignore
  const drawMarkerByClick = async (e) => {
    const result = await getGeolocationFx({
      lat: e.lngLat.lat,
      lon: e.lngLat.lng,
    })

    if (result) {
      removeMapMarkers()
      drawMarker(e.lngLat.lng, e.lngLat.lat, ttMapInstance)
      setCourierAddressData(result.data.features[0].properties)
      setShouldShowCourierAddressData(true)
    }
  }

  useEffect(() => {
    if (ttMapInstance?.once) {
      if (pickupTab) {
        ttMapInstance.off('click', drawMarkerByClick)
        return
      }

      ttMapInstance.on('click', drawMarkerByClick)
    }
  }, [courierTab, pickupTab, ttMapInstance])

  useEffect(() => {
    if (shouldLoadMap.current) {
      shouldLoadMap.current = false
      handleLoadMap()
    }
  }, [])

  const handleLoadMap = async (initialContainer = pickUpMapRef) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)

    const map = ttMaps.map({
      key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY as string,
      container: initialContainer.current,
      center: {
        lat: 55.755819,
        lng: 37.617644,
      },
      zoom: 10,
    })

    setTtMapInstance(map)

    //@ts-ignore
    const ttSearchBox = new tt.plugins.SearchBox(tt.services, mapOptions)

    const searchBoxHTML = ttSearchBox.getSearchBoxHTML()
    searchBoxHTML.classList.add('modal-search-input')
    initialContainer.current.append(searchBoxHTML)

    //@ts-ignore
    const searchMarkersManager = new SearchMarkersManager(map)

    const nav = new ttMaps.NavigationControl({})
    map.addControl(nav, 'bottom-right')
    map.addControl(
      new ttMaps.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      }),
      'bottom-left'
    )

    const setMarkersByLocationsData = (data: IRostelecomAddressData[]) => {
      data.forEach((item) => {
        const sw = new ttMaps.LngLat(item.bbox.lon1, item.bbox.lat1)
        const ne = new ttMaps.LngLat(item.bbox.lon2, item.bbox.lat2)
        const bounds = new ttMaps.LngLatBounds(sw, ne)

        map.fitBounds(bounds, { padding: 130, linear: true })

        const element = document.createElement('div')
        element.classList.add('modal-map-marker')

        new ttMaps.Marker({ element })
          .setLngLat([item.lon, item.lat])
          .addTo(map.zoomTo(12))
      })
    }

    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultselected', async (e) => {
      const data = await handleSelectPickupAddress(e.data.text)

      handleResultSelection(e, searchMarkersManager, map)
      setMarkersByLocationsData(data)
    })

    ttSearchBox.on('tomtom.searchbox.resultscleared', () => {
      handleResultClearing(searchMarkersManager, map, userGeolocation)
      handleResultClearing(searchMarkersManager, mapInstance, userGeolocation)
    })

    //@ts-ignore
    ttSearchBox.on('tomtom.searchbox.resultsfound', (e) =>
      handleResultsFound(e, searchMarkersManager, map)
    )

    if (!!chosenPickupAddressData.address_line1) {
      const chosenItem = rostelecomDataByCity.filter(
        (item) => item.address_line2 === chosenPickupAddressData.address_line2
      )[0]

      setShouldLoadRostelecomData(false)
      setMarkersByLocationsData([chosenItem])

      map.setCenter([chosenItem.lon, chosenItem.lat]).zoomTo(12)
      ttSearchBox.setValue(chosenItem.city)

      return
    }

    if (!userGeolocation.features) {
      const data = await handleSelectPickupAddress('москва')

      setMarkersByLocationsData(data)
      ttSearchBox.setValue('москва')
    } else {
      map
        .setCenter([
          userGeolocation?.features[0].properties.lon,
          userGeolocation?.features[0].properties.lat,
        ])
        .zoomTo(12)
      ttSearchBox.setValue(userGeolocation?.features[0].properties.city)
    }

    if (rostelecomDataByCity.length) {
      setMarkersByLocationsData(rostelecomDataByCity)
    }

    return map
  }

  const handleSelectAddressByMarkers = (
    {
      lon1,
      lat1,
      lon2,
      lat2,
    }: {
      lon1: number
      lat1: number
      lon2: number
      lat2: number
    },
    position: {
      lat: number
      lon: number
    }
  ) => {
    removeMapMarkers()
    handleSelectAddress(
      {
        lon1,
        lat1,
        lon2,
        lat2,
      },
      position,
      mapInstance
    )
    setShouldShowCourierAddressData(false)
    setChosenCourierAddressData({})
    handleCloseModal()
    setPickupTab(true)
    setCourierTab(false)
  }

  return (
    <div className={styles.map_modal__inner}>
      <button
        className={`btn-reset ${styles.map_modal__close}`}
        onClick={handleCloseModal}
      >
        {isMedia940 ? '' : translations[lang].common.close}
      </button>
      <div className={styles.map_modal__control}>
        <h3 className={styles.map_modal__title}>
          {translations[lang].order.delivery_way}
        </h3>
        <div className={styles.map_modal__control__tabs}>
          <button
            className={`btn-reset ${pickupTab ? styles.active : ''}`}
            onClick={handleSelectPickupTab}
          >
            {translations[lang].order.pickup_point}
          </button>
          <button
            className={`btn-reset ${courierTab ? styles.active : ''}`}
            onClick={handleSelectCourierTab}
          >
            {translations[lang].order.by_courier}
          </button>
        </div>
        {pickupTab && (
          <motion.div
            {...basePropsForMotion}
            className={styles.map_modal__control__content}
          >
            <AddressesList
              listClassName={styles.map_modal__control__content__list}
              handleSelectAddressByMarkers={handleSelectAddressByMarkers}
            />
          </motion.div>
        )}
        {courierTab && (
          <motion.div
            {...basePropsForMotion}
            className={styles.map_modal__control__content}
          >
            {!shouldShowCourierAddressData && (
              <p className={styles.map_modal__control__content__default}>
                <b>{translations[lang].order.where_deliver_order}</b>
                <span>
                  {translations[lang].order.enter_address_on_map_or_search}
                </span>
              </p>
            )}
            {shouldShowCourierAddressData && <CourierAddressesItem />}
          </motion.div>
        )}
      </div>
      {pickupTab && (
        <div className={styles.map_modal__map} ref={pickUpMapRef} />
      )}
      {courierTab && (
        <div className={styles.map_modal__map} ref={courierMapRef} />
      )}
    </div>
  )
}

export default MapModal
