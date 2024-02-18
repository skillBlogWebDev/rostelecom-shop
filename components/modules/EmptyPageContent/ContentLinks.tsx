import Link from 'next/link'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/empty-content/index.module.scss'

const ContentLinks = ({ btnText }: { btnText: string }) => {
  const { lang, translations } = useLang()

  return (
    <div className={styles.empty_content__links}>
      <Link href='/catalog'>{btnText}</Link>
      <Link href='/'>{translations[lang].common.back_to_main}</Link>
    </div>
  )
}

export default ContentLinks
