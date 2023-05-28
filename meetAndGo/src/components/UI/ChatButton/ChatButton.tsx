import { FC } from 'react';
import cl from './ChatButton.module.scss';

interface ChatButtonProps {
  handle: () => void;
}

const ChatButton:FC<ChatButtonProps> = ({handle}) => {
  return (
    <button onClick={handle} className={cl.ChatButton}>
      <span></span>
    </button>
  )
}

export default ChatButton