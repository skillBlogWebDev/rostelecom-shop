import { AnimatePresence, motion } from 'framer-motion'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useLang } from '@/hooks/useLang'
import SelectBtn from './SelectBtn'
import { useColorsFilter } from '@/hooks/useColorsFilter'
import { basePropsForMotion } from '@/constants/motion'
import CheckboxSelectItem from './CheckboxSelectItem'
import styles from '@/styles/catalog/index.module.scss'

const ColorsSelect = ({
  handleApplyFiltersWithColors,
}: {
  handleApplyFiltersWithColors: (sizes: string[]) => void
}) => {
  const { lang, translations } = useLang()
  const { open, ref, toggle } = useClickOutside()
  const { handleSelectColor, colors, colorsOptions } = useColorsFilter(
    handleApplyFiltersWithColors
  )

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <SelectBtn
        open={open}
        toggle={toggle}
        defaultText={translations[lang].catalog.color}
        dynamicText={colors.join(', ')}
      />
      <AnimatePresence>
        {open && (
          <motion.ul
            className={`list-reset ${styles.catalog__filters__list}`}
            {...basePropsForMotion}
          >
            {colorsOptions.map((item) => (
              <CheckboxSelectItem
                key={item.id}
                item={item}
                callback={handleSelectColor}
              />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ColorsSelect
