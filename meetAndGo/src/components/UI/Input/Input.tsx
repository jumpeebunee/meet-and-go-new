import { FC, FormEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import PasswordVisible from "../../Auth/PasswordVisible/PasswordVisible";
import cl from "./Input.module.scss";

interface InputProps {
  type?: string;
  register?: UseFormRegisterReturn<"email" | "password" | "fullname">;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  placeholder: string;
  isPassword?: boolean;
  isPasswordVisible?: boolean;
  setIsPasswordVisible?: (e: FormEvent<HTMLButtonElement>) => void;
  label?: string;
}

const Input: FC<InputProps> = ({
  register,
  placeholder,
  isPassword = false,
  isPasswordVisible = false,
  setIsPasswordVisible,
  ...props
}) => {
  if (isPassword && setIsPasswordVisible) {
    return (
      <div className={cl.Wrapper}>
        <input
          placeholder={placeholder}
          className={`${cl.Input} body-l`}
          {...props}
          {...register}
        />
        <PasswordVisible
          isVisible={isPasswordVisible}
          handleChange={setIsPasswordVisible}
        />
      </div>
    );
  }

  return (
    <input
      placeholder={placeholder}
      className={`${cl.Input} body-l`}
      {...props}
      {...register}
    />
  );
};

export default Input;
