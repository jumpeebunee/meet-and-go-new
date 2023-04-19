import { FC } from 'react'
import SecondButton from './UI/SecondButton/SecondButton'
import cl from '@/styles/AppEventsLimit.module.scss'

interface AppEventsLimitProps {
  setIsOpen: (arg: boolean) => void;
}

const AppEventsLimit:FC<AppEventsLimitProps> = ({setIsOpen}) => {
  return (
    <div className={cl.AppEventsLimit}>
      <div>
        <h2>Вы не можете создать еще одно событие</h2>
        <p>Максимальное количество  событий, в которых вы участвуете - 3. Повышайте репутацию чтобы посещать больше событий. Вы можете покинуть одно и создать новое.</p>
      </div>
      <div className={cl.AppEventsLimitBtns}>
        <SecondButton onClick={() => setIsOpen(false)}>Закрыть</SecondButton>
      </div>
    </div>
  )
}

export default AppEventsLimit