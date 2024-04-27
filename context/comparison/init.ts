import { sample } from 'effector'
import {
  loadComparisonItems,
  getComparisonItemsFx,
  addProductToComparison,
  addProductToComparisonFx,
  addProductsFromLSToComparison,
  addProductsFromLSToComparisonFx,
  deleteProductFromComparison,
  deleteComparisonItemFx,
} from '.'
import { $comparison } from './state'

sample({
  clock: loadComparisonItems,
  source: $comparison,
  fn: (_, data) => data,
  target: getComparisonItemsFx,
})

sample({
  clock: addProductToComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: addProductToComparisonFx,
})

sample({
  clock: addProductsFromLSToComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: addProductsFromLSToComparisonFx,
})

sample({
  clock: deleteProductFromComparison,
  source: $comparison,
  fn: (_, data) => data,
  target: deleteComparisonItemFx,
})
