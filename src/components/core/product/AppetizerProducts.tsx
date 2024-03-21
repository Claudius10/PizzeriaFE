import styles from "./css/Products.module.css";
import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import ProductList from "./ProductList";

const AppetizerProducts = () => {
    const appetizers = useLoaderData() as ProductDTO[];
    return <div className={styles.products}>
        <ProductList items={appetizers}/>
    </div>;
};

export default AppetizerProducts;