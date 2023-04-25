import { useState, FormEvent, FC } from 'react'
import cl from '../styles/AuthForm.module.scss'
import PasswordVisible from './UI/PasswordVisible/PasswordVisible';
import MainButton from './UI/MainButton/MainButton';
import { useForm } from 'react-hook-form';
import { loginConfig } from '../formValidation/formValidation';
import ErrorMessage from './UI/ErrorMessage/ErrorMessage';
import { ILogin } from '../types/types';

interface LoginFormProps {
  handleLogin: (data: ILogin) => void;
  setIsForgot: (arg: boolean) => void;
  serverError: string;
  isLoading: boolean;
  isSended: boolean;
}

const LoginForm:FC<LoginFormProps> = ({isSended, handleLogin, isLoading, serverError, setIsForgot}) => {

  const [isVisible, setIsVisible] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({});

  const handleChange = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(prev => !prev);
  }

  const handleForgot = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsForgot(true);
  }

  const onSubmit = (data: any) => {
    handleLogin(data);
  }

  return (
    <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='email'
          className='app-input'
          placeholder='Email'
          {...register('email', loginConfig())}
        />
        {errors?.email?.message && <ErrorMessage styles={{marginTop: 15}}>{errors?.email?.message as string}</ErrorMessage>}
      </div>
      <div className={cl.loginFormWrapper}>
        <input
          type={isVisible ? 'text' : 'password'}
          className='app-input'
          placeholder='Пароль'
          autoComplete='true'
          {...register('password', loginConfig())}
        />
         {errors?.password?.message && <ErrorMessage styles={{marginTop: 15}}>{errors?.password?.message as string}</ErrorMessage>}
        <PasswordVisible isVisible={isVisible} handleChange={handleChange}/>
      </div>
      <div className={cl.loginFormErrors}>
        {serverError
          ? <ErrorMessage styles={{marginTop: -5}}>Неверная почта или пароль</ErrorMessage>
          : <div></div>
        }
        {!isSended && <button onClick={handleForgot} className={cl.loginFormForget}>Забыли пароль?</button>}
      </div>
      <MainButton disabled={isLoading}>Войти</MainButton>
    </form>
  )
}

export default LoginForm