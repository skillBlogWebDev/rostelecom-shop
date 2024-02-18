import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IAddToCartBtnProps } from '@/types/goods'

const AddToCartBtn = ({
  handleAddToCart,
  addToCartSpinner,
  text,
  btnDisabled = false,
  className,
}: IAddToCartBtnProps) => (
  <button
    className={`btn-reset ${className}`}
    disabled={btnDisabled}
    onClick={handleAddToCart}
  >
    {addToCartSpinner ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      text
    )}
  </button>
)

export default AddToCartBtn
