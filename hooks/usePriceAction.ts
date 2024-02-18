import { useEffect, useState } from 'react'

export const usePriceAction = (count: number, initialPrice: number) => {
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)

  return { price, increasePrice, decreasePrice }
}
