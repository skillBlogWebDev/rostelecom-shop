import { ICatalogMenuButtonProps } from '@/types/modules'

const CatalogMenuButton = ({
  name,
  isActive,
  handler,
}: ICatalogMenuButtonProps) => (
  <button
    className='btn-reset catalog-menu__list__item__btn'
    onClick={handler}
    style={{
      color: isActive ? '#e8e9ea' : '#777c85',
    }}
  >
    {name}
  </button>
)

export default CatalogMenuButton
