import { FC, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import {
  emailConfig,
  nameConfig,
  passwordConfig,
} from "../data/formValidation";
import cl from "../styles/authForm.module.scss";
import { IRegister } from "../types/types";
import ErrorMessage from "./UI/ErrorMessage/ErrorMessage";
import MainButton from "./UI/MainButton/MainButton";
import PasswordVisible from "./UI/PasswordVisible/PasswordVisible";

interface RegisterFormProps {
  handleRegister: (data: IRegister) => void;
  isLoading: boolean;
  serverError: string;
}

const RegisterForm: FC<RegisterFormProps> = ({
  handleRegister,
  serverError,
  isLoading,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleChange = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible((prev) => !prev);
  };

  const onSubmit = (data: any) => {
    handleRegister(data);
  };

  return (
    <form className={cl.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.loginFormWrapper}>
        <input
          className="app-input"
          type="text"
          placeholder="Имя"
          {...register("fullname", nameConfig())}
        />
        {errors?.fullname?.message && (
          <ErrorMessage styles={{ marginTop: 15 }}>
            {errors?.fullname?.message as string}
          </ErrorMessage>
        )}
      </div>
      <div className={cl.loginFormWrapper}>
        <input
          className="app-input"
          type="email"
          placeholder="Email"
          {...register("email", emailConfig())}
        />
        {errors?.email?.message && (
          <ErrorMessage styles={{ marginTop: 15 }}>
            {errors?.email?.message as string}
          </ErrorMessage>
        )}
      </div>
      <div className={cl.loginFormWrapper}>
        <input
          type={isVisible ? "text" : "password"}
          className="app-input"
          placeholder="Пароль"
          autoComplete="true"
          {...register("password", passwordConfig())}
        />
        {errors?.password?.message && (
          <ErrorMessage styles={{ marginTop: 15 }}>
            {errors?.password?.message as string}
          </ErrorMessage>
        )}
        <PasswordVisible isVisible={isVisible} handleChange={handleChange} />
      </div>
      {serverError && (
        <ErrorMessage styles={{ marginTop: -5 }}>
          Что-то пошло не так
        </ErrorMessage>
      )}
      <MainButton disabled={isLoading}>Создать аккаунт</MainButton>
    </form>
  );
};

export default RegisterForm;
