import { FC, ReactNode } from 'react'

import cl from './SecondButton.module.scss'


interface SecondButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const SecondButton:FC<SecondButtonProps> = ({disabled, children, ...rest}) => {
  return (
    <button disabled={disabled} className={cl.secondButton} {...rest}>{children}</button>
  )
}
export default SecondButton