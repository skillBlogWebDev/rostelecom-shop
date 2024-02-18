import { animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export const usePriceAnimation = (initialFrom: number, initialTo: number) => {
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value) {
        setValue(+value.toFixed(0))
      },
    })

    return () => controls.stop()
  }, [from, to])

  return { setFrom, setTo, value }
}
