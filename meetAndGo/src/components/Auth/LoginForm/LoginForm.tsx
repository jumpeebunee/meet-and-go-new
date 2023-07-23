import { useState, FormEvent, FC, useCallback } from "react";
import cl from "./LoginForm.module.scss";
import MainButton from "../../UI/MainButton/MainButton";
import { useForm } from "react-hook-form";
import { loginConfig } from "../../../formValidation/formValidation";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { ILogin } from "../../../types/types";
import Input from "../../UI/Input/Input";

interface LoginFormProps {
  handleLogin: (data: ILogin) => void;
  setIsForgot: (arg: boolean) => void;
  setServerError: (error: string) => void;
  serverError: string;
  isLoading: boolean;
  isSended: boolean;
}

const LoginForm: FC<LoginFormProps> = ({
  isSended,
  handleLogin,
  isLoading,
  serverError,
  setIsForgot,
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

  const handleForgot = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsForgot(true);
  };

  const onSubmit = (data: any) => {
    console.log(serverError);
    handleLogin(data);
  };

  const currentMessage = useCallback(() => {
    if (errors.email) {
      return errors.email.message;
    } else if (errors.password) {
      return errors.password.message;
    } else {
      return null;
    }
  }, [errors]);

  return (
    <form className={cl.Form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Email"
        type="email"
        register={register("email", loginConfig())}
      />

      <Input
        placeholder="Пароль"
        type={isVisible ? "text" : "password"}
        register={register("password", loginConfig())}
        isPasswordVisible={isVisible}
        setIsPasswordVisible={handleChange}
        isPassword
      />

      <div className={cl.Errors}>
        {currentMessage() || serverError ? (
          <ErrorMessage styles={{ marginTop: -5 }}>
            {currentMessage()
              ? currentMessage()?.toString()
              : "Неверный логин или пароль"}
          </ErrorMessage>
        ) : (
          <div></div>
        )}

        {!isSended && (
          <button onClick={handleForgot} className={`body-s ${cl.Forgot}`}>
            Забыли пароль?
          </button>
        )}
      </div>

      <MainButton disabled={isLoading}>Войти</MainButton>
    </form>
  );
};

export default LoginForm;
