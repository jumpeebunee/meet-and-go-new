import cl from "./authBanner.module.scss";

const AuthBanner = () => {
  return (
    <div className={cl.Banner}>
      <div>
        <h2 className={`title-xxl ${cl.Title}`}>
          Хватит сидеть дома и скучать
        </h2>
        <p>Создавайте события или присоединяйтесь к уже существующим</p>
      </div>
    </div>
  );
};

export default AuthBanner;
