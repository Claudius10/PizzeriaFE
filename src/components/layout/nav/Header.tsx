import styles from "./css/Header.module.css";
import MainNavigation from "./MainNavigation";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";

const Header = () => {
    return <div className={styles.container}>
        <HomeIcon/>
        <MainNavigation/>
        <LoginIcon/>
    </div>;
};

export default Header;