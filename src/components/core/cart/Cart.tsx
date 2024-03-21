import styles from "./css/Cart.module.css";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {clearCart, getQuantity, setCart} from "./CartLocalStorageFunctions";
import {Button} from "../../layout/styled/elements";
import CartContent from "./CartContent";
import {orderState} from "../../../store/order-slice";
import {getCookie} from "../../../functions/web";
import {OrderDTO} from "../../../interfaces/dto/order";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    inDrawer: boolean;
    closeDrawer?: () => void;
}

const Cart = (props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const isLoggedIn = getCookie("id") !== "";
    const {orderId} = useParams();
    const cartQuantity = useAppSelector(state => state.order.cartQuantity);
    const cartId = useAppSelector(state => state.order.cartId);
    const updatePending = useAppSelector(state => state.order.updatePending);
    const isAnonOrderFormPage = location.pathname === "/pedido-nuevo";
    const isSummaryPage = location.pathname === "/pedido-nuevo/resumen";
    const isUserOrderFormPage = location.pathname === "/pedido-nuevo/usuario";
    const isOrderSummaryPage = location.pathname === `/perfil/pedido/historial/${orderId}`;
    const isUpdateUserOrderPage = location.pathname === `/perfil/pedido/historial/${orderId}/actualizacion`;
    const id = orderId ? orderId : String(cartId);
    const userOrder = queryClient.getQueryData(["user", "order", id]) as OrderDTO;

    let layoutStyle, emptyStyle;
    if (props.inDrawer) {
        layoutStyle = styles.layoutDrawer;
        emptyStyle = styles.emptyDrawer;
    } else {
        layoutStyle = styles.layout;
        emptyStyle = styles.empty;
    }

    const reloadCart = () => {
        if (userOrder !== undefined) {
            setCart(userOrder.cart);
            dispatch(orderState.setCartId(userOrder.cart.id));
            dispatch(orderState.setCartQuantity(userOrder.cart.totalQuantity));
        }
    };

    useEffect(() => {
        const loadCart = () => {
            dispatch(orderState.setCartQuantity(getQuantity()));
        };

        if (cartQuantity === 0) {
            loadCart();
        }

        window.addEventListener("storage", loadCart);

        return () => {
            window.removeEventListener("storage", loadCart);
        };
    }, []);

    const toAnonOrderForm = () => {
        if (props.closeDrawer) {
            props.closeDrawer();
        }
        navigate("/pedido-nuevo");
    };

    const toUserOrderForm = () => {
        if (props.closeDrawer) {
            props.closeDrawer();
        }
        navigate("/pedido-nuevo/usuario");
    };

    const toOrderView = () => {
        if (isUpdateUserOrderPage) {
            navigate(`/perfil/pedido/historial/${cartId}`);
            clearCart();
            dispatch(orderState.clear());
        } else {
            navigate(`/perfil/pedido/historial/${cartId}/actualizacion`);
        }

        if (props.closeDrawer) {
            props.closeDrawer();
        }
    };

    return <div className={layoutStyle}>
        <div className={styles.header}>
            <p>Tu Cesta</p>
        </div>

        {cartQuantity === 0 ? (<p className={emptyStyle}>Aquí no hay nada :(</p>) :
            <CartContent cartInDrawer={props.inDrawer}/>}

        <div className={styles.buttonsContainer}>
            <div className={styles.buttons}>
                {!isAnonOrderFormPage && !isUserOrderFormPage && !isSummaryPage && !isOrderSummaryPage && !updatePending && (
                    <Button
                        type="button"
                        onClick={isLoggedIn ? toUserOrderForm : toAnonOrderForm}
                        disabled={cartQuantity === 0}
                        $width={"100%"}>
                        Continuar
                    </Button>
                )}

                {!isOrderSummaryPage && updatePending && <>
                    <Button
                        type="button"
                        onClick={toOrderView}
                        disabled={cartId === null}
                        $width={"100%"}
                        $margin={"0 0 0.5rem 0"}>
                        Mi pedido
                    </Button>

                    <Button $width={"100%"}
                            onClick={reloadCart}
                            className={styles["reload-cart-mobile"]}
                            type={"button"}>
                        Restablecer cesta original
                    </Button>
                </>}
            </div>
        </div>
    </div>;
};

export default Cart;