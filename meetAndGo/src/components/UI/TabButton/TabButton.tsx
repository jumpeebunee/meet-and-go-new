import { FC } from 'react';
import cl from './TabButton.module.scss';

interface TabButtonProps {
  state: string;
  changeState: (arg: string) => void;
}

const TabButton:FC<TabButtonProps> = ({state, changeState}) => {
  return (
    <div className={cl.TabButton}>
      <button onClick={() => changeState('active')} className={`${cl.TabButtonBtn} ${state === 'active' ? cl.TabButtonBtnActive : ''}`}>Активные</button>
      {/* <button onClick={() => changeState('archive')} className={`${cl.TabButtonBtn} ${state === 'archive' ? cl.TabButtonBtnActive : ''}`}>Архив</button> */}
    </div>
  )
}

export default TabButton