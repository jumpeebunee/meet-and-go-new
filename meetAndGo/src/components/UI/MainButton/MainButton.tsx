import React, { FC, ReactNode } from 'react'
import cl from './MainButton.module.scss'

interface MainButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

const MainButton:FC<MainButtonProps> = ({children, ...rest}) => {
  return (
    <button className={cl.mainButton} {...rest}>{children}</button>
  )
}

export default MainButton