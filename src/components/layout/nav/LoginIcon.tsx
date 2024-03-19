import styles from "./css/LoginIcon.module.css";
import {NavLink} from "react-router-dom";
import {getCookie} from "../../../functions/web";
import loggedInUser from "../../../resources/icons/icons8-account-100(1).png";
import anonUser from "../../../resources/icons/icons8-account-100.png";
import {IconImg} from "../styled/elements";

const LoginIcon = () => {
    const isLoggedIn = getCookie("id") !== "";
    let accountText, accountIcon;
    if (isLoggedIn) {
        accountText = "Mí Cuenta";
        accountIcon = loggedInUser;
    } else {
        accountText = "Inicia Sesión";
        accountIcon = anonUser;
    }

    return <div className={styles.container}>
        <div className={styles["acc-align"]}>
            <NavLink to={isLoggedIn ? "/perfil" : "/iniciar-sesion"} className={styles.text}>
                {accountText}
            </NavLink>
            <NavLink to={isLoggedIn ? "/perfil" : "/iniciar-sesion"}>
                <IconImg
                    src={accountIcon}
                    alt="mobile-icon"
                    $height={"38px"}
                    $width={"38px"}
                    $padding={"0.3rem 0 0 0"}

                />
            </NavLink>
        </div>
    </div>;
};

export default LoginIcon;