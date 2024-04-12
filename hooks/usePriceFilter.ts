import { useEffect, useState } from 'react'
import { useLang } from './useLang'
import {
  checkPriceParam,
  formatPrice,
  getSearchParamsUrl,
} from '@/lib/utils/common'

export const usePriceFilter = () => {
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const { lang, translations } = useLang()
  const [priceInfo, setPriceInfo] = useState('')

  const onPriceChange = (value: string, setState: (arg0: string) => void) =>
    setState(value.replace(/[^0-9]+/g, ''))

  const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) =>
    onPriceChange(e.target.value, setPriceFrom)

  const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) =>
    onPriceChange(e.target.value, setPriceTo)

  const priceFromInfo = (priceFrom: string) =>
    `${translations[lang].catalog.from} ${formatPrice(+priceFrom)} ₽`

  const priceToInfo = (priceTo: string) =>
    `${translations[lang].catalog.to} ${formatPrice(+priceTo)} ₽`

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const priceFromParam = urlParams.get('priceFrom')
    const priceToParam = urlParams.get('priceTo')

    if (priceFromParam && priceToParam) {
      if (checkPriceParam(+priceFromParam) && checkPriceParam(+priceToParam)) {
        setPriceFrom(priceFromParam)
        setPriceTo(priceToParam)
        setPriceInfo(
          `${priceFromInfo(priceFromParam)} ${priceToInfo(priceToParam)}`
        )
      }
    }
  }, [lang])

  return {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handleChangePriceFrom,
    handleChangePriceTo,
    priceInfo,
    setPriceInfo,
    priceFromInfo,
    priceToInfo,
  }
}
