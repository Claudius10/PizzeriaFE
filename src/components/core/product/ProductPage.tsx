import styles from "./css/Products.module.css";
import Cart from "../cart/Cart";
import {Outlet, useLocation} from "react-router-dom";

const ProductPage = () => {
    const location = useLocation();
    const formatMenuExists = location.pathname === "/menu/pizzas" || location.pathname === "/menu/bebidas";

    return <div className={styles.container}>
        <Outlet/>
        <div className={formatMenuExists ? styles.cartWithFormatMenu : styles.cart}>
            <Cart/>
        </div>
    </div>;

};

export default ProductPage;