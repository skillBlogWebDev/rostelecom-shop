import CheckboxSelectItem from '../CheckboxSelectItem'
import { useSizeFilter } from '@/hooks/useSizeFilter'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/catalog/index.module.scss'

const SizesFilter = ({
  handleApplyFiltersWithSizes,
}: {
  handleApplyFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { lang, translations } = useLang()
  const { handleSelectSize, sizesOptions } = useSizeFilter(
    handleApplyFiltersWithSizes
  )

  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        {translations[lang].catalog.size}
      </h3>
      <ul
        className={`list-reset ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {sizesOptions.map((item) => (
          <CheckboxSelectItem
            key={item.id}
            item={item}
            callback={handleSelectSize}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  )
}

export default SizesFilter
