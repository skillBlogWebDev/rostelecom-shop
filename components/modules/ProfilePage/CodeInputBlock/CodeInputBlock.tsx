import { MutableRefObject, useRef, useState } from 'react'
import { useLang } from '@/hooks/useLang'
import CodeInput from './CodeInput'
import styles from '@/styles/profile/index.module.scss'

const CodeInputBlock = ({
  onComplete,
}: {
  onComplete: (arg0: string) => void
}) => {
  const { lang, translations } = useLang()
  const [code, setCode] = useState([...Array(6)].map(() => ''))
  const inputs = useRef([]) as MutableRefObject<HTMLInputElement[]>

  const handleProcessInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    slot: number
  ) => {
    const num = e.target.value

    if (/[^0-9]/.test(num)) return

    const newCode = [...code]

    newCode[slot] = num
    setCode(newCode)

    if (slot !== 6 - 1) {
      inputs.current[slot + 1].focus()
    }

    if (newCode.every((num) => num !== '')) {
      onComplete(newCode.join(''))
    }
  }

  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    slot: number
  ) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code]

      newCode[slot - 1] = ''
      setCode(newCode)

      inputs.current[slot - 1].focus()
    }
  }

  const handlePushCurrentInput = (ref: HTMLInputElement) =>
    inputs.current.push(ref)

  return (
    <div className={styles.profile__code}>
      <label className={styles.profile__code__label}>
        {translations[lang].common.write_code}
      </label>
      <div className={styles.profile__code__inputs}>
        {code.map((num, index) => (
          <CodeInput
            key={index}
            processInput={handleProcessInput}
            onKeyUp={handleKeyUp}
            index={index}
            handlePushCurrentInput={handlePushCurrentInput}
            num={num}
            autoFocus={!code[0].length && index === 0}
          />
        ))}
      </div>
    </div>
  )
}

export default CodeInputBlock
