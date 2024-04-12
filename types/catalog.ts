export type SearchParams = { [key: string]: string | string[] | undefined }

export interface IProductsPage {
  searchParams: SearchParams
  pageName: string
}

export interface ICatalogCategoryOptions {
  rootCategoryOptions?: {
    id: number
    title: string
    href: string
  }[]
  clothCategoryOptions?: ICategoryOption[]
  accessoryCategoryOptions?: ICategoryOption[]
  officeCategoryOptions?: ICategoryOption[]
  souvenirsCategoryOptions?: ICategoryOption[]
}

export interface ICategoryOption {
  id: number
  title: string
  filterHandler: VoidFunction
}

export interface ICategoryFilterListProps {
  handleSelectAllCategories: VoidFunction
  currentOptions: ICategoryOption[]
  option: string
  setOption: (arg0: string) => void
  allCategoriesTitle: string
  catalogCategoryOptions: ICatalogCategoryOptions
  mobileClassName?: string
}

export interface ISelectItemProps {
  item: ICategoryOption
  isActive: boolean
  setOption: (arg0: string) => void
  mobileClassName?: string
}

export interface ISelectBtnProps {
  open: boolean
  toggle: VoidFunction
  dynamicText: string
  defaultText: string
  bgClassName?: string
}

export interface ICatalogFiltersProps {
  handleApplyFiltersWithPrice: (arg0: string, arg1: string) => void
  handleApplyFiltersWithSizes: (sizes: string[]) => void
  handleApplyFiltersWithColors: (sizes: string[]) => void
  handleApplyFiltersBySort: (arg0: string) => void
}

export interface ISizeOption {
  id: number
  size: string
  checked: boolean
}

export interface ICheckboxSelectItemProps {
  callback: (arg0: number) => void
  item: {
    id: number
    size?: string
    colorText?: string
    checked: boolean
  }
  mobileClassName?: string
}

export interface IColorOption {
  id: number
  colorCode: string
  checked: boolean
  colorText: string
}

export interface ISelectInfoItem {
  text: string
  handleRemoveItem: (arg0: number) => void
  id: number
}
