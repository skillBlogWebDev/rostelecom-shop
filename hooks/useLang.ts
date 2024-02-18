'use client'
import { useUnit } from 'effector-react'
import { $lang } from '@/context/lang'
import translationsJson from '@/public/translations/translations.json'

export const useLang = () => {
  const lang = useUnit($lang)
  const translations = translationsJson

  return { lang, translations }
}
