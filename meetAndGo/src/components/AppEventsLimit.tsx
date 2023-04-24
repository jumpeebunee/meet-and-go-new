import { FC } from 'react'
import SecondButton from './UI/SecondButton/SecondButton'
import cl from '@/styles/AppEventsLimit.module.scss'

interface AppEventsLimitProps {
  title: string;
  body: string;
  setIsOpen?: (arg: boolean) => void;
}

const AppEventsLimit:FC<AppEventsLimitProps> = ({title, body, setIsOpen}) => {
  return (
    <div className={cl.AppEventsLimit}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {setIsOpen &&
        <div className={cl.AppEventsLimitBtns}>
          <SecondButton onClick={() => setIsOpen(false)}>Закрыть</SecondButton>
        </div>
      }
    </div>
  )
}

export default AppEventsLimit