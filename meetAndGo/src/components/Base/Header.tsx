import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBackClick: () => any;
}


const Header = ({ title, subtitle, onBackClick }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <button onClick={onBackClick} className={styles.backButton}>
        <span></span>
      </button>
      <div>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
};

export default Header;
