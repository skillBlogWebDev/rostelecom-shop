import { useLang } from '@/hooks/useLang'
import { INameErrorMessageProps } from '@/types/authPopup'

const NameErrorMessage = ({
  errors,
  className,
  fieldName,
}: INameErrorMessageProps) => {
  const { lang, translations } = useLang()

  return (
    <>
      {errors[fieldName] && (
        <span className={className}>{errors[fieldName]?.message}</span>
      )}
      {errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
        <span className={className}>{translations[lang].validation.min_2}</span>
      )}
      {errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
        <span className={className}>
          {translations[lang].validation.max_15}
        </span>
      )}
    </>
  )
}

export default NameErrorMessage
