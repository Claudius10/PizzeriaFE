import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import styles from "./css/Products.module.css";
import ProductList from "./ProductList";

const PastaProducts = () => {
    const pastas = useLoaderData() as ProductDTO[];
    return <div className={styles.products}>
        <ProductList items={pastas}/>
    </div>;
};

export default PastaProducts;