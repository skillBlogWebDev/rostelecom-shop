import { handleSignIn, singInFx } from '@/context/auth'
import { useAuthForm } from '@/hooks/useAuthForm'
import { IAuthSideProps, IInputs } from '@/types/authPopup'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthPopupClose from './AuthPopupClose'
import EmailInput from './EmailInput'
import PasswordInput from './PasswordInput'
import { useLang } from '@/hooks/useLang'
import AuthPopupSocials from './AuthPopupSocials'

const AuthPopupLogin = ({ toggleAuth, isSideActive }: IAuthSideProps) => {
  const { lang, translations } = useLang()
  const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } =
    useAuthForm(singInFx.pending, isSideActive, handleSignIn)

  const submitForm = (data: IInputs) =>
    handleSignIn({
      email: data.email,
      password: data.password,
      isOAuth: false,
    })

  return (
    <div className='card-back'>
      <AuthPopupClose />
      <div className='card-body wow-bg'>
        <h3 className='card-body__title'>
          {translations[lang].auth_popup.login_text}
        </h3>
        <p className='card-body__description'>
          {translations[lang].auth_popup.login_description}
        </p>
        <form onSubmit={handleSubmit(submitForm)}>
          <EmailInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className='card-body__inner'>
            <div className='inner__top'>
              <button className='inner__btn' type='submit' disabled={spinner}>
                {spinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  translations[lang].auth_popup.login_text
                )}
              </button>
            </div>
            <div className='inner__bottom'>
              <span className='inner__bottom__text'>
                {translations[lang].auth_popup.login_question}
              </span>
              <button
                type='button'
                className='btn-reset inner__switch'
                onClick={toggleAuth}
              >
                {translations[lang].auth_popup.register}!
              </button>
            </div>
          </div>
        </form>
        <AuthPopupSocials handleSignupWithOAuth={handleSignupWithOAuth} />
      </div>
    </div>
  )
}

export default AuthPopupLogin
