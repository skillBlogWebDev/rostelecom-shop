import Slider from 'react-slick'
import { useUnit } from 'effector-react'
import { motion } from 'framer-motion'
import { loadWatchedProductsFx } from '@/context/goods'
import { useLang } from '@/hooks/useLang'
import AllLink from '@/components/elements/AllLink/AllLink'
import { basePropsForMotion } from '@/constants/motion'
import ProductsListItem from '../ProductsListItem/ProductsListItem'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { IProducts } from '@/types/goods'
import styles from '@/styles/watched-products/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'

const WatchedProducts = ({
  watchedProducts,
}: {
  watchedProducts: IProducts
}) => {
  const spinner = useUnit(loadWatchedProductsFx.pending)
  const { lang, translations } = useLang()
  const isMedia430 = useMediaQuery(430)
  const isMedia370 = useMediaQuery(370)

  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    speed: 500,
    autoplay: false,
    arrows: false,
  }

  return (
    <div className={styles.watched}>
      <h2 className={styles.watched__title}>
        {translations[lang].product.watched}
      </h2>
      <div className={styles.watched__inner}>
        <AllLink link='/watched-products' />
        <Slider {...settings} className={styles.watched__slider}>
          {spinner ? (
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
          ) : (
            (watchedProducts.items || []).map((item) => (
              <div
                key={item._id}
                className={styles.watched__slide}
                style={{ width: isMedia370 ? 240 : isMedia430 ? 280 : 350 }}
              >
                <ProductsListItem item={item} />
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  )
}

export default WatchedProducts
