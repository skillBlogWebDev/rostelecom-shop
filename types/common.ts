import { StoreWritable } from 'effector'

export interface IProduct {
  _id: string
  type: string
  category: string
  collection: string
  price: number
  name: string
  description: string
  characteristics: { [index: string]: string }
  images: string[]
  vendorCode: string
  inStock: string
  isBestseller: boolean
  isNew: boolean
  sizes: ISizes
  popularity: number
  errorMessage?: string
}

export interface ISizes {
  s: boolean
  l: boolean
  m: boolean
  xl: boolean
  xxl: boolean
}

export interface ISelectedSizes {
  sizes: ISizes
  type: string
  className?: string
}

export interface IBaseEffectProps {
  jwt: string
  id: string
  setSpinner: (arg0: boolean) => void
}

export type UseGoodsByAuth<T> = StoreWritable<T>

export interface IGetGeolocationFx {
  lat: number
  lon: number
}
