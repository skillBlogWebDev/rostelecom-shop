import { ITabControlsProps } from '@/types/order'
import styles from '@/styles/order/index.module.scss'

const TabControls = ({
  handleTab1,
  handleTab2,
  tab1Active,
  tab2Active,
  tab1Text,
  tab2Text,
}: ITabControlsProps) => (
  <div className={styles.order__list__item__nav}>
    <button
      onClick={handleTab1}
      className={`btn-reset ${styles.order__list__item__nav__item} ${
        tab1Active ? styles.active : ''
      }`}
    >
      {tab1Text}
    </button>
    <button
      onClick={handleTab2}
      className={`btn-reset ${styles.order__list__item__nav__item} ${
        tab2Active ? styles.active : ''
      }`}
    >
      {tab2Text}
    </button>
  </div>
)

export default TabControls
