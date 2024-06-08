import autosize from 'autosize'
import { useLang } from '@/hooks/useLang'
import styles from '@/styles/order/index.module.scss'
import { useEffect, useState } from 'react'
import { FieldErrorsImpl, useForm } from 'react-hook-form'
import {
  emailValidationRules,
  nameValidationRules,
  phoneValidationRules,
} from '@/lib/utils/auth'
import NameErrorMessage from '@/components/elements/NameErrorMessage/NameErrorMessage'
import { IInputs } from '@/types/authPopup'
import { $orderDetailsValues } from '@/context/order/state'
import { useUnit } from 'effector-react'
import { setOrderDetailsValues } from '@/context/order'
import { IOrderDetailsValues } from '@/types/order'

const OrderDetailsForm = () => {
  const { lang, translations } = useLang()
  const [messageLength, setMessageLength] = useState(0)
  const {
    register,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<IOrderDetailsValues>()
  const orderDetailsValues = useUnit($orderDetailsValues)
  const inputs = watch()

  const nameRegister = register(
    'name_label',
    nameValidationRules(translations[lang].validation.invalid_value)
  )

  const surnameRegister = register(
    'surname_label',
    nameValidationRules(translations[lang].validation.invalid_value)
  )

  const phoneRegister = register(
    'phone_label',
    phoneValidationRules(translations[lang].validation.invalid_phone)
  )

  const emailRegister = register(
    'email_label',
    emailValidationRules(translations[lang].validation.invalid_email)
  )

  const messageRegister = register('message_label', { maxLength: 255 })

  const handleDetailsInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => e.target.classList.add(styles.with_value)

  const handleDetailsInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    if (e.target.value) {
      return
    }

    e.target.classList.remove(styles.with_value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    nameRegister.onChange({
      target: {
        name: nameRegister.name,
        value,
      },
    })
    setOrderDetailsValues({
      ...inputs,
      isValid,
      name_label: value,
    })
    trigger(nameRegister.name)
  }

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    surnameRegister.onChange({
      target: {
        name: surnameRegister.name,
        value,
      },
    })
    setOrderDetailsValues({
      ...inputs,
      isValid,
      surname_label: value,
    })
    trigger(surnameRegister.name)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    phoneRegister.onChange({
      target: {
        name: phoneRegister.name,
        value,
      },
    })
    setOrderDetailsValues({
      ...inputs,
      isValid,
      phone_label: value,
    })
    trigger(phoneRegister.name)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    emailRegister.onChange({
      target: {
        name: emailRegister.name,
        value,
      },
    })
    setOrderDetailsValues({
      ...inputs,
      isValid,
      email_label: value,
    })
    trigger(emailRegister.name)
  }

  const handleMessageChange = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.trim()
    messageRegister.onChange({
      target: {
        name: messageRegister.name,
        value,
      },
    })

    setOrderDetailsValues({
      ...inputs,
      isValid,
      message_label: value,
    })
    setMessageLength(e.target.value.length)
    trigger(messageRegister.name)
  }

  useEffect(() => {
    const textarea = document.querySelector(
      `.${styles.order__list__item__details__form__textarea}`
    )

    if (textarea) {
      autosize(textarea)
    }
  }, [])

  useEffect(() => {
    setOrderDetailsValues({
      ...orderDetailsValues,
      isValid,
    })
  }, [isValid])

  return (
    <form className={styles.order__list__item__details__form}>
      <div className={styles.order__list__item__details__form__inner}>
        <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={nameRegister.name}
            ref={nameRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleNameChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            {translations[lang].order.name_label}
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.order__list__item__details__form__error}
            fieldName={nameRegister.name}
          />
        </label>
        <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={surnameRegister.name}
            ref={surnameRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleSurnameChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            {translations[lang].order.surname_label}
          </span>
          <NameErrorMessage
            errors={errors as Partial<FieldErrorsImpl<IInputs>>}
            className={styles.order__list__item__details__form__error}
            fieldName={surnameRegister.name}
          />
        </label>
        <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={phoneRegister.name}
            ref={phoneRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handlePhoneChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            {translations[lang].order.phone_label}
          </span>
          {errors.phone_label && (
            <span className={styles.order__list__item__details__form__error}>
              {errors.phone_label?.message as React.ReactNode}
            </span>
          )}
        </label>
        <label className={styles.order__list__item__details__form__label}>
          <input
            type='text'
            name={emailRegister.name}
            ref={emailRegister.ref}
            className={styles.order__list__item__details__form__input}
            onFocus={handleDetailsInputFocus}
            onBlur={handleDetailsInputBlur}
            onChange={handleEmailChange}
          />
          <span
            className={styles.order__list__item__details__form__floating_label}
          >
            Email
          </span>
          {errors.email_label && (
            <span className={styles.order__list__item__details__form__error}>
              {errors.email_label?.message as React.ReactNode}
            </span>
          )}
        </label>
      </div>
      <label className={styles.order__list__item__details__form__label}>
        <textarea
          name={messageRegister.name}
          ref={messageRegister.ref}
          className={styles.order__list__item__details__form__textarea}
          onFocus={handleDetailsInputFocus}
          onBlur={handleDetailsInputBlur}
          onChange={handleMessageChange}
        />
        <span
          className={styles.order__list__item__details__form__floating_label}
        >
          {translations[lang].order.comments_order}
        </span>
        {errors.message_label && errors.message_label?.type === 'maxLength' && (
          <span className={styles.order__list__item__details__form__error}>
            {translations[lang].validation.max_255}
          </span>
        )}
        <span
          className={styles.order__list__item__details__form__label__count}
          style={{
            color:
              messageLength > 255 ? '#FF4747' : 'rgba(255, 255, 255, 0.40)',
          }}
        >
          {messageLength}/255
        </span>
      </label>
    </form>
  )
}

export default OrderDetailsForm
