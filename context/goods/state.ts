'use client'
import { IProduct } from '@/types/common'
import { IProducts } from '@/types/goods'
import { Effect } from 'effector'
import {
  setCurrentProduct,
  loadProductsByFilterFx,
  loadOneProductFx,
  goods,
  loadWatchedProductsFx,
  getBestsellerProductsFx,
  getNewProductsFx,
} from '.'

const goodsStoreInstance = (effect: Effect<void, [], Error>) =>
  goods
    .createStore([])
    .on(effect.done, (_, { result }) => result)
    .on(effect.fail, (_, { error }) => {
      console.log(error.message)
    })

export const $newProducts = goodsStoreInstance(getNewProductsFx)
export const $bestsellerProducts = goodsStoreInstance(getBestsellerProductsFx)

export const $currentProduct = goods
  .createStore<IProduct>({} as IProduct)
  .on(setCurrentProduct, (_, product) => product)
  .on(loadOneProductFx.done, (_, { result }) => result.productItem)

export const $products = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadProductsByFilterFx.done, (_, { result }) => result)

export const $watchedProducts = goods
  .createStore<IProducts>({} as IProducts)
  .on(loadWatchedProductsFx.done, (_, { result }) => result)
