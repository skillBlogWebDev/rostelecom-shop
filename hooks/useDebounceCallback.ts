import { MutableRefObject, useEffect, useRef } from 'react'

export const useDebounceCallback = (delay = 100) => {
  const timerRef = useRef() as MutableRefObject<NodeJS.Timeout>

  useEffect(() => clearTimeout(timerRef.current), [])

  return (callback: VoidFunction) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(callback, delay)
  }
}
