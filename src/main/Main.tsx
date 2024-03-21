import {useAppDispatch} from "../store/hooks";
import {Outlet, ScrollRestoration, useNavigate} from "react-router-dom";
import {removeCookies} from "../functions/web";
import {useQueryClient} from "@tanstack/react-query";
import styles from "./main.module.css";
import Footer from "../components/layout/footer/Footer";
import {clearCart} from "../components/core/cart/CartLocalStorageFunctions";
import {orderState} from "../store/order-slice";
import {clearSessionStorageForm} from "../components/core/orders/forms/FormSessionStorageUtils";
import {Text, Button} from '@mantine/core';
import Header from "../components/layout/nav/Header.tsx";
import {modals} from '@mantine/modals';

const Main = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const openOnUserEmailUpdateModal = () => modals.open({
        title: "Actualización completa",
        children: (
            <div className={styles.modal}>
                <Text size="sm">
                    Email actualizado con éxito. La sesión ha de ser reiniciada.
                </Text>
                <div className={styles.modalButton}>
                    <Button variant="outline" color="orange" radius="xs" onClick={() => {
                        navigate("/");
                        modals.closeAll();
                    }}>
                        Continuar
                    </Button>
                </div>
            </div>
        ),
    });

    const cleanUp = () => {
        clearSessionStorageForm();
        clearCart();
        dispatch(orderState.clear());
        queryClient.removeQueries({queryKey: ["user"]});
        removeCookies();
    };

    const logoutBc = new BroadcastChannel("session");
    logoutBc.onmessage = (message) => {
        switch (message.data) {
            case "session-expired":
                cleanUp();

                break;

            case "email-update":
                cleanUp();
                openOnUserEmailUpdateModal();
                break;

            case "password-update":
                cleanUp();

                break;

            case "logout":
                cleanUp();
                navigate("/");
                break;
        }
    };

    return <div className={styles.container}>
        <Header/>
        <div className={styles.main}>
            <Outlet/>
        </div>
        <Footer/>
        <ScrollRestoration/>
    </div>;
};

export default Main;