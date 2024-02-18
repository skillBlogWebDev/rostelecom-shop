import { IBaseEffectProps } from './common'

export interface ICartItem {
  _id: string
  clientId: string
  userId: string
  productId: string
  image: string
  name: string
  size: string
  count: string | number
  price: string
  totalPrice: string
  inStock: string
  color: string
  category: string
}

export interface IAddProductToCartFx {
  productId: string
  category: string
  size: string
  count: number
  jwt: string
  clientId: string
  setSpinner: (arg0: boolean) => void
}

export interface IAddProductsFromLSToCartFx {
  jwt: string
  cartItems: ICartItem[]
}

export interface IUpdateCartItemCountFx extends IBaseEffectProps {
  count: number
}

export interface IDeleteCartItemBtnProps {
  btnDisabled: boolean
  callback: VoidFunction
  className?: string
}

export type IDeleteCartItemsFx = IBaseEffectProps
