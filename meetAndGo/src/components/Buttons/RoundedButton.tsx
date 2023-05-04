
import {useState, useEffect} from 'react';
import { DPButton } from '../../types/types';
import styles from './RoundedButton.module.scss'

interface RoundedButtonProps extends DPButton {
  iconSrc: string;
	alt?: string;
}

const RoundedButton = ({
  className,
  iconSrc,
  ...props
}: RoundedButtonProps) => {
  return (
    <button className={`${styles.sendButton} ${className ?? ""}`} {...props}>
      <img src={iconSrc} alt={props.alt} />
    </button>
  );
};

export default RoundedButton;