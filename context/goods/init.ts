import { Effect, sample } from 'effector'
import {
  MainPageGate,
  getBestsellerProductsFx,
  getNewProductsFx,
  loadOneProduct,
  loadOneProductFx,
  loadProductsByFilter,
  loadProductsByFilterFx,
  loadWatchedProducts,
  loadWatchedProductsFx,
} from '.'
import { $currentProduct, $products, $watchedProducts } from './state'
import { Gate } from 'effector-react'

const goodsSampleInstance = (
  effect: Effect<void, [], Error>,
  gate: Gate<unknown>
) =>
  sample({
    clock: gate.open,
    target: effect,
  })

goodsSampleInstance(getNewProductsFx, MainPageGate)
goodsSampleInstance(getBestsellerProductsFx, MainPageGate)

sample({
  clock: loadOneProduct,
  source: $currentProduct,
  fn: (_, data) => data,
  target: loadOneProductFx,
})

sample({
  clock: loadProductsByFilter,
  source: $products,
  fn: (_, data) => data,
  target: loadProductsByFilterFx,
})

sample({
  clock: loadWatchedProducts,
  source: $watchedProducts,
  fn: (_, data) => data,
  target: loadWatchedProductsFx,
})
