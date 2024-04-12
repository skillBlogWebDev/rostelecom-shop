import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import SelectBtn from './SelectBtn'
import { basePropsForMotion } from '@/constants/motion'
import SelectItem from './SelectItem'
import { getSearchParamsUrl } from '@/lib/utils/common'
import styles from '@/styles/catalog/index.module.scss'

const SortSelect = ({
  handleApplyFiltersBySort,
}: {
  handleApplyFiltersBySort: (arg0: string) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const [option, setOption] = useState('')

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sort')

    if (sizesParam) {
      const paramOption = (
        translations[lang].catalog as { [index: string]: string }
      )[sizesParam]

      if (paramOption) {
        setOption(paramOption)
        handleApplyFiltersBySort(sizesParam)
      }
    }
  }, [lang])

  const sortOptions = [
    {
      id: 1,
      title: translations[lang].catalog.popular,
      filterHandler: () => handleApplyFiltersBySort('popular'),
    },
    {
      id: 2,
      title: translations[lang].catalog.new,
      filterHandler: () => handleApplyFiltersBySort('new'),
    },
    {
      id: 3,
      title: translations[lang].catalog.cheap_first,
      filterHandler: () => handleApplyFiltersBySort('cheap_first'),
    },
    {
      id: 4,
      title: translations[lang].catalog.expensive_first,
      filterHandler: () => handleApplyFiltersBySort('expensive_first'),
    },
  ]

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.sort}
        dynamicText={option}
        bgClassName={styles.bg_sort}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`list-reset ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            {sortOptions.map((item) => (
              <SelectItem
                key={item.id}
                item={item}
                setOption={setOption}
                isActive={item.title === option}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SortSelect
