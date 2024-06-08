import { useUnit } from 'effector-react'
import { $mapInstance } from '@/context/order/state'
import { IAddressBBox, IAddressPosition } from '@/types/order'

export const useTTMap = () => {
  const mapInstance = useUnit($mapInstance)

  const handleSelectAddress = async (
    { lon1, lat1, lon2, lat2 }: IAddressBBox,
    position: IAddressPosition,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialMapInstance?: any
  ) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)
    const currentMap = initialMapInstance || mapInstance

    const sw = new ttMaps.LngLat(lon1, lat1)
    const ne = new ttMaps.LngLat(lon2, lat2)
    const bounds = new ttMaps.LngLatBounds(sw, ne)

    currentMap.fitBounds(bounds, { padding: 130, linear: true })

    const element = document.createElement('div')
    element.classList.add('map-marker')

    new ttMaps.Marker({ element })
      .setLngLat([position.lon, position.lat])
      .addTo(currentMap)
  }

  return { handleSelectAddress }
}
