import { useState, FormEvent, FC, useCallback } from "react";
import cl from "./LoginForm.module.scss";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import { ILogin } from "../../../types/types";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import {
  emailConfig,
  passwordConfig,
} from "../../../formValidation/formValidation";

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
    handleLogin(data);
  };

  /*
  const loginWithGoogle = async () => {
    signInWithRedirect(auth, provider)
      .then((result: any) => {
        console.log(result);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };
  */

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

      <Button disabled={isLoading}>Войти</Button>
      {/* <Button
        fullWidth
        onClick={loginWithGoogle}
        haveIcon={googleIcon}
        type="secondary"
      >
        Войти через Google
      </Button> */}
    </form>
  );
};

export default LoginForm;
