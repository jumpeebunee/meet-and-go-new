import { FC } from 'react'
import cl from './LabelInput.module.scss'

interface LabelInputProps {
  title: string;
  placeholder: string;
  inputValue: string;
  setInputValue: (arg: string) => void;
}

const LabelInput:FC<LabelInputProps> = ({title, placeholder, inputValue, setInputValue}) => {
  return (
    <div className={cl.labelInput}>
      <label className="label">{title}</label>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={placeholder} className="input"/>
    </div>
  )
}

export default LabelInput