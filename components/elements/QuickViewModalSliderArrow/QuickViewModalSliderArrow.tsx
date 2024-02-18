import { IQuickViewModalSliderArrowProps } from '@/types/elements'
import styles from '@/styles/quick-view-modal/index.module.scss'

const QuickViewModalSliderArrow = (props: IQuickViewModalSliderArrowProps) => (
  <button
    className={`btn-reset ${styles.modal__left__slider__slide__arrow} ${props.directionClassName} `}
    onClick={props.onClick}
  />
)

export default QuickViewModalSliderArrow
