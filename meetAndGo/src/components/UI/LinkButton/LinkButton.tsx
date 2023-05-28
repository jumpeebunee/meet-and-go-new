import { FC, useState } from 'react';
import cl from './LinkButton.module.scss';

interface LinkButtonProps {
  link: string;
}

const LinkButton:FC<LinkButtonProps> = ({link}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = () => {
    window.navigator.clipboard.writeText(link);
  }

  const handleOpen = () => {
    setIsOpen(true);
    handleCopy();
  }

  if (isOpen) {
    return (
      <button onClick={handleCopy} className={cl.LinkButtonOpened}>
        {link}
      </button>
    )
  } else {
    return (
      <button onClick={handleOpen} className={cl.LinkButton}>
        <span></span>
      </button>
    )
  }
}

export default LinkButton;