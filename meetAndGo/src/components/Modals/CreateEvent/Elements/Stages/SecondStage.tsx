import cl from "../../createEvent.module.scss";
import LabelInput from "../../../../UI/LabelInput/LabelInput";
import { FC, useEffect } from "react";
import axios from "axios";
import UsersCounter from "../../../../UI/UsersCounter/UsersCounter";
import RangeInput from "../../../../UI/RangeInput/RangeInput";
import { useSelector, useDispatch } from "react-redux";
import {
  changeAddress,
  changeUsers,
  changePrice,
  eventData,
} from "../../../../../app/feautures/createEventSlice";
import ErrorMessage from "../../../../UI/ErrorMessage/ErrorMessage";

interface SecondStageProps {}

const BASE_GEOCODE_URL = "https://api.geocodify.com/v2/reverse";
const BASE_GEOCODE_KEY = "9164b0a5c6f2637aa65ef1a4285ca68779bfc9e2&lat";

const SecondStageEvent: FC<SecondStageProps> = () => {
  const dispatch = useDispatch();
  const fullEvent = useSelector(eventData);

  useEffect(() => {
    setAddress();
  }, [fullEvent.coords]);

  const setAddress = async () => {
    if (fullEvent.coords.length) {
      try {
        const res = await axios.get(
          `${BASE_GEOCODE_URL}?api_key=${BASE_GEOCODE_KEY}&lat=${fullEvent.coords[0]}&lng=${fullEvent.coords[1]}`
        );
        dispatch(changeAddress(res.data.response.features[1].properties.name));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeAddress = (value: string) => dispatch(changeAddress(value));
  const handleChangeUsers = (value: number) => dispatch(changeUsers(value));
  const handleChangePrice = (value: string) => dispatch(changePrice(value));

  return (
    <>
      <div className={cl.Wrapper}>
        <h2 className={`${cl.Title} title-xl`}>О новом событии</h2>

        <LabelInput
          title="Адрес"
          placeholder="Адрес события"
          inputValue={fullEvent.address}
          setInputValue={handleChangeAddress}
        />

        <UsersCounter
          eventUsers={fullEvent.users}
          setEventUsers={handleChangeUsers}
        />

        <RangeInput
          inputValue={fullEvent.price}
          changeInputValue={handleChangePrice}
        />
      </div>
      {fullEvent.validError && (
        <ErrorMessage>{fullEvent.validError}</ErrorMessage>
      )}
    </>
  );
};

export default SecondStageEvent;
