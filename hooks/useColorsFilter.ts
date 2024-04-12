import { useEffect } from 'react'
import { useUnit } from 'effector-react'
import {
  $colors,
  $colorsOptions,
  setColors,
  setColorsOptions,
  updateColorsOptionByCode,
} from '@/context/catalog'
import { useLang } from './useLang'
import { getCheckedArrayParam, getSearchParamsUrl } from '@/lib/utils/common'

export const useColorsFilter = (
  handleApplyFiltersWithColors: (arg0: string[]) => void
) => {
  const { lang, translations } = useLang()
  const colorsOptions = useUnit($colorsOptions)
  const colors = useUnit($colors)

  const handleSelectColor = (id: number) => {
    const updatedOptions = colorsOptions.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )

    setColorsOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.id === id)

    if (currentOption && currentOption.checked) {
      setColors([...colors, currentOption.colorText])
      handleApplyFiltersWithColors(
        updatedOptions
          .filter((option) => option.checked)
          .map((option) => option.colorCode)
      )
      return
    }

    const updatedColorsByText = colors.filter(
      (color) => color !== currentOption?.colorText
    )

    const updatedColorsByCode = updatedColorsByText.map(
      (color) =>
        colorsOptions.find((option) => option.colorText === color)?.colorCode
    )

    setColors(updatedColorsByText)
    handleApplyFiltersWithColors(updatedColorsByCode as string[])
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const colorsParam = urlParams.get('colors')
    const updatedColorOptions = colorsOptions.map((option) => ({
      ...option,
      colorText: (translations[lang].catalog as { [index: string]: string })[
        option.colorCode
      ],
    }))

    setColorsOptions(updatedColorOptions)
    setColors(
      updatedColorOptions
        .filter((option) => option.checked)
        .map((option) => option.colorText)
    )

    if (colorsParam) {
      const validColors = getCheckedArrayParam(colorsParam)

      if (validColors) {
        setColors(
          validColors.map(
            (color) =>
              (translations[lang].catalog as { [index: string]: string })[color]
          )
        )
        handleApplyFiltersWithColors(validColors)
        validColors.forEach((color) => updateColorsOptionByCode(color))
      }

      return
    }

    setColors([])
    setColorsOptions(
      colorsOptions.map((option) => ({
        ...option,
        checked: false,
        colorText: (translations[lang].catalog as { [index: string]: string })[
          option.colorCode
        ],
      }))
    )
  }, [lang])

  return { handleSelectColor, colors, colorsOptions }
}
