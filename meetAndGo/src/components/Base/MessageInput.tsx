import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import FileIcon from "../../assets/clip.svg";
import SendIcon from "../../assets/send.svg";
import { db, storage } from "../../firebase";
import styles from "./MessageInput.module.scss";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { IMessage } from "../../types/types";
import RoundedButton from "../Buttons/RoundedButton";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onTextSend: (text: string) => any;
	onFileSet: (file: File) => any;
}

const Input = ({ onTextSend, onFileSet, accept, ...props }: InputProps) => {
  const [text, setText] = useState("");

  const handleClick = () => {
    if (text.length) {
      onTextSend(text);
      setText("");
    }
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code == "Enter" && text.length) {
      onTextSend( text);
      setText("");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (img) {
			onFileSet(img);
    }
  };

  return (
    <label className={`${styles.wrapper} ${props.disabled ? "disabled" : ""}`}>
      <label
        className={`${styles.uploadButton} ${props.disabled ? "disabled" : ""}`}
      >
        <input type="file" accept={accept} onChange={handleUpload} />
        <img src={FileIcon} alt="fileIcon" />
      </label>
      <input
        type="text"
        value={text}
        onKeyDown={handleKeydown}
        onChange={(e) => setText(e.target.value)}
        {...props}
      />
			<RoundedButton onClick={handleClick} iconSrc={SendIcon} />
    </label>
  );
};

export default Input;
