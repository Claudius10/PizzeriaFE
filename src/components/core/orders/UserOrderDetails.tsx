import styles from "./css/UserOrderDetails.module.css";
import {OrderDTO} from "../../../interfaces/dto/order";

type Props = {
    order: OrderDTO;
}

const UserOrderDetails = (props: Props) => {
    let changeRequested;
    if (props.order.orderDetails.changeRequested && props.order.orderDetails.paymentChange > 0) {
        changeRequested = props.order.orderDetails.changeRequested.toFixed(2);
    }

    let changePayment; // = change requested - totalCost/offerTotalCost
    if (props.order.orderDetails.paymentChange && props.order.orderDetails.paymentChange > 0) {
        changePayment = props.order.orderDetails.paymentChange.toFixed(2);
    }

    let paymentType;
    switch (props.order.orderDetails.paymentType) {
        case "Cash":
            paymentType = "Efectivo";
            break;
        case "Card":
            paymentType = "Tarjeta";
            break;
        default:
            paymentType = "NULO";
    }

    let delivery;
    if (props.order.orderDetails.deliveryHour === "ASAP") {
        delivery = "Lo antes posible";
    } else {
        delivery = props.order.orderDetails.deliveryHour;
    }

    return <>
        <div className={styles.category}>
            <p className={styles.header}>Datos del cliente</p>

            <div className={styles.data}>
                <p>Nombre y apellido(s): <span>{props.order.user.name}</span></p>
                <p>Email: <span>{props.order.user.email}</span></p>
                <p>Teléfono: <span>{props.order.user.contactNumber}</span></p>
            </div>
        </div>

        <div className={styles.category}>
            <p className={styles.header}>Datos de entrega</p>

            <div className={styles.data}>
                <p>Calle: <span>{props.order.address.street}</span></p>
                <p>Número: <span>{props.order.address.streetNr}</span></p>

                {props.order.address.gate && (
                    <p>Portal: <span>{props.order.address.gate}</span></p>
                )}

                {props.order.address.staircase && (
                    <p>Escalera: <span>{props.order.address.staircase}</span></p>
                )}

                {props.order.address.floor && (
                    <p>Piso: <span>{props.order.address.floor}</span></p>
                )}

                {props.order.address.door && (
                    <p>Puerta: <span>{props.order.address.door}</span></p>
                )}
            </div>
        </div>

        <div className={styles.category}>
            <p className={styles.header}>Datos adicionales</p>

            <div className={styles.data}>
                <p>Entrega: <span>{delivery}</span></p>

                {props.order.orderDetails.deliveryComment && (
                    <div>
                        <p>Observación: <span>{props.order.orderDetails.deliveryComment}</span></p>
                    </div>
                )}

                <p>Pago con: <span>{paymentType}</span></p>

                {changeRequested && (<p>Cambio solicitado: <span>{changeRequested}€</span></p>)}

                {changePayment && (<p>Su cambio: <span>{changePayment}€</span></p>)}
            </div>
        </div>
    </>;
};

export default UserOrderDetails;
