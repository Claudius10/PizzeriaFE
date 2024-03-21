import styles from "./css/CartItem.module.css";
import {OrderItemDTO} from "../../../interfaces/dto/order";
import {Button} from "../../layout/styled/elements";
import {addQuantity, removeQuantity} from "./CartLocalStorageFunctions";
import {useAppDispatch} from "../../../store/hooks";
import {orderState} from "../../../store/order-slice";
import {useParams} from "react-router-dom";
import {Badge} from "@mantine/core";

type Props = {
    item: OrderItemDTO
}

const CartItem = (props: Props) => {
    const dispatch = useAppDispatch();
    const totalPrice = (props.item.price * props.item.quantity).toFixed(2);
    const {orderId} = useParams();
    const isSummaryPage = location.pathname === "/pedido-nuevo/resumen" || location.pathname === `/perfil/pedido/historial/${orderId}`;
    const buttonStyles = isSummaryPage ? styles.hiddenButtons : styles.buttons;

    // + button
    const increaseQuantity = () => {
        if (props.item.id !== null) {
            dispatch(orderState.setCartQuantity(addQuantity(props.item.id)));
        }
    };

    // - button
    const decreaseQuantity = () => {
        if (props.item.id !== null) {
            dispatch(orderState.setCartQuantity(removeQuantity(props.item.id)));
        }
    };

    const dot = '\u{003E}';

    return <div className={styles.layout}>
        <div className={styles.productContainer}>
            <div className={styles.info}>
                <p className={styles.header}><span className={styles.indicator}>{dot}</span>{props.item.name}
                </p>
                <Badge variant="transparent" color="#a9004f" size={"lg"}>{props.item.format}</Badge>
                <p>Precio: {totalPrice}€</p>
            </div>

            <div className={styles.quantity}>
                <p className={styles["quantity-value"]}>Cantidad: {props.item.quantity}</p>
                <div className={styles.quantity}>
                    <div className={buttonStyles}>
                        <Button
                            type="button"
                            onClick={increaseQuantity}
                            $width={"2rem"}>
                            +
                        </Button>
                        <Button
                            type="button"
                            onClick={decreaseQuantity}
                            $width={"2rem"}>
                            -
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default CartItem;