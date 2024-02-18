import { useUnit } from 'effector-react'
import MainPageSection from './MainPageSection'
import { $newProducts } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import { getNewProductsFx } from '@/api/main-page'

const NewGoods = () => {
  const goods = useUnit($newProducts)
  const spinner = useUnit(getNewProductsFx.pending)
  const { lang, translations } = useLang()

  return (
    <MainPageSection
      title={translations[lang].main_page.new_title}
      goods={goods}
      spinner={spinner}
    />
  )
}

export default NewGoods
