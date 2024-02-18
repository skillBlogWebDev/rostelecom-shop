import { useLang } from '@/hooks/useLang'
import { emailValidationRules } from '@/lib/utils/auth'
import { IAuthInput } from '@/types/authPopup'
import styles from '@/styles/auth-popup/index.module.scss'

const EmailInput = ({ register, errors }: IAuthInput) => {
  const { lang, translations } = useLang()

  return (
    <div className='form__block'>
      <input
        type='email'
        className='form__block__input'
        placeholder='Email'
        {...register(
          'email',
          emailValidationRules(
            translations[lang].validation.invalid_email,
            translations[lang].validation.required_email
          )
        )}
      />
      {errors.email && (
        <span className={styles.error_alert}>{errors.email?.message}</span>
      )}
    </div>
  )
}

export default EmailInput
