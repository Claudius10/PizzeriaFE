import classes from "./css/Header.module.css";
import MainNavigation from "./MainNavigation";
import HomeIcon from "./HomeIcon";
import LoginIcon from "./LoginIcon";
import MobileNavigation from "./MobileNavigation.tsx";
import {useDisclosure, useWindowScroll} from "@mantine/hooks";
import Cart from "../../core/cart/Cart.tsx";
import {Affix, Drawer, Transition} from "@mantine/core";
import MobileCartButton from "./mobile/cart/MobileCartButton.tsx";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = () => {
    const [opened, {open, close}] = useDisclosure(false);
    const [scroll] = useWindowScroll();
    const [showCartB, setShowCartB] = useState(true);
    const location = useLocation();
    const showCartButton = location.pathname !== "/"
        && location.pathname !== "/iniciar-sesion"
        && location.pathname !== "/registracion-usuario"
        && location.pathname !== "/perfil"
        && location.pathname !== "/perfil/pedido/historial"
        && location.pathname !== "/perfil/configuracion";

    useEffect(() => {
        window.onscroll = () => {
            setShowCartB(false);
        };

        const timer = setTimeout(() => {
            setShowCartB(true);
        }, 700);


        return () => {
            clearTimeout(timer);
        };
    }, [scroll]);

    const toggleCart = () => {
        if (opened) {
            close();
        } else {
            open();
        }
    };

    let drawerSize = "25rem";
    let affixBottom = 70;
    let affixRight = 10;
    if (window.screen.width < 550) {
        drawerSize = "100%";
        affixBottom = 50;
        affixRight = 5;
    }

    return <div className={classes.container}>
        <HomeIcon/>
        <MainNavigation/>
        <MobileNavigation/>
        <LoginIcon/>

        <Drawer opened={opened} onClose={close} size={drawerSize} position={"right"}>
            <Cart inDrawer={true} closeDrawer={close}/>
        </Drawer>

        {showCartButton && <Transition mounted={showCartB} transition={"fade"} duration={400} timingFunction={"ease"}>
            {(styles) => <Affix style={styles} position={{bottom: affixBottom, right: affixRight}}>
                <div className={opened ? classes.hideButton : classes.showButton}>
                    <MobileCartButton action={toggleCart}/>
                </div>
            </Affix>}
        </Transition>}
    </div>;
};

export default Header;