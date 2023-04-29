import { FC } from 'react';
import cl from './LinkButton.module.scss';

interface LinkButtonProps {

}

const LinkButton:FC<LinkButtonProps> = () => {
  return (
    <button className={cl.LinkButton}>
      <span></span>
    </button>
  )
}

export default LinkButton;