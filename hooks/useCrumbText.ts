import { useLang } from './useLang'

export const useCrumbText = (initialText: string) => {
  const { lang, translations } = useLang()
  const crumbText = (
    translations[lang].breadcrumbs as { [index: string]: string }
  )[initialText]

  return { crumbText }
}
