import styles from "./css/HomeIcon.module.css";
import {NavLink} from "react-router-dom";
import Icon from "../icon/Icon";
import pizzaIcon from "../../../resources/icons/pizza-icon.png";

const HomeIcon = () => {
    return <div className={styles.container}>
        <NavLink to="/">
            <Icon src={pizzaIcon} height="62px" width="62px"/>
        </NavLink>
        <NavLink to="/" className={styles.text}>
            La Pizzería Fabulosa
        </NavLink>
    </div>;
};

export default HomeIcon;