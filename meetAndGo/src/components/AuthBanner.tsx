import cl from '../styles/authBanner.module.scss'

const AuthBanner = () => {
  return (
    <div className={cl.authBanner}>
      <h2>Хватит сидеть дома и скучать</h2>
      <p>Создавайте события или присоединяйтесь к уже существующим</p>
    </div>
  )
}

export default AuthBanner