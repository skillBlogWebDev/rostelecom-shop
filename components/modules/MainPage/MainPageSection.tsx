import AllLink from '@/components/elements/AllLink/AllLink'
import { IMainPageSectionProps } from '@/types/main-page'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/main-page/index.module.scss'
import { motion } from 'framer-motion'
import { basePropsForMotion } from '@/constants/motion'
import ProductsListItem from '../ProductsListItem/ProductsListItem'

const MainPageSection = ({ title, goods, spinner }: IMainPageSectionProps) => (
  <section className={styles.main_section}>
    <div className={`container ${styles.main_section__container}`}>
      <span className={styles.main_section__bg}>{title}</span>
      <h2 className={`site-title ${styles.main_section__title}`}>{title}</h2>
      <div className={styles.main_section__inner}>
        <AllLink />
        {spinner && (
          <motion.ul
            className={skeletonStyles.skeleton}
            {...basePropsForMotion}
          >
            {Array.from(new Array(4)).map((_, i) => (
              <li key={i} className={skeletonStyles.skeleton__item}>
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
        {!spinner && (
          <motion.ul
            className={`list-reset ${styles.main_section__list}`}
            {...basePropsForMotion}
          >
            {goods.map((item) => (
              <ProductsListItem key={item._id} item={item} title={title} />
            ))}
          </motion.ul>
        )}
      </div>
    </div>
  </section>
)

export default MainPageSection
