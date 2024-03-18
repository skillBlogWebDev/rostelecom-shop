import { $comparison, $comparisonFromLs } from '@/context/comparison'
import { useGoodsByAuth } from './useGoodsByAuth'

export const useComparisonItems = (type: string) => {
  const currentComparisonByAuth = useGoodsByAuth($comparison, $comparisonFromLs)
  const items = currentComparisonByAuth.filter(
    (item) => item.characteristics.type === type
  )

  return { items }
}
