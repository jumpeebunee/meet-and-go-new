import { IonSpinner } from "@ionic/react";
import { ForwardedRef, forwardRef } from "react";
import { useSelector } from "react-redux";
import { getIsLoadingMore } from "../slice";

interface LoadMoreIconProps {}

const LoadMoreSpinner = forwardRef(
  (props: LoadMoreIconProps, ref: ForwardedRef<HTMLDivElement>) => {
    const isLoadingMore = useSelector(getIsLoadingMore);

    return (
      <div ref={ref}>
        {isLoadingMore ? (
          <IonSpinner
            style={{ margin: "0 auto", width: "100%", color: "#75D7A1" }}
            name="crescent"
          ></IonSpinner>
        ) : null}
      </div>
    );
  }
);

export default LoadMoreSpinner;
