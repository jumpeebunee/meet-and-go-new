import React, { FC, ReactNode } from 'react'

import cl from './MainButton.module.scss'

interface MainButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const MainButton:FC<MainButtonProps> = ({children, disabled, ...rest}) => {
  return (
    <button disabled={disabled} className={cl.mainButton} {...rest}>{children}</button>
  )
}

export default MainButton