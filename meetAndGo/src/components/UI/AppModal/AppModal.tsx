import { FC, ReactNode } from 'react'
import cl from './AppModal.module.scss'

interface AppModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  children: ReactNode;
}

const AppModal:FC<AppModalProps> = ({isOpen, setIsOpen, children}) => {

  const rootClasses = [cl.appModal];
  if (isOpen) rootClasses.push(cl.appModalActive);

  return (
    <div onClick={() => setIsOpen(false)} className={rootClasses.join(' ')}>
      <div onClick={(e) => e.stopPropagation()} className={cl.appModalContent}>
        {children}
      </div>
    </div>
  )
}

export default AppModal