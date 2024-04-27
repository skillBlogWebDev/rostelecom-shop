/* eslint-disable prettier/prettier */
import { capitalizeFirstLetter } from '@/lib/utils/common'
import { useLang } from './useLang'
import { loadProductsByFilterFx } from '@/context/goods'
import { $products } from '@/context/goods/state'
import { useUnit } from 'effector-react'

export const useProductsByCollection = (collection: string) => {
  const products = useUnit($products)
  const spinner = useUnit(loadProductsByFilterFx.pending)
  const { lang, translations } = useLang()
  const langText = translations[lang].product.collection_goods
  const capitalizedCollection = capitalizeFirstLetter(collection)
  const title =
    lang === 'ru'
      ? `${langText} «${capitalizedCollection}»`
      : [
        langText.slice(0, 17),
        ` «${capitalizedCollection}»`,
        langText.slice(17),
      ].join('')

  return { title, capitalizedCollection, products, spinner }
}
