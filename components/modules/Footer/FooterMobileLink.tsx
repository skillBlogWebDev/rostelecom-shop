import Link from 'next/link'

const FooterMobileLink = ({ text }: { text: string }) => (
  <div className='footer__mobile'>
    <Link href='#'>{text}</Link>
  </div>
)

export default FooterMobileLink
