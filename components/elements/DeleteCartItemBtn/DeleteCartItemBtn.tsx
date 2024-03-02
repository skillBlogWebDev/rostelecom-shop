import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IDeleteCartItemBtnProps } from '@/types/cart'

const DeleteItemBtn = ({
  btnDisabled,
  callback,
  className,
}: IDeleteCartItemBtnProps) => (
  <button
    className={`btn-reset cart-list__item__delete ${className}`}
    onClick={callback}
    disabled={btnDisabled}
  >
    {btnDisabled ? (
      <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
    ) : (
      <span />
    )}
  </button>
)

export default DeleteItemBtn
