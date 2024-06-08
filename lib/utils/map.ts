/* eslint-disable indent */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  getRostelecomOfficesByCityFx,
  setChosenPickupAddressData,
  setShouldLoadRostelecomData,
} from '@/context/order'

export const handleSelectPickupAddress = async (text: string) => {
  let langFromLS = JSON.parse(localStorage.getItem('lang') as string)

  if (!langFromLS) {
    langFromLS = 'ru'
  }

  setShouldLoadRostelecomData(true)

  const rostelecomData = await getRostelecomOfficesByCityFx({
    city: text.split(' ')[0].replace(',', ''),
    lang: langFromLS,
  })

  return rostelecomData
}

//@ts-ignore
export const handleResultsFound = (event, searchMarkersManager, map) => {
  const results = event.data.results.fuzzySearch.results

  if (results.length === 0) {
    searchMarkersManager.clear()
  }

  searchMarkersManager.draw(results)
  fitToViewport(results, map)
}

//@ts-ignore
export const fitToViewport = async (markerData, map) => {
  const ttMaps = await import(`@tomtom-international/web-sdk-maps`)

  if (!markerData || (markerData instanceof Array && !markerData.length)) {
    return
  }

  const bounds = new ttMaps.LngLatBounds()

  if (markerData instanceof Array) {
    markerData.forEach(function (marker) {
      //@ts-ignore
      bounds.extend(getBounds(marker))
    })
  } else {
    //@ts-ignore
    bounds.extend(getBounds(markerData))
  }

  map.fitBounds(bounds, { padding: 100, linear: true })
}

//@ts-ignore
export const getBounds = (data) => {
  let btmRight
  let topLeft

  if (data.viewport) {
    btmRight = [
      data.viewport.btmRightPoint.lng,
      data.viewport.btmRightPoint.lat,
    ]
    topLeft = [data.viewport.topLeftPoint.lng, data.viewport.topLeftPoint.lat]
  }

  return [btmRight, topLeft]
}

//@ts-ignore
export const handleResultClearing = (
  //@ts-ignore
  searchMarkersManager,
  //@ts-ignore
  map,
  //@ts-ignore
  userGeolocation
) => {
  searchMarkersManager.clear()

  if (userGeolocation?.features) {
    handleSelectPickupAddress(userGeolocation?.features[0].properties.city)

    map
      .setCenter([
        userGeolocation?.features[0].properties.lon,
        userGeolocation?.features[0].properties.lat,
      ])
      .zoomTo(10)
  } else {
    map.setCenter([37.617644, 55.755819]).zoomTo(10)
  }

  document.querySelector('.map-marker')?.remove()
  setChosenPickupAddressData({})
}

//@ts-ignore
export const handleResultSelection = (event, searchMarkersManager, map) => {
  handleSelectPickupAddress(event.data.text)
  const result = event.data.result

  if (result.type === 'category' || result.type === 'brand') {
    return
  }

  searchMarkersManager.draw([result])
  fitToViewport(result, map)
}

//@ts-ignore
export function SearchMarkersManager(map, options) {
  //@ts-ignore
  this.map = map
  //@ts-ignore
  this._options = options || {}
  //@ts-ignore
  this._poiList = undefined
  //@ts-ignore
  this.markers = {}
}

//@ts-ignore
export function initSearchMarker(ttMaps) {
  //@ts-ignore
  function SearchMarker(poiData, options) {
    //@ts-ignore
    this.poiData = poiData
    //@ts-ignore
    this.options = options || {}
    //@ts-ignore
    this.marker = new ttMaps.Marker({
      //@ts-ignore
      element: this.createMarker(),
      anchor: 'bottom',
    })
    //@ts-ignore
    const lon = this.poiData.position.lng || this.poiData.position.lon
    //@ts-ignore
    this.marker.setLngLat([lon, this.poiData.position.lat])
  }

  //@ts-ignore
  SearchMarker.prototype.addTo = function (map) {
    this.marker.addTo(map)
    this._map = map
    return this
  }

  SearchMarker.prototype.createMarker = function () {
    const elem = document.createElement('div')
    // elem.className = 'tt-icon-marker-black tt-search-marker'
    if (this.options.markerClassName) {
      elem.className += ' ' + this.options.markerClassName
    }
    const innerElem = document.createElement('div')
    innerElem.setAttribute(
      'style',
      'background: white; width: 10px; height: 10px; border-radius: 50%; border: 3px solid black;'
    )

    elem.appendChild(innerElem)
    return elem
  }

  SearchMarker.prototype.remove = function () {
    this.marker.remove()
    this._map = null
  }

  //@ts-ignore
  SearchMarkersManager.prototype.draw = function (poiList) {
    this._poiList = poiList
    this.clear()
    //@ts-ignore
    this._poiList.forEach(function (poi) {
      const markerId = poi.id
      const poiOpts = {
        name: poi.poi ? poi.poi.name : undefined,
        address: poi.address ? poi.address.freeformAddress : '',
        distance: poi.dist,
        classification: poi.poi ? poi.poi.classifications[0].code : undefined,
        position: poi.position,
        entryPoints: poi.entryPoints,
      }
      //@ts-ignore
      const marker = new SearchMarker(poiOpts, this._options)
      //@ts-ignore
      marker.addTo(this.map)
      //@ts-ignore
      this.markers[markerId] = marker
    }, this)
  }

  SearchMarkersManager.prototype.clear = function () {
    for (const markerId in this.markers) {
      const marker = this.markers[markerId]
      marker.remove()
    }
    this.markers = {}
    this._lastClickedMarker = null
  }
}
