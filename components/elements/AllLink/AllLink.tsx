'use client'
import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/main-page/index.module.scss'

const AllLink = ({ link }: { link?: string }) => {
  const { lang, translations } = useLang()

  return (
    <Link href={link || `/catalog`} className={styles.all}>
      <span />
      {translations[lang].common.all_link}
    </Link>
  )
}

export default AllLink
