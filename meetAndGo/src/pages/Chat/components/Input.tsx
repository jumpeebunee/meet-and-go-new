import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onSend: (text: string) => any;
}

const Input = ({ onSend, ...props }: InputProps) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (text.length) {
			onSend(text);
      setText("");
		}
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" && text.length) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={text}
        onKeyDown={handleKeydown}
        onChange={(e) => setText(e.target.value)}
        {...props}
      />
      <button disabled={props.disabled} onClick={handleClick}></button>
    </div>
  );
};

export default Input;
