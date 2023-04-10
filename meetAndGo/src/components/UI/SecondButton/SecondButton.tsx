import { FC, ReactNode } from 'react'
import cl from './SecondButton.module.scss'


interface SecondButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const SecondButton:FC<SecondButtonProps> = ({children, ...rest}) => {
  return (
    <button className={cl.secondButton} {...rest}>{children}</button>
  )
}
export default SecondButton