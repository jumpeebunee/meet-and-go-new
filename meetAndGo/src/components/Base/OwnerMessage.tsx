import { IonSpinner } from "@ionic/react";
import styles from "./Message.module.scss";

interface OwnerMessageProps {
  body: string;
  date: string;
  type: "text" | "image";
  isLoading?: boolean;
}

const OwnerMessage = ({ body, date, type, isLoading = false }: OwnerMessageProps) => {
  return (
    <div className={`${styles.message} ${styles.ownerMessage}`}>
      <time>{date}</time>
      <div
        className={`${styles.bodyWrapper} ${isLoading ? styles.loading : ""}`}
      >
        {type == "text" ? <p>{body}</p> : <img  src={body} />}
        {isLoading && (
          <IonSpinner
            className={styles.loadSpinner}
            name="lines-sharp-small"
          ></IonSpinner>
        )}
      </div>
    </div>
  );
};

export default OwnerMessage;
