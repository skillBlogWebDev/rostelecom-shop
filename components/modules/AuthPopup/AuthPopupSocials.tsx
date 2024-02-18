import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faGoogle,
  faVk,
  faYandex,
} from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocials = ({
  handleSignupWithOAuth,
}: {
  handleSignupWithOAuth: VoidFunction
}) => (
  <div className='cart-body__socials'>
    <button
      className='btn-reset socials__btn gh-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGithub} beat />
    </button>
    <button
      className='btn-reset socials__btn g-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faGoogle} shake />
    </button>
    <button
      className='btn-reset socials__btn y-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faYandex} bounce />
    </button>
    <button
      className='btn-reset socials__btn vk-color'
      onClick={handleSignupWithOAuth}
    >
      <FontAwesomeIcon icon={faVk} shake />
    </button>
  </div>
)

export default AuthPopupSocials
