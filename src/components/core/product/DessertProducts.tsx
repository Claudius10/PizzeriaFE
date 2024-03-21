import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import styles from "./css/Products.module.css";
import ProductList from "./ProductList";

const DessertProducts = () => {
    const desserts = useLoaderData() as ProductDTO[];
    return <div className={styles.products}>
        <ProductList items={desserts}/>
    </div>;
};

export default DessertProducts;