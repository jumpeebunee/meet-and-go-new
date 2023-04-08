import { useState, FormEvent, FC } from 'react'
import cl from '../styles/loginForm.module.scss'
import PasswordVisible from './PasswordVisible/PasswordVisible';
import MainButton from './MainButton/MainButton';
import { useForm } from 'react-hook-form';
import loginConfig from '../formValidation/formValidation';
import ErrorMessage from './ErrorMessage/ErrorMessage';

interface LoginFormProps {
  handleLogin: () => void;
}

const LoginForm:FC<LoginFormProps> = ({handleLogin}) => {

  const [isVisible, setIsVisible] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({});

  const handleChange = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(prev => !prev);
  }

  const onSubmit = (data: any) => {
    handleLogin();
  }

  return (
    <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='text'
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
      {/* <ErrorMessage>Неверный логин или пароль</ErrorMessage> */}
      <MainButton>Войти</MainButton>
    </form>
  )
}

export default LoginForm