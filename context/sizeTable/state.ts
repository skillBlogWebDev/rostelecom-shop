'use client'
import { ISelectedSizes } from '@/types/common'
import { sizeTable } from '.'
import { setSizeTableSizes } from '../sizeTable'

export const $sizeTableSizes = sizeTable
  .createStore({} as ISelectedSizes)
  .on(setSizeTableSizes, (_, sizes) => sizes)
