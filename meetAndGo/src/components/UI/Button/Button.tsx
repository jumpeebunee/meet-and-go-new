import { FC, ReactNode } from "react";
import cl from "./Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, disabled, ...rest }) => {
  return (
    <button disabled={disabled} className={cl.Button} {...rest}>
      {children}
    </button>
  );
};

export default Button;
