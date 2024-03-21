import {ProductDTO} from "../../../interfaces/dto/resources";
import {useRef} from "react";
import {addItem, clearCart, getQuantity} from "../cart/CartLocalStorageFunctions";
import styles from "./css/ProductItem.module.css";
import ProgressiveImage from "../../layout/ProgressiveImg/ProgressiveImage";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {orderState} from "../../../store/order-slice";
import {Input} from "../../layout/styled/elements";

type Props = {
    item: ProductDTO;
}

const ProductItem = (props: Props) => {
    const cartQuantity = useAppSelector(state => state.order.cartQuantity);
    const dispatch = useAppDispatch();
    const itemQuantityRef = useRef<HTMLInputElement>(null);

    const add = () => {
        if (cartQuantity === 0 && getQuantity() !== 0) {
            clearCart();
        }

        const itemQuantity = Number(itemQuantityRef.current?.value);
        const newCartQuantity = addItem({
            id: props.item.id,
            productType: props.item.productType,
            name: props.item.name,
            price: props.item.price,
            format: props.item.format,
            quantity: itemQuantity,
        });

        dispatch(orderState.setCartQuantity(newCartQuantity));
    };

    let imgStyle, descStyle;
    if (props.item.productType === "beverage") {
        imgStyle = "img-container-beverage";
        descStyle = "desc-beverage";
    } else {
        imgStyle = "img-container";
        descStyle = "desc";
    }

    return <div className={styles["product-container"]}>
        <div className={styles[imgStyle]}>
            <ProgressiveImage src={props.item.image} width={"100%"} height={"100%"}/>
        </div>

        <p className={styles.title}>{props.item.name} {props.item.format}</p>

        <p className={styles[descStyle]}>{props.item.description}</p>

        <div className={styles.buyout}>
            {props.item.price}€
            x
            <Input
                name="productQuantity"
                type="number"
                defaultValue="1"
                min="1"
                max="10"
                ref={itemQuantityRef}
                $height={"1rem"}
                $width={"1.5rem"}
                $margin={"0 0 0 0.5rem"}
                $padding={"0 0 0 0.35rem"}
            />
            <button onClick={add} className={styles.button}>
                AÑADIR
            </button>
        </div>
    </div>;
};


export default ProductItem;