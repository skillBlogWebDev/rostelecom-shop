'use client'
import { createDomain } from 'effector'
import {
  ICatalogCategoryOptions,
  ISizeOption,
  IColorOption,
} from '@/types/catalog'

export const catalog = createDomain()

export const setCatalogCategoryOptions =
  catalog.createEvent<Partial<ICatalogCategoryOptions>>()
export const setSizesOptions = catalog.createEvent<ISizeOption[]>()
export const setColorsOptions = catalog.createEvent<IColorOption[]>()
export const updateSizesOptionBySize = catalog.createEvent<string>()
export const updateColorsOptionByCode = catalog.createEvent<string>()
export const setColors = catalog.createEvent<string[]>()
export const setSizes = catalog.createEvent<string[]>()
export const setFiltersPopup = catalog.createEvent<boolean>()
