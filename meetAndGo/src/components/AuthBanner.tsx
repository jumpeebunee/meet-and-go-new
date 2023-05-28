import cl from '../styles/authBanner.module.scss'

const AuthBanner = () => {
  return (
    <div className={cl.authBanner}>
      <div className={cl.authBannerContent}>
        <h2>Хватит сидеть дома и скучать</h2>
        <p>Создавайте события или присоединяйтесь к уже существующим</p>
      </div>
    </div>
  )
}

export default AuthBanner