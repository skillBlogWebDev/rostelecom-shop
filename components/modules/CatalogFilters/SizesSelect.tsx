import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import { useSizeFilter } from '@/hooks/useSizeFilter'
import SelectBtn from './SelectBtn'
import { basePropsForMotion } from '@/constants/motion'
import CheckboxSelectItem from './CheckboxSelectItem'
import styles from '@/styles/catalog/index.module.scss'

const SizesSelect = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const { handleSelectSize, sizes, sizesOptions } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <div
      className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`}
      ref={ref}
    >
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.size}
        dynamicText={sizes.join(', ')}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`list-reset ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            {sizesOptions.map((item) => (
              <CheckboxSelectItem
                key={item.id}
                item={item}
                callback={handleSelectSize}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SizesSelect
