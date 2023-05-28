import { FC, FormEvent } from 'react'
import cl from './PasswordVisible.module.scss'

interface PasswordVisibleProps {
  handleChange: (e: FormEvent<HTMLButtonElement>) => void;
  isVisible: boolean;
}

const PasswordVisible:FC<PasswordVisibleProps> = ({handleChange, isVisible}) => {
  return (
    <button 
      onClick={(e) => handleChange(e)}
      className={isVisible ? `${cl.passwordIcon} ${cl.passwordIconVisible}` : cl.passwordIcon}>
    </button>
  )
}

export default PasswordVisible