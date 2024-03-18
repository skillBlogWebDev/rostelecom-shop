import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import { ISkeletonProps } from '@/types/elements'

const Skeleton = ({ styles, count = 4 }: ISkeletonProps) => (
  <motion.ul
    className={`list-reset ${styles.skeleton}`}
    {...basePropsForMotion}
  >
    {Array.from(new Array(count)).map((_, i) => (
      <li key={i} className={styles.skeleton__item}>
        <div className={styles.skeleton__item__light} />
      </li>
    ))}
  </motion.ul>
)

export default Skeleton
