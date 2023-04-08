import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import cl from '../styles/authForm.module.scss'
import MainButton from './MainButton/MainButton'
import ErrorMessage from './ErrorMessage/ErrorMessage';
import PasswordVisible from './PasswordVisible/PasswordVisible';
import { emailConfig, nameConfig, passwordConfig } from '../formValidation/formValidation';

const RegisterForm = () => {

  const [isVisible, setIsVisible] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm({});

  const handleChange = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(prev => !prev);
  }

  const onSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.loginFormWrapper}>
        <input 
          className='app-input'
          type="text"
          placeholder='Имя'
          {...register('fullname', nameConfig())}
        />
        {errors?.fullname?.message && <ErrorMessage styles={{marginTop: 15}}>{errors?.fullname?.message as string}</ErrorMessage>}
      </div>
      <div className={cl.loginFormWrapper}>
        <input 
          className='app-input'
          type="text"
          placeholder='Email'
          {...register('email', emailConfig())}
        />
        {errors?.email?.message && <ErrorMessage styles={{marginTop: 15}}>{errors?.email?.message as string}</ErrorMessage>}
      </div>
      <div className={cl.loginFormWrapper}>
        <input
            type={isVisible ? 'text' : 'password'}
            className='app-input'
            placeholder='Пароль'
            autoComplete='true'
            {...register('password', passwordConfig())}
          />
          {errors?.password?.message && <ErrorMessage styles={{marginTop: 15}}>{errors?.password?.message as string}</ErrorMessage>}
          <PasswordVisible isVisible={isVisible} handleChange={handleChange}/>
      </div>
      <MainButton>Создать аккаунт</MainButton>
    </form>
  )
}

export default RegisterForm