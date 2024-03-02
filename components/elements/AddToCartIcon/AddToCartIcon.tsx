import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IAddToCartIconProps } from '@/types/elements'

const AddToCartIcon = ({
  isProductInCart,
  addedClassName,
  className,
  addToCartSpinner,
  callback,
}: IAddToCartIconProps) => (
  <>
    {isProductInCart ? (
      <span className={`${className} ${addedClassName}`} />
    ) : (
      <button className={`btn-reset ${className}`} onClick={callback}>
        {addToCartSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          <span />
        )}
      </button>
    )}
  </>
)

export default AddToCartIcon
