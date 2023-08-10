import cl from "./ProfileModal.module.scss";
import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../../app/feautures/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import ErrorMessage from "../../../UI/ErrorMessage/ErrorMessage";
import ProfileUser from "../ProfileUser";
import ProfileList from "../ProfileList/ProfileList";
import { IonContent, IonModal } from "@ionic/react";
import { PHONE_REG, TOWN_REG } from "../../../../constants/constants";
import Button from "../../../UI/Button/Button";

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setIsRaitngOpen: (arg: boolean) => void;
}

const ProfileModal: FC<ProfileModalProps> = ({
  isOpen,
  setIsOpen,
  setIsRaitngOpen,
}) => {
  const currentUser = useSelector(user);

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState("");
  const [townField, setTownField] = useState(currentUser.town);
  const [phoneField, setPhoneField] = useState(currentUser.phone);

  const handleEdit = () => {
    setIsError("");

    if (isEdit) {
      const isPhoneValid =
        PHONE_REG.test(phoneField) || phoneField.length === 0;

      const isTownValid = TOWN_REG.test(townField) || townField.length === 0;

      if (!isPhoneValid) {
        setIsError("Введите корректный номер из 11 цифр");
      } else if (!isTownValid) {
        setIsError("Введите валидный город");
      } else {
        setPhoneField(phoneField);
        setIsEdit(false);
        updateData();
      }
    } else {
      setPhoneField(phoneField);
      setIsEdit(true);
    }
  };

  const updateData = async () => {
    const documentRef = doc(db, "users", currentUser.uid);

    await updateDoc(documentRef, {
      phone: phoneField,
      town: townField,
    });
  };

  const handleLogout = async () => {
    setIsOpen(false);
    auth.signOut();
  };

  useMemo(() => {
    if (!isOpen && isEdit) {
      setTownField(currentUser.town);
      setPhoneField(currentUser.phone);
      setIsError("");
      setIsEdit(false);
    }
  }, [isOpen]);

  return (
    <IonModal class={cl.IonModal} isOpen={isOpen}>
      <IonContent>
        <div className={cl.Modal}>
          <div>
            <ProfileUser
              image={currentUser.image}
              username={currentUser.username}
              raiting={currentUser.reputation}
              setIsRaitngOpen={setIsRaitngOpen}
            />

            <ProfileList
              totalMeets={currentUser.totalMeets}
              createdMeets={currentUser.createdMeets}
              townField={townField}
              phoneField={phoneField}
              isEdit={isEdit}
              setTownField={setTownField}
              setPhoneField={setPhoneField}
            />

            <button
              onClick={handleLogout}
              className={cl.profileModalLogout}
            ></button>

            {isError && <ErrorMessage>{isError}</ErrorMessage>}
          </div>

          <div className={cl.buttons}>
            <Button onClick={handleEdit} fullWidth>
              {isEdit ? "Сохранить" : "Изменить"}
            </Button>

            <Button
              type="secondaryGrey"
              fullWidth
              onClick={() => setIsOpen(false)}
            >
              Назад
            </Button>
          </div>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ProfileModal;
