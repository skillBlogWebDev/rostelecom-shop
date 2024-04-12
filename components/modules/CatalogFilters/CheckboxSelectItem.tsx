import { ICheckboxSelectItemProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const CheckboxSelectItem = ({
  item,
  callback,
  mobileClassName,
}: ICheckboxSelectItemProps) => {
  const handleChangeOption = () => callback(item.id)

  return (
    <li
      className={`${styles.catalog__filters__list__item} ${
        item.checked ? styles.option_active : ''
      } ${mobileClassName}`}
    >
      <label
        className={`btn-reset ${styles.catalog__filters__list__item__btn}`}
      >
        <input
          type='checkbox'
          checked={item.checked}
          onChange={handleChangeOption}
          className={styles.catalog__filters__list__item__btn__input}
        />
        <span
          className={styles.catalog__filters__list__item__btn__checkbox_text}
        >
          {item?.size || item?.colorText}
        </span>
      </label>
    </li>
  )
}

export default CheckboxSelectItem
