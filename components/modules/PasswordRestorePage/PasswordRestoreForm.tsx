import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useUnit } from 'effector-react'
import { useForm } from 'react-hook-form'
import {
  updateUserPassword,
  updateUserPasswordFx,
} from '@/context/passwordRestore'
import { useLang } from '@/hooks/useLang'
import { IPasswordRestoreInputs } from '@/types/passwordRestore'
import styles from '@/styles/password-restore/index.module.scss'

const PasswordRestoreForm = ({ userEmail }: { userEmail: string }) => {
  const { lang, translations } = useLang()
  const updatePasswordSpinner = useUnit(updateUserPasswordFx.pending)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IPasswordRestoreInputs>()
  const passwordRegisterSettings = {
    required: translations[lang].validation.required_password,
    minLength: 4,
    maxLength: 40,
  }

  const handleCompletePasswordRestore = (data: IPasswordRestoreInputs) => {
    if (data.password !== data.passwordRepeat) {
      toast.error('Пароли не совпадают!')
      return
    }

    updateUserPassword({
      email: userEmail,
      password: data.password,
    })
  }

  return (
    <form
      className={styles.password_restore_form}
      onSubmit={handleSubmit(handleCompletePasswordRestore)}
    >
      <h2 className={styles.password_restore_form__title}>
        {translations[lang].password_restore_page.creaete_pasword}
      </h2>
      <label className={styles.password_restore_form__label}>
        {errors.password && (
          <span className={styles.password_restore_form__warn}>
            {errors.password?.message}
          </span>
        )}
        <input
          type='password'
          className={styles.password_restore_form__input}
          placeholder={translations[lang].auth_popup.password}
          {...register('password', passwordRegisterSettings)}
        />
      </label>
      <label className={styles.password_restore_form__label}>
        {errors.passwordRepeat && (
          <span className={styles.password_restore_form__warn}>
            {errors.passwordRepeat?.message}
          </span>
        )}
        <input
          type='password'
          placeholder={translations[lang].password_restore_page.repeat_pasword}
          className={styles.password_restore_form__input}
          {...register('passwordRepeat', passwordRegisterSettings)}
        />
      </label>
      <button className={`btn-reset ${styles.password_restore_form__btn}`}>
        {updatePasswordSpinner ? (
          <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
        ) : (
          translations[lang].common.save
        )}
      </button>
    </form>
  )
}

export default PasswordRestoreForm
