import { ISelectInfoItem } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const SelectInfoItem = ({ text, handleRemoveItem, id }: ISelectInfoItem) => {
  const handleClick = () => handleRemoveItem(id)

  return (
    <li className={styles.catalog__filters__bottom__list__item}>
      <span className={styles.catalog__filters__bottom__list__item__text}>
        {text}
      </span>
      <button
        className={`btn-reset ${styles.catalog__filters__bottom__list__item__close}`}
        onClick={handleClick}
      />
    </li>
  )
}

export default SelectInfoItem
