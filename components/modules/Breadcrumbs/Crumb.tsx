import Link from 'next/link'
import { ICrumbProps } from '@/types/modules'

const Crumb = ({ text: defaultText, href, last = false }: ICrumbProps) =>
  last ? (
    <a className='last-crumb breadcrumbs__item__link'>
      <span>{defaultText}</span>
    </a>
  ) : (
    <Link href={href} className='breadcrumbs__item__link'>
      <span>{defaultText}</span>
    </Link>
  )
export default Crumb
