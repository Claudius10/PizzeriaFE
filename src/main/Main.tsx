import {useAppDispatch} from "../store/hooks";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {removeCookies} from "../functions/web";
import {useQueryClient} from "@tanstack/react-query";
import styles from "./main.module.css";
import Footer from "../components/layout/footer/Footer";
import {clearCart} from "../components/core/cart/CartLocalStorageFunctions";
import {orderState} from "../store/order-slice";
import {clearSessionStorageForm} from "../components/core/orders/forms/FormSessionStorageUtils";
import Header from "../components/layout/nav/Header.tsx";

const Main = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const logoutBc = new BroadcastChannel("session");

    logoutBc.onmessage = () => {
        clearSessionStorageForm();
        clearCart();
        dispatch(orderState.clear());
        queryClient.removeQueries({queryKey: ["user"]});
        removeCookies();
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