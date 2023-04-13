import { FC } from "react"
import cl from './RangeInput.module.scss';

interface RangeInputProps {
  inputValue: string;
  changeInputValue: (arg: string) => void;
}

const RangeInput:FC<RangeInputProps> = ({inputValue, changeInputValue}) => {
  return (
    <div>
      <label className="label">Сбор</label>
      <span className="label_description">Взнос каждого участника</span>
      <input onChange={(e) => changeInputValue(e.target.value)} min={0} max={5000} step={50} className={cl.RangeInput} type="range" />
      <div className={cl.RangeInputValue}>{new Intl.NumberFormat('ru-RU').format(+inputValue)} рублей</div>
    </div>
  )
}

export default RangeInput