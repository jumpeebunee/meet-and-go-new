import { useSelector } from "react-redux";
import { getIsLoadingMore } from "../chatSlice";
import { IonSpinner } from "@ionic/react";

interface LoadMoreIconProps {}

const LoadMoreSpinner = (props: LoadMoreIconProps) => {
  const isLoadingMore = useSelector(getIsLoadingMore);

  if (!isLoadingMore) return null;

  return (
    <div>
      <IonSpinner
        style={{ margin: "0 auto", width: "100%", color: "#75D7A1" }}
        name="crescent"
      ></IonSpinner>
    </div>
  );
};

export default LoadMoreSpinner;
