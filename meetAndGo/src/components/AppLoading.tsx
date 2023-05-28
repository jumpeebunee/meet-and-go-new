import cl from '../styles/AppLoading.module.scss'
import logo from '../assets/logo.svg'

const AppLoading = () => {
  return (
    <div className={cl.appLoading}>
      <div className={cl.appLoadingContent}>
        <img src={logo} alt="Meet And Go"/>
        <h2>Meet And Go</h2>
      </div>
    </div>
  )
}

export default AppLoading