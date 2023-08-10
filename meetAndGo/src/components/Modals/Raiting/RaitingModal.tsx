import { FC } from "react";
import SecondButton from "../../UI/SecondButton/SecondButton";
import cl from "./raitingModal.module.scss";
import { IonModal } from "@ionic/react";
import Button from "../../UI/Button/Button";

interface RaitingModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

const RaitingModal: FC<RaitingModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <IonModal isOpen={isOpen}>
      <div className={`modal-container ${cl.Modal}`}>
        <div>
          <h2 className="title-xxl">Репутация</h2>

          <div className={cl.Content}>
            <p className="body-m">
              Чтобы повышать свою репутацию создавайте события. Приглашайте
              друзей и участвуйте в мероприятиях.
            </p>

            <p className="body-m">
              Чем больше репутация тем больше доверия вам окажут другие
              пользователи. Вы так же сможете создавать больше событий.
            </p>
          </div>
        </div>

        <Button onClick={() => setIsOpen(false)} type="secondaryGrey">
          Назад
        </Button>
      </div>
    </IonModal>
  );
};

export default RaitingModal;
