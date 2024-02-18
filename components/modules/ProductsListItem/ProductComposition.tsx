'use client'
import styles from '@/styles/product-list-item/index.module.scss'
import { useLang } from '@/hooks/useLang'

const ProductComposition = ({ composition }: { composition: string }) => {
  const { lang, translations } = useLang()

  return (
    <span className={styles.product__composition}>
      {translations[lang].product.composition}:{' '}
      {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
       * @ts-ignore */}
      {translations[lang].catalog[composition]}
    </span>
  )
}

export default ProductComposition
