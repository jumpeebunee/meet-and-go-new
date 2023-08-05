import { FC, ReactNode } from "react";
import cl from "./Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "main" | "secondary";
  haveIcon?: string;
  fullWidth?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  type,
  haveIcon,
  fullWidth = false,
  ...rest
}) => {
  const styles = {
    main: `${cl.Button_main} body-xl`,
    secondary: `${cl.Button_secondary} body-m`,
  };

  return (
    <button
      disabled={disabled}
      style={{ width: `${fullWidth ? "100%" : ""}` }}
      className={`${cl.Button} ${styles[type || "main"]} ${
        haveIcon ? cl.WithIcon : ""
      }`}
      {...rest}
    >
      {haveIcon ? (
        <div
          className={cl.Icon}
          style={{ backgroundImage: `url(${haveIcon})` }}
        ></div>
      ) : (
        ""
      )}
      {children}
    </button>
  );
};

export default Button;
