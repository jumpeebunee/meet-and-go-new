import cl from '../styles/profileButton.module.scss'
import avatar from '../assets/avatar.png'

const ProfileButton = () => {
  return (
    <button className={cl.profileBtn}>
      <div>Профиль</div>
      <div className={cl.profileBtnImage}>
        <img src={avatar} alt="Ваш аватар"/>
      </div>
    </button>
  )
}

export default ProfileButton