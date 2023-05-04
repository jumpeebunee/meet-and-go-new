import { IonSpinner } from "@ionic/react";
import styles from "./Message.module.scss";

interface MessageProps {
  avatar: string;
  username: string;
  body: string;
  type: "text" | "image";
  date: string;
}

const Message = ({
  avatar,
  username,
  type,
  body,
  date,
}: MessageProps) => {
  return (
    <div className={`${styles.message}`}>
      <button className={styles.avatarButton}>
        <img src={avatar} className={styles.avatarImg} alt="" />
      </button>
      <div className={styles.content}>
        <div className={styles.usernameWrapper}>
          <span>{username}</span>
          <time>{date}</time>
        </div>
        <div className={styles.bodyWrapper}>
          {type == "text" ? <p>{body}</p> : <img src={body} />}
        </div>
      </div>
    </div>
  );
};

export default Message;
