import { useUnit } from 'effector-react'
import { useEffect } from 'react'
import { loadWatchedProducts } from '@/context/goods'
import { $watchedProducts } from '@/context/goods/state'
import { getWatchedProductFromLS } from '@/lib/utils/common'

export const useWatchedProducts = (excludedProductId?: string) => {
  const watchedProducts = useUnit($watchedProducts)

  useEffect(() => {
    const watchedProducts = getWatchedProductFromLS()

    loadWatchedProducts({
      payload: excludedProductId
        ? watchedProducts.filter((item) => item._id !== excludedProductId)
        : watchedProducts,
    })
  }, [excludedProductId])

  return { watchedProducts }
}
