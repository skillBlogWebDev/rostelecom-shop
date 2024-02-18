import styles from '@/styles/tooltip/index.module.scss'

const Tooltip = ({ text }: { text: string }) => (
  <div className={styles.tooltip__inner}>
    <span className={styles.tooltip__text}>{text}</span>
  </div>
)

export default Tooltip
