import styles from "./css/Products.module.css";
import {Outlet} from "react-router-dom";

const ProductPage = () => {
    return <div className={styles.container}>
        <Outlet/>
    </div>;
};

export default ProductPage;