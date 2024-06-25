import { motion } from 'framer-motion'
import { IProfileInfoBlockProps } from '@/types/profile'
import { basePropsForMotion } from '@/constants/motion'
import styles from '@/styles/profile/index.module.scss'

const ProfileInfoBlock = ({ allowEdit, text }: IProfileInfoBlockProps) => (
  <motion.div {...basePropsForMotion} className={styles.profile__info__main}>
    <span className={styles.profile__info__text}>{text}</span>
    <button
      className={`btn-reset ${styles.profile__info__edit}`}
      onClick={allowEdit}
    />
  </motion.div>
)

export default ProfileInfoBlock
