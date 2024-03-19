import styles from "./css/Navigation.module.css";
import Icon from "../../layout/icon/Icon";
import {NavLink, useNavigate} from "react-router-dom";
import useModal from "../../../hooks/useModal";
import Modal from "../../../hooks/Modal";
import anonUser from "../../../resources/icons/icons8-account-100.png";
import loggedInUser from "../../../resources/icons/icons8-account-100(1).png";
import pizzaIcon from "../../../resources/icons/pizza-icon.png";
import mobileNavIcon from "../../../resources/icons/icons8-menu-100.png";
import Cart from "../../core/cart/Cart";
import MobileButton from "./mobile/MobileButton";
import MobileCartButton from "./mobile/cart/MobileCartButton";
import {getCookie} from "../../../functions/web";
import {Button} from "../styled/elements";

const Navigation = () => {
    const navigate = useNavigate();
    const isLoggedIn = getCookie("id") !== "";
    const {isModalOpen, modalContent, openModal, closeModal} = useModal();

    let accountText;
    let accountIcon;
    if (isLoggedIn) {
        accountText = "Mí Cuenta";
        accountIcon = loggedInUser;
    } else {
        accountText = "Inicia Sesión";
        accountIcon = anonUser;
    }

    const authNavigate = () => {
        if (isLoggedIn) {
            navigate("/perfil");
        } else {
            navigate("/iniciar-sesion");
        }
    };

    const mobileNavModalContent = (
        <ul className={styles["mobile-menu"]}>
            <NavLink to="/" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Inicio
            </NavLink>
            <NavLink to="/menu/pizzas" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Pizzas
            </NavLink>
            <NavLink to="/menu/entrantes" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Entrantes
            </NavLink>
            <NavLink to="/menu/pastas" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Pastas
            </NavLink>
            <NavLink to="/menu/postres" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Postres
            </NavLink>
            <NavLink to="/menu/bebidas" onClick={closeModal} className={({isActive, isPending}) =>
                isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>
                Bebidas
            </NavLink>
        </ul>
    );

    const cartModalContent = <>
        <div className={styles.cartBackButton}>
            <Button onClick={closeModal}>Cerrar</Button>
        </div>
        <Cart/>
    </>;

    const toggleMobileNavModal = () => {
        openModal(mobileNavModalContent);
    };

    const toggleCartModal = () => {
        openModal(cartModalContent);
    };

    const desktopNav =
        <div className={styles["desktop-nav"]}>
            <div className={styles["home-icon"]}>
                <NavLink to="/">
                    <Icon src={pizzaIcon} height="62px" width="62px"/>
                </NavLink>
                <NavLink to="/" className={styles["home-text"]}>
                    La Pizzería Fabulosa
                </NavLink>
            </div>

            <div className={styles["nav-links"]}>
                <NavLink to="menu/pizzas" className={({isActive, isPending}) =>
                    isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>Pizzas</NavLink>

                <NavLink to="menu/entrantes" className={({isActive, isPending}) =>
                    isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>Entrantes</NavLink>

                <NavLink to="menu/pastas" className={({isActive, isPending}) =>
                    isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>Pastas</NavLink>

                <NavLink to="menu/postres" className={({isActive, isPending}) =>
                    isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>Postres</NavLink>

                <NavLink to="menu/bebidas" className={({isActive, isPending}) =>
                    isPending ? `${styles.pending}` : isActive ? `${styles.active}` : `${styles.pending}`}>Bebidas</NavLink>
            </div>

            <div className={styles["acc-icon"]}>
                <div className={styles["acc-align"]}>
                    <NavLink to={isLoggedIn ? "/perfil" : "/iniciar-sesion"} className={styles["acc-text"]}>
                        <p>{accountText}</p>
                    </NavLink>
                    <NavLink to={isLoggedIn ? "/perfil" : "/iniciar-sesion"}>
                        <Icon src={accountIcon} height="28px" width="28px"/>
                    </NavLink>
                </div>
            </div>
        </div>;

    const mobileNav =
        <div className={styles["mobile-nav-buttons"]}>
            <div className={styles["mobile-nav-button-left"]}>
                <MobileButton
                    name="nav"
                    icon={mobileNavIcon}
                    action={toggleMobileNavModal}
                    height="32px"
                    width="auto"
                />
            </div>

            <div className={styles["mobile-nav-button-mid"]}>
                <MobileButton
                    name="account"
                    icon={accountIcon}
                    action={authNavigate}
                    height="32px"
                    width="auto"
                />
            </div>

            <div className={styles["mobile-nav-button-right"]}>
                <MobileCartButton action={toggleCartModal}/>
            </div>
        </div>;

    return <>
        <Modal show={isModalOpen} hide={closeModal} content={modalContent}/>
        <div className={styles["nav-container"]}>
            {desktopNav}
            {mobileNav}
        </div>
    </>;
};

export default Navigation;
