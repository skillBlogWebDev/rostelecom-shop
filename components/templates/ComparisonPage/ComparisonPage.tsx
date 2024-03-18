'use client'
import ComparisonLinksList from '@/components/modules/Comparison/ComparisonLinksList'
import { useComparisonLinks } from '@/hooks/useComparisonLinks'
import styles from '@/styles/comparison/index.module.scss'

const ComparisonPage = () => {
  const { availableProductLinks } = useComparisonLinks()

  return (
    <ComparisonLinksList
      links={availableProductLinks}
      className={styles.comparison_main_links}
    />
  )
}

export default ComparisonPage
