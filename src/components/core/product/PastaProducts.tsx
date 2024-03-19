import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import styles from "./css/Products.module.css";
import ProductList from "./ProductList";
import {Prompt} from "../../layout/styled/elements";

const PastaProducts = () => {
    const pastas = useLoaderData() as ProductDTO[];
    return <div className={styles.products}>
        <Prompt $fontSize={"3rem"}
                $margin={"0.5rem 0 1rem 0"}
                className={styles.mobilePrompt}>
            Pastas
        </Prompt>
        <ProductList items={pastas}/>
    </div>;
};

export default PastaProducts;