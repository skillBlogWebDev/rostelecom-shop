'use client'
import { createDomain } from 'effector'
import { ISelectedSizes } from '@/types/common'

export const sizeTable = createDomain()

export const setSizeTableSizes = sizeTable.createEvent<ISelectedSizes>()
