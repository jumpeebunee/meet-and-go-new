import { FC } from "react";
import cl from "./Item.module.scss";

interface ItemProps {
  title: string | number;
  body: string | number;
}

const Item: FC<ItemProps> = ({ title, body }) => {
  return (
    <li className={cl.Item}>
      <h3 className="body-m">{title}</h3>
      <p className="body-m">{body}</p>
    </li>
  );
};

export default Item;
