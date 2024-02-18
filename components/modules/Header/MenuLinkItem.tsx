import Link from 'next/link'
import React from 'react'
import { IMenuLinkItemProps } from '@/types/modules'

const MenuLinkItem = ({
  item,
  handleRedirectToCatalog,
}: IMenuLinkItemProps) => {
  const onRedirect = () => handleRedirectToCatalog(item.href)

  return (
    <li key={item.id} className='nav-menu__accordion__item__list__item'>
      <Link
        href={item.href}
        className='nav-menu__accordion__item__list__item__link'
        onClick={onRedirect}
      >
        {item.text}
      </Link>
    </li>
  )
}

export default MenuLinkItem
