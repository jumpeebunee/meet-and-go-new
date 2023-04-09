import { FC } from 'react'
import cl from './AppModal.module.scss'

interface AppModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const AppModal:FC<AppModalProps> = ({isOpen, setIsOpen}) => {

  const rootClasses = [cl.appModal];
  if (isOpen) rootClasses.push(cl.appModalActive);

  return (
    <div onClick={() => setIsOpen(false)} className={rootClasses.join(' ')}>
      <div onClick={(e) => e.stopPropagation()} className={cl.appModalContent}>
      </div>
    </div>
  )
}

export default AppModal