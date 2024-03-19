import {useAppDispatch} from "../store/hooks";
import {Outlet, ScrollRestoration, useNavigate} from "react-router-dom";
import {removeCookies} from "../functions/web";
import {useQueryClient} from "@tanstack/react-query";
import useModal from "../hooks/useModal";
import {SessionExpiredModal} from "../components/layout/modal/GeneralModals";
import Modal from "../hooks/Modal";
import styles from "./main.module.css";
import Navigation from "../components/layout/nav/Navigation";
import Footer from "../components/layout/footer/Footer";
import {clearCart} from "../components/core/cart/CartLocalStorageFunctions";
import {orderState} from "../store/order-slice";
import {OnUserEmailUpdate, OnUserPasswordUpdate} from "../components/layout/modal/UserUpdateModals";
import {clearSessionStorageForm} from "../components/core/orders/forms/FormSessionStorageUtils";

const Main = () => {
    const {isModalOpen, openModal, modalContent, closeModal} = useModal();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

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
                openModal(<SessionExpiredModal closeModal={closeModal} redirectTo={"/iniciar-sesion"}/>);
                break;

            case "email-update":
                cleanUp();
                openModal(<OnUserEmailUpdate closeModal={closeModal} redirectTo={"/iniciar-sesion"}/>);
                break;

            case "password-update":
                cleanUp();
                openModal(<OnUserPasswordUpdate closeModal={closeModal} redirectTo={"/iniciar-sesion"}/>);
                break;

            case "logout":
                cleanUp();
                navigate("/");
                break;
        }
    };

    return <>
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
        <div className={styles.layout}>
            <Navigation/>
            <Outlet/>
            <Footer/>
            <ScrollRestoration/>
        </div>
    </>;
};

export default Main;