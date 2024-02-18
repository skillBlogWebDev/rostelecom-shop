import { useState } from 'react'

const useImagePreloader = () => {
  const [imgSpinner, setImgSpinner] = useState(true)

  const handleLoadingImageComplete = async (
    img: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    img.currentTarget.classList.remove('opacity-0')
    setImgSpinner(false)
  }

  return { handleLoadingImageComplete, imgSpinner }
}

export default useImagePreloader
