import { FC } from 'react'
import cl from './FindEvent.module.scss'

interface FindEventProps {
  value: string;
  setValue: (arg: string) => void;
  findEvent: () => void;
  isLoading: boolean;
}

const FindEvent:FC<FindEventProps> = ({value, setValue, findEvent, isLoading}) => {
  return (
    <div className={cl.FindEvent}>
      <input value={value} onChange={(e) => setValue(e.target.value)} className={cl.FindEventInput} placeholder='Код эвента'/>
      <button disabled={isLoading || value.length < 15} onClick={findEvent} className={cl.FindEventBtn}>Найти</button>
    </div>
  )
}

export default FindEvent