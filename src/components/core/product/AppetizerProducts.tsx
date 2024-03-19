import styles from "./css/Products.module.css";
import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import ProductList from "./ProductList";
import {Prompt} from "../../layout/styled/elements";

const AppetizerProducts = () => {
    const appetizers = useLoaderData() as ProductDTO[];
    return <div className={styles.products}>
        <Prompt $fontSize={"3rem"}
                $margin={"0.5rem 0 1rem 0"}
                className={styles.mobilePrompt}>
            Entrantes
        </Prompt>
        <ProductList items={appetizers}/>
    </div>;
};

export default AppetizerProducts;