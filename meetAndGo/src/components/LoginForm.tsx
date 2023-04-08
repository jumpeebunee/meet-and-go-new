import { useState, FormEvent } from 'react'
import cl from '../styles/loginForm.module.scss'
import PasswordVisible from './PasswordVisible/PasswordVisible';
import MainButton from './MainButton/MainButton';

const LoginForm = () => {

  const [isVisible, setIsVisible] = useState(false);

  const handleChange = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(prev => !prev);
  }

  return (
    <form className={cl.loginForm}>
      <div>
        <input
          type='text'
          className='app-input'
          placeholder='Email'
        />
      </div>
      <div className={cl.loginFormWrapper}>
        <input
          type={isVisible ? 'text' : 'password'}
          className='app-input'
          placeholder='Пароль'
          autoComplete='true'
        />
        <PasswordVisible isVisible={isVisible} handleChange={handleChange}/>
      </div>
      <MainButton>Войти</MainButton>
    </form>
  )
}

export default LoginForm