import { IBaseEffectProps } from './common'

export interface IFavoriteItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  size: string
  price: string
  vendorCode: string
  category: string
  inStock: string
  color: string
}

export interface IAddProductsFromLSToFavoriteFx {
  jwt: string
  favoriteItems: IFavoriteItem[]
}

export type IDeleteFavoriteItemsFx = IBaseEffectProps
