'use client'
import { useLang } from '@/hooks/useLang'
import { useState } from 'react'
import styles from '@/styles/password-restore/index.module.scss'
import { useUnit } from 'effector-react'
import { verifyCodeFx, verifyEmailFx } from '@/context/passwordRestore'
import { useForm } from 'react-hook-form'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { emailValidationRules } from '@/lib/utils/auth'
import CodeInputBlock from '@/components/modules/ProfilePage/CodeInputBlock/CodeInputBlock'
import PasswordRestoreForm from '@/components/modules/PasswordRestorePage/PasswordRestoreForm'

const PasswordRestorePage = () => {
  const { lang, translations } = useLang()
  const [viewId, setViewId] = useState(1)
  const [codeId, setCodeId] = useState('')
  const verifyEmailSpinner = useUnit(verifyEmailFx.pending)
  const verifyCodeSpinner = useUnit(verifyCodeFx.pending)
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>()

  const handleVerifyEmail = async (data: { email: string }) => {
    const result = await verifyEmailFx({
      email: data.email,
    })

    if (!result) {
      return
    }

    setCodeId(result.codeId)
    setViewId(2)
  }

  const handleCompleteEmailVerification = async (codeFromInput: string) => {
    const data = await verifyCodeFx({ code: +codeFromInput, codeId })

    if (data?.result) {
      setViewId(3)
    }
  }

  return (
    <main>
      <section className={styles.password_restore}>
        <div className='container'>
          <h1 className={`site-title ${styles.password_restore__title}`}>
            {translations[lang].password_restore_page.password_restore}
          </h1>
          {(verifyEmailSpinner || verifyCodeSpinner) && (
            <div className={styles.password_restore__spinner}>
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' size='3x' />
            </div>
          )}
          {viewId === 1 && !verifyEmailSpinner && (
            <form
              className={styles.password_restore_form}
              onSubmit={handleSubmit(handleVerifyEmail)}
            >
              <h2 className={styles.password_restore_form__title}>
                {translations[lang].password_restore_page.enter_your_email}
              </h2>
              <label className={styles.password_restore_form__label}>
                {errors.email && (
                  <span className={styles.password_restore_form__warn}>
                    {errors.email?.message}
                  </span>
                )}
                <input
                  type='email'
                  className={styles.password_restore_form__input}
                  placeholder='Email'
                  {...register(
                    'email',
                    emailValidationRules(
                      translations[lang].validation.invalid_email,
                      translations[lang].validation.required_email
                    )
                  )}
                />
              </label>
              <button
                className={`btn-reset ${styles.password_restore_form__btn}`}
              >
                {translations[lang].common.send}
              </button>
            </form>
          )}
          {viewId === 2 && !verifyCodeSpinner && (
            <>
              <h2 className={styles.password_restore_form__title}>
                {translations[lang].password_restore_page.we_sent_code}{' '}
                <span>{getValues('email')}</span>
              </h2>
              <CodeInputBlock onComplete={handleCompleteEmailVerification} />
            </>
          )}
          {viewId === 3 && (
            <PasswordRestoreForm userEmail={getValues('email')} />
          )}
        </div>
      </section>
    </main>
  )
}

export default PasswordRestorePage
