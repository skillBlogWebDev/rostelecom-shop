import { useLang } from '@/hooks/useLang'
import { IAuthInput } from '@/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const PasswordInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <input
        type='password'
        className='form__block__input'
        placeholder={translations[lang].auth_popup.password}
        {...register('password', {
          required: translations[lang].validation.required_password,
          minLength: 4,
          maxLength: 40,
        })}
      />
      {errors.password && (
        <span className={styles.error_alert}>{errors.password?.message}</span>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <span className={styles.error_alert}>
          {translations[lang].validation.min_4}
        </span>
      )}
      {errors.password && errors.password.type === 'maxLength' && (
        <span className={styles.error_alert}>
          {translations[lang].validation.max_20}
        </span>
      )}
    </div>
  )
}
export default PasswordInput
