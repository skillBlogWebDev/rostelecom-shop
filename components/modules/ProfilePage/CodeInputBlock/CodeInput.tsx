import { ICodeInputProps } from '@/types/profile'

const CodeInput = ({
  processInput,
  onKeyUp,
  index,
  handlePushCurrentInput,
  num,
  autoFocus,
}: ICodeInputProps) => {
  const handleProcessInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    processInput(e, index)

  const handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) =>
    onKeyUp(e, index)

  return (
    <input
      type='text'
      inputMode='numeric'
      maxLength={1}
      value={num}
      autoFocus={autoFocus}
      onChange={handleProcessInput}
      onKeyUp={handleOnKeyUp}
      ref={handlePushCurrentInput}
    />
  )
}

export default CodeInput
