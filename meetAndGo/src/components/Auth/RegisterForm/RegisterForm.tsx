import { FC, FormEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import {
  emailConfig,
  nameConfig,
  passwordConfig,
} from "../../../formValidation/formValidation";
import { IRegister } from "../../../types/types";
import Button from "../../UI/Button/Button";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import Input from "../../UI/Input/Input";
import cl from "./RegisterForm.module.scss";

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

  const currentMessage = useCallback(() => {
    if (errors.fullname) {
      return errors.fullname.message;
    } else if (errors.email) {
      return errors.email.message;
    } else if (errors.password) {
      return errors.password.message;
    } else {
      return null;
    }
  }, [errors]);

  return (
    <form className={cl.Form} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.FormContent}>
        <Input
          placeholder="Имя пользователя"
          type="text"
          register={register("fullname", nameConfig())}
        />

        <Input
          placeholder="Email"
          type="email"
          register={register("email", emailConfig())}
        />

        <Input
          placeholder="Пароль"
          type={isVisible ? "text" : "password"}
          register={register("password", passwordConfig())}
          isPasswordVisible={isVisible}
          setIsPasswordVisible={handleChange}
          isPassword
        />
      </div>

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
      </div>

      <div className={cl.Button}>
        <Button disabled={isLoading} fullWidth>
          Создать аккаунт
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
