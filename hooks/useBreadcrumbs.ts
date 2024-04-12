import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useCrumbText } from './useCrumbText'
import { usePageTitle } from './usePageTitle'
import { useLang } from './useLang'

export const useBreadcrumbs = (page: string) => {
  const [dynamicTitle, setDynamicTitle] = useState('')
  const { lang, translations } = useLang()
  const pathname = usePathname()
  const breadcrumbs = document.querySelector('.breadcrumbs') as HTMLUListElement
  const { crumbText } = useCrumbText(page)
  const getDefaultTextGenerator = useCallback(() => crumbText, [crumbText])
  const getTextGenerator = useCallback((param: string) => ({})[param], [])
  usePageTitle(page, dynamicTitle)

  useEffect(() => {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    if (lastCrumb) {
      const productTypePathname = pathname.split(`/${page}/`)[1]

      if (!productTypePathname) {
        setDynamicTitle('')
        lastCrumb.textContent = crumbText
        return
      }

      const text = (
        translations[lang][
          page === 'comparison' ? 'comparison' : 'breadcrumbs'
        ] as { [index: string]: string }
      )[productTypePathname]
      setDynamicTitle(text)
      lastCrumb.textContent = text
    }
  }, [breadcrumbs, crumbText, lang, pathname, translations, page])

  return { getDefaultTextGenerator, getTextGenerator }
}
