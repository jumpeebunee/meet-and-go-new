import { FC } from "react";

import cl from "./Header.module.scss";

interface OpenedEventHeaderProps {
  title: string;
  date: string;
}

const OpenedEventHeader: FC<OpenedEventHeaderProps> = ({ title, date }) => {
  return (
    <div className={cl.Header}>
      <h2 className="title-xl">{title}</h2>
      <div className={`sublabel ${cl.Date}`}>{date}</div>
    </div>
  );
};

export default OpenedEventHeader;
