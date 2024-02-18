import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useLang } from '@/hooks/useLang'
import { showCountMessage } from '@/lib/utils/common'
import { IHeadingWithCountProps } from '@/types/elements'
import styles from '@/styles/heading-with-count/index.module.scss'

const HeadingWithCount = ({
  count,
  title,
  spinner,
}: IHeadingWithCountProps) => {
  const { lang } = useLang()

  return (
    <h1 className={`site-title ${styles.title}`}>
      <span>{title}</span>
      <span className={styles.title__count}>
        {spinner ? <FontAwesomeIcon icon={faSpinner} spin /> : count}{' '}
        {showCountMessage(`${count}`, lang)}
      </span>
    </h1>
  )
}

export default HeadingWithCount
