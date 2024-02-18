import { createDomain } from 'effector'
import { ISelectedSizes } from '@/types/common'

const sizeTable = createDomain()

export const setSizeTableSizes = sizeTable.createEvent<ISelectedSizes>()

export const $sizeTableSizes = sizeTable
  .createStore({} as ISelectedSizes)
  .on(setSizeTableSizes, (_, sizes) => sizes)
