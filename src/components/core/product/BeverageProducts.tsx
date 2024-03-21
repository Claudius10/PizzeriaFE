import {useLoaderData} from "react-router-dom";
import {ProductDTO} from "../../../interfaces/dto/resources";
import {useState} from "react";
import styles from "./css/Products.module.css";
import ProductList from "./ProductList";
import {SegmentedControl} from "@mantine/core";

const BeverageProducts = () => {
    const beveragesList = useLoaderData() as ProductDTO[];
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
        <div className={styles.format}>
            <SegmentedControl
                classNames={{root: styles.segment}}
                radius="xl"
                color={"#a9004f"}
                onChange={(value) => {
                    if (value === "330") {
                        set330MLSize();
                    } else {
                        set1LSize();
                    }
                }}
                data={[
                    {label: '330ML', value: '330'},
                    {label: '1L', value: '1'},
                ]}
            />
        </div>

        <div className={styles.productListWithFormat}>
            <ProductList items={beverages}/>
        </div>
    </div>;
};

export default BeverageProducts;