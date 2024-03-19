import styles from "./css/OrderSummaryItem.module.css";
import {useNavigate} from "react-router-dom";
import {OrderSummaryDTO} from "../../../../interfaces/dto/order";

interface Props {
    orderSummary: OrderSummaryDTO;
    key: string;
}

const OrderSummaryItem = (props: Props) => {
    const navigate = useNavigate();

    const openOrder = () => {
        navigate(`${props.orderSummary.id}`);
    };

    let layout, info, dates;
    if (props.orderSummary.formattedUpdatedOn) {
        layout = styles["layout-one"];
        info = styles["info-one"];
        dates = styles["dates-one"];
    } else {
        layout = styles["layout-two"];
        info = styles["info-two"];
        dates = styles["dates-two"];
    }

    let paymentType;
    switch (props.orderSummary.orderDetails.paymentType) {
        case "Cash":
            paymentType = "Efectivo";
            break;
        case "Card":
            paymentType = "Tarjeta";
            break;
    }

    return <div onClick={openOrder} className={layout}>

        <div className={info}>
            <p className={styles.header}>Pedido {props.orderSummary.id} </p>

            <div className={dates}>
                <p>Fecha creación: <span className={styles.highlight}>{props.orderSummary.formattedCreatedOn}</span></p>
                {props.orderSummary.formattedUpdatedOn &&
                    <p>Última actualización: <span
                        className={styles.highlight}>{props.orderSummary.formattedUpdatedOn}</span></p>}
            </div>
        </div>

        <div className={styles["extra-info"]}>
            <p>Total: <span className={styles.highlight}>{props.orderSummary.cart.totalCost.toFixed(2)}€</span></p>
            {props.orderSummary.cart.totalCostOffers !== 0 &&
                <p>Total con ofertas: <span
                    className={styles["offer-total"]}>{props.orderSummary.cart.totalCostOffers.toFixed(2)}€</span></p>}
        </div>

        <div className={styles["extra-info"]}>
            <p>Artículos: <span className={styles.highlight}>{props.orderSummary.cart.totalQuantity}</span></p>
            <p>Pago con: <span className={styles.highlight}>{paymentType}</span></p>
        </div>
    </div>;
};

export default OrderSummaryItem;