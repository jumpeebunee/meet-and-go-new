import { FC } from "react";

import cl from "./EventPrice.module.scss";

interface EventPriceProps {
  price: string;
  style?: React.CSSProperties;
}

const EventPrice: FC<EventPriceProps> = ({ price, style }) => {
  return (
    <div style={style} className={cl.EventPrice}>
      <div className="body-l">Сбор</div>
      <div className={cl.EventPriceDescription}>
        {new Intl.NumberFormat("ru-RU").format(+price)} рублей
      </div>
    </div>
  );
};

export default EventPrice;
