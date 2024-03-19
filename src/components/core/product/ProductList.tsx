import styles from "./css/ProductList.module.css";
import {ProductDTO} from "../../../interfaces/dto/resources";
import ProductItem from "./ProductItem";

type Props = {
    items: ProductDTO[];
}

const ProductList = (props: Props) => {
    return <div className={styles.layout}>
        {props.items.map((item: ProductDTO) => <ProductItem key={item.id} item={item}/>)}
    </div>;
};

export default ProductList;