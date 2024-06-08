import { IOrderTitleProps } from '@/types/order'
import styles from '@/styles/order/index.module.scss'

const OrderTitle = ({ orderNumber, text }: IOrderTitleProps) => (
  <h3 className={styles.order__list__item__title}>
    <span>{orderNumber}</span>
    <span>{text}</span>
  </h3>
)

export default OrderTitle
