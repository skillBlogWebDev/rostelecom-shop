import { ISelectBtnProps } from '@/types/catalog'
import styles from '@/styles/catalog/index.module.scss'

const SelectBtn = ({
  open,
  toggle,
  dynamicText,
  defaultText,
  bgClassName,
}: ISelectBtnProps) => (
  <button
    className={`btn-reset ${styles.catalog__filters__btn} ${
      open ? styles.is_open : ''
    } ${bgClassName || ''}`}
    onClick={toggle}
  >
    {dynamicText ? (
      <span className={styles.catalog__filters__btn__inner}>
        <span className={styles.catalog__filters__btn__text}>
          {defaultText}
        </span>
        <span className={styles.catalog__filters__btn__info}>
          {dynamicText}
        </span>
      </span>
    ) : (
      defaultText
    )}
  </button>
)

export default SelectBtn
