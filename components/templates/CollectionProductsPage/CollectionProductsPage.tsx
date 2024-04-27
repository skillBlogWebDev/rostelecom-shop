'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { loadProductsByFilter } from '@/context/goods'
import { useProductsByCollection } from '@/hooks/useProductsByCollection'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import { basePropsForMotion } from '@/constants/motion'
import { getSearchParamsUrl } from '@/lib/utils/common'
import {
  allowedCollections,
  allowedCollectionsCategories,
} from '@/constants/product'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import styles from '@/styles/watched-products-page/index.module.scss'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'

const CollectionProductsPage = () => {
  const [currentCollection, setCurrentCollection] = useState('')
  const { title, spinner, products } =
    useProductsByCollection(currentCollection)
  const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs(
    'collection_products'
  )

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const categoryParam = urlParams.get('category')
    const collectionParam = urlParams.get('collection')

    if (
      categoryParam &&
      collectionParam &&
      allowedCollectionsCategories.includes(categoryParam) &&
      allowedCollections.includes(collectionParam)
    ) {
      setCurrentCollection(collectionParam)

      loadProductsByFilter({
        limit: 12,
        offset: 0,
        category: categoryParam,
        additionalParam: urlParams.toString(),
      })

      return
    }

    notFound()
  }, [])

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.watched_products}>
        <div className='container'>
          <h1 className={`site-title ${styles.watched_products__title}`}>
            {title}
          </h1>
          {spinner && (
            <motion.ul
              className={skeletonStyles.skeleton}
              style={{ marginBottom: 40 }}
              {...basePropsForMotion}
            >
              {Array.from(new Array(12)).map((_, i) => (
                <li key={i} className={skeletonStyles.skeleton__item}>
                  <div className={skeletonStyles.skeleton__item__light} />
                </li>
              ))}
            </motion.ul>
          )}
          {!spinner && (
            <ul className={`list-reset ${styles.watched_products__list}`}>
              {(products.items || []).map((item) => (
                <ProductsListItem key={item._id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default CollectionProductsPage
