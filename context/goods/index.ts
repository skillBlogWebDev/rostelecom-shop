'use client'
import { createDomain, createEffect } from 'effector'
import { createGate } from 'effector-react'
import toast from 'react-hot-toast'
import { handleShowSizeTable } from '@/lib/utils/common'
import { IProduct } from '@/types/common'
import {
  ILoadOneProductFx,
  ILoadProductsByFilterFx,
  ILoadWatchedProductsFx,
} from '@/types/goods'
import api from '@/api/apiInstance'

export const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentProduct = goods.createEvent<IProduct>()
export const loadOneProduct = goods.createEvent<ILoadOneProductFx>()
export const loadProductsByFilter = goods.createEvent<ILoadProductsByFilterFx>()
export const loadWatchedProducts = goods.createEvent<ILoadWatchedProductsFx>()

export const loadOneProductFx = createEffect(
  async ({
    productId,
    category,
    setSpinner,
    withShowingSizeTable,
  }: ILoadOneProductFx) => {
    try {
      setSpinner && setSpinner(true)
      const { data } = await api.post('/api/goods/one', { productId, category })

      if (withShowingSizeTable) {
        handleShowSizeTable(data.productItem)
      }

      if (data?.message === 'Wrong product id') {
        return { productItem: { errorMessage: 'Wrong product id' } }
      }

      return data
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setSpinner && setSpinner(false)
    }
  }
)

export const loadProductsByFilterFx = createEffect(
  async ({
    limit,
    offset,
    category,
    isCatalog,
    additionalParam,
  }: ILoadProductsByFilterFx) => {
    try {
      const { data } = await api.get(
        `/api/goods/filter?limit=${limit}&offset=${offset}&category=${category}&${additionalParam}${
          isCatalog ? '&catalog=true' : ''
        }`
      )

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const loadWatchedProductsFx = createEffect(
  async ({ payload }: ILoadWatchedProductsFx) => {
    try {
      const { data } = await api.post('/api/goods/watched', { payload })

      return data
    } catch (error) {
      toast.error((error as Error).message)
    }
  }
)

export const getNewProductsFx = createEffect(async () => {
  const { data } = await api.get('/api/goods/new')

  return data
})

export const getBestsellerProductsFx = createEffect(async () => {
  const { data } = await api.get('/api/goods/bestsellers')

  return data
})
