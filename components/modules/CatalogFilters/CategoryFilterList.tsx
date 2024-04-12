import { motion } from 'framer-motion'
import Link from 'next/link'
import { ICategoryFilterListProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'
import SelectItem from './SelectItem'
import { getSearchParamsUrl } from '@/lib/utils/common'

const CategoryFilterList = ({
  mobileClassName,
  currentOptions,
  catalogCategoryOptions,
  allCategoriesTitle,
  option,
  handleSelectAllCategories,
  setOption,
}: ICategoryFilterListProps) => (
  <motion.ul
    className={`list-reset ${styles.catalog__filters__list} ${mobileClassName}`}
  >
    {currentOptions &&
      Object.keys(catalogCategoryOptions)[0] !== 'rootCategoryOptions' &&
      currentOptions.map((item) => (
        <SelectItem
          key={item.id}
          setOption={setOption}
          mobileClassName={mobileClassName}
          item={item}
          isActive={option === item.title}
        />
      ))}
    {catalogCategoryOptions.rootCategoryOptions && (
      <>
        <li
          className={`${
            styles.catalog__filters__list__item
          } ${mobileClassName} ${
            option === allCategoriesTitle ? styles.option_active : ''
          }`}
        >
          <button
            className={`btn-reset ${styles.catalog__filters__list__item__btn}`}
            onClick={handleSelectAllCategories}
          >
            {allCategoriesTitle}
          </button>
        </li>
        {catalogCategoryOptions.rootCategoryOptions.map((item) => (
          <li
            className={`${styles.catalog__filters__list__item} ${mobileClassName}`}
            key={item.id}
          >
            <Link
              href={`${item.href}?${getSearchParamsUrl().toString()}`}
              className={styles.catalog__filters__list__item__btn}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </>
    )}
  </motion.ul>
)

export default CategoryFilterList
