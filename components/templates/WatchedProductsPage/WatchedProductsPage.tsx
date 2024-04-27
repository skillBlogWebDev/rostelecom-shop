'use client'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import ProductsListItem from '@/components/modules/ProductsListItem/ProductsListItem'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { useLang } from '@/hooks/useLang'
import { useWatchedProducts } from '@/hooks/useWatchedProducts'
import styles from '@/styles/watched-products-page/index.module.scss'

const WatchedProductsPage = () => {
  const { watchedProducts } = useWatchedProducts()
  const { lang, translations } = useLang()
  const { getDefaultTextGenerator, getTextGenerator } =
    useBreadcrumbs('watched_products')

  return (
    <main>
      <Breadcrumbs
        getDefaultTextGenerator={getDefaultTextGenerator}
        getTextGenerator={getTextGenerator}
      />
      <section className={styles.watched_products}>
        <div className='container'>
          <h1 className={`site-title ${styles.watched_products__title}`}>
            {translations[lang].product.watched}
          </h1>
          <ul className={`list-reset ${styles.watched_products__list}`}>
            {(watchedProducts.items || []).map((item) => (
              <ProductsListItem key={item._id} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default WatchedProductsPage
