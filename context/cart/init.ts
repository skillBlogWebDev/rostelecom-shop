import { sample } from 'effector'
import {
  loadCartItems,
  getCartItemsFx,
  addProductToCart,
  addProductToCartFx,
  addProductsFromLSToCart,
  addProductsFromLSToCartFx,
  updateCartItemCount,
  updateCartItemCountFx,
  deleteProductFromCart,
  deleteCartItemFx,
  deleteAllFromCart,
  deleteAllFromCartFx,
} from '.'
import { $cart } from './state'

sample({
  clock: loadCartItems,
  source: $cart,
  fn: (_, data) => data,
  target: getCartItemsFx,
})

sample({
  clock: addProductToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductToCartFx,
})

sample({
  clock: addProductsFromLSToCart,
  source: $cart,
  fn: (_, data) => data,
  target: addProductsFromLSToCartFx,
})

sample({
  clock: updateCartItemCount,
  source: $cart,
  fn: (_, data) => data,
  target: updateCartItemCountFx,
})

sample({
  clock: deleteProductFromCart,
  source: $cart,
  fn: (_, data) => data,
  target: deleteCartItemFx,
})

sample({
  clock: deleteAllFromCart,
  source: {},
  fn: (_, data) => data,
  target: deleteAllFromCartFx,
})
