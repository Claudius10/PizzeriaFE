import styles from "./css/AnonOrderSummary.module.css";
import Cart from "../cart/Cart";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Button, Prompt} from "../../layout/styled/elements";
import {NavLink, useNavigate} from "react-router-dom";
import {orderState} from "../../../store/order-slice";
import {clearCart} from "../cart/CartLocalStorageFunctions";

const AnonOrderSummary = () => {
    const orderSummary = useAppSelector(state => state.order.orderSummary);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const close = () => {
        dispatch(orderState.clear());
        clearCart();
        navigate("/");
    };

    let changeRequested;
    if (orderSummary?.orderDetails.changeRequested && orderSummary.orderDetails.paymentChange > 0) {
        changeRequested = orderSummary.orderDetails.changeRequested.toFixed(2);
    }

    let changePayment; // = change requested - totalCost/offerTotalCost
    if (orderSummary?.orderDetails.paymentChange && orderSummary.orderDetails.paymentChange > 0) {
        changePayment = orderSummary?.orderDetails.paymentChange.toFixed(2);
    }

    let paymentType;
    switch (orderSummary?.orderDetails.paymentType) {
        case "Cash":
            paymentType = "Efectivo";
            break;
        case "Card":
            paymentType = "Tarjeta";
            break;
    }

    let delivery;
    if (orderSummary?.orderDetails.deliveryHour === "ASAP") {
        delivery = "Lo antes posible";
    } else {
        delivery = orderSummary?.orderDetails.deliveryHour;
    }

    return <>
        {orderSummary === undefined &&
            <Prompt $margin={"2rem 0 0 0"}>Realiza un pedido y el resumen aparecerá aquí.</Prompt>}
        {orderSummary && <div className={styles.container}>

            <Prompt $color={"#e4e6ed"}>¡Enhorabuena por elegir máxima <span
                className={styles.accent}>calidad</span> y <span
                className={styles.accent}>sabor!</span></Prompt>
            <Prompt $color={"#e4e6ed"} $margin={"0 0 1rem 0"}>Estamos preparando tu pedido...</Prompt>

            <div className={styles.content}>
                <div className={styles.details}>
                    <div className={styles.category}>
                        <p className={styles.header}>Datos del cliente</p>

                        <div className={styles.data}>
                            <p>Nombre y apellido(s): <span>{orderSummary?.anonCustomerName}</span></p>
                            <p>Email: <span>{orderSummary?.anonCustomerEmail}</span></p>
                            <p>Teléfono: <span>{orderSummary?.anonCustomerContactNumber}</span></p>
                        </div>
                    </div>

                    <div className={styles.category}>
                        <p className={styles.header}>Datos de entrega</p>

                        <div className={styles.data}>
                            <p>Calle: <span>{orderSummary?.address.street}</span></p>
                            <p>Número: <span>{orderSummary?.address.streetNr}</span></p>

                            {orderSummary?.address.gate && (
                                <p>Portal: <span>{orderSummary?.address.gate}</span></p>
                            )}

                            {orderSummary?.address.staircase && (
                                <p>Escalera: <span>{orderSummary?.address.staircase}</span></p>
                            )}

                            {orderSummary?.address.floor && (
                                <p>Piso: <span>{orderSummary.address.floor}</span></p>
                            )}

                            {orderSummary?.address.door && (
                                <p>Puerta: <span>{orderSummary?.address.door}</span></p>
                            )}
                        </div>
                    </div>

                    <div className={styles.category}>
                        <p className={styles.header}>Datos adicionales</p>

                        <div className={styles.data}>
                            <p>Entrega: <span>{delivery}</span></p>

                            {orderSummary?.orderDetails.deliveryComment && (
                                <div>
                                    <p>Observación: <span>{orderSummary?.orderDetails.deliveryComment}</span></p>
                                </div>
                            )}

                            <p>Pago con: <span>{paymentType}</span></p>

                            {changeRequested && (<p>Cambio solicitado: <span>{changeRequested}€</span></p>)}

                            {changePayment && (<p>Su cambio: <span>{changePayment}€</span></p>)}
                        </div>
                    </div>
                </div>

                <div className={styles.cart}>
                    <Cart inDrawer={false}/>
                </div>
            </div>

            <Button $width={"15rem"} onClick={close}>Continuar</Button>

            <div className={styles.register}>
                <Prompt $fontSize={"1rem"} $fontFamily={"Trebuchet MS"} $margin={"0 0 0.7rem 0"}>Registrate y tendrás
                    mayor fácilidad de crear
                    pedidos, acceso al historial de pedidos, y posibilidad
                    de actualizar el pedido si lo decides. </Prompt>
                <NavLink to={"/registracion-usuario"}>¡Registrate aquí!</NavLink>
            </div>
        </div>}
    </>;
};

export default AnonOrderSummary;