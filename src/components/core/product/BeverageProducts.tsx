import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import {useState} from "react";
import styles from "./css/Products.module.css";
import ProductFormatMenu from "./ProductFormatMenu";
import ProductList from "./ProductList";
import {Prompt} from "../../layout/styled/elements";

const BeverageProducts = () => {
    const beveragesList = useLoaderData() as ProductDTO[];
    const beverageFormats = beveragesList.map((beverage) => beverage.format);
    const uniqueFormats = beverageFormats.filter((value, index, array) => array.indexOf(value) === index);
    const beverages330ml = beveragesList.filter((beverage) => beverage.format === "330ml");
    const beverages1l = beveragesList.filter((beverage) => beverage.format === "1L");
    const [beverages, setBeverages] = useState(beverages330ml);

    const set330MLSize = () => {
        setBeverages(beverages330ml);
    };

    const set1LSize = () => {
        setBeverages(beverages1l);
    };

    return <div className={styles.layout}>
        <Prompt $fontSize={"3rem"}
                $margin={"0 0 0.5rem 0"}
                className={styles.mobilePrompt}>
            Bebidas
        </Prompt>

        <div className={styles.format}>
            <ProductFormatMenu formats={uniqueFormats} formatHandlers={[set330MLSize, set1LSize]}/>
        </div>

        <div className={styles.products}>
            <ProductList items={beverages}/>
        </div>
    </div>;
};

export default BeverageProducts;