import cl from "./AppLoading.module.scss";

const AppLoading = () => {
  return (
    <div className={cl.Loading}>
      <div className={cl.Image}></div>
    </div>
  );
};

export default AppLoading;
