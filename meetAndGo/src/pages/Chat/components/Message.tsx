import { IMessage } from "../../../types/types";
import styles from './Message.model.scss'

interface MessageProps {
	isOwner: boolean,
	avatar: string,
	username: string,
	body: string,
	type: 'text' | 'image',
	date: Date
}

const Message = ({
  isOwner,
  avatar,
  username,
  type,
  body,
  date,
}: Partial<MessageProps>) => {
  return (
    <div className={`styles.wrapper ${isOwner && styles.owner}`}>
      <div className={styles.username}>{username}</div>
      <div className="">{body}</div>
    </div>
  );
};

export default Message;
