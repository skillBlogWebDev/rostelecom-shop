import { useUnit } from 'effector-react'
import { useLang } from '@/hooks/useLang'
import MainPageSection from './MainPageSection'
import { $bestsellerProducts } from '@/context/goods/state'
import { getBestsellerProductsFx } from '@/context/goods'

const BestsellerGoods = () => {
  const goods = useUnit($bestsellerProducts)
  const spinner = useUnit(getBestsellerProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.bestsellers_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default BestsellerGoods
