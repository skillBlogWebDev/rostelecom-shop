'use client'
import {
  ICatalogCategoryOptions,
  ISizeOption,
  IColorOption,
} from '@/types/catalog'
import {
  catalog,
  setCatalogCategoryOptions,
  setSizesOptions,
  updateSizesOptionBySize,
  setColorsOptions,
  updateColorsOptionByCode,
  setSizes,
  setColors,
  setFiltersPopup,
} from '.'

export const $catalogCategoryOptions = catalog
  .createStore<ICatalogCategoryOptions>({})
  .on(setCatalogCategoryOptions, (_, options) => ({ ...options }))

export const $sizesOptions = catalog
  .createStore<ISizeOption[]>([
    { id: 1, size: 'S', checked: false },
    { id: 2, size: 'L', checked: false },
    { id: 3, size: 'M', checked: false },
    { id: 4, size: 'XL', checked: false },
    { id: 5, size: 'XXL', checked: false },
  ])
  .on(setSizesOptions, (_, options) => options)
  .on(updateSizesOptionBySize, (state, size) =>
    state.map((item) =>
      item.size === size ? { ...item, checked: true } : item
    )
  )

export const $colorsOptions = catalog
  .createStore<IColorOption[]>([
    { id: 1, colorCode: 'purpure', checked: false, colorText: '' },
    { id: 2, colorCode: 'yellow', checked: false, colorText: '' },
    { id: 3, colorCode: 'orange', checked: false, colorText: '' },
    { id: 4, colorCode: 'black', checked: false, colorText: '' },
    { id: 5, colorCode: 'white', checked: false, colorText: '' },
  ])
  .on(setColorsOptions, (_, options) => options)
  .on(updateColorsOptionByCode, (state, color) =>
    state.map((item) =>
      item.colorCode === color ? { ...item, checked: true } : item
    )
  )

export const $sizes = catalog
  .createStore<string[]>([])
  .on(setSizes, (_, sizes) => sizes)

export const $colors = catalog
  .createStore<string[]>([])
  .on(setColors, (_, colors) => colors)

export const $filtersPopup = catalog
  .createStore(false)
  .on(setFiltersPopup, (_, value) => value)
