import styles from "./css/UserOrderSummary.module.css";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {deleteOrderById, findUserOrder} from "../../../api/locked/user/orders";
import {orderState} from "../../../store/order-slice";
import {clearCart, getQuantity, setCart} from "../cart/CartLocalStorageFunctions";
import {ApiErrorDTO} from "../../../interfaces/dto/api-error";
import {isOrderUpdateValid} from "../../../functions/form";
import {Button, Placeholder} from "../../layout/styled/elements";
import UserOrderDetails from "./UserOrderDetails";
import Cart from "../cart/Cart";
import ExtraInfo from "../../layout/ExtraInfo/ExtraInfo";
import {UpdateInfoContent, UpdateTerms} from "../../layout/ExtraInfo/ExtraInfoContents";
import {modals} from "@mantine/modals";

const UserOrderSummary = () => {
    const [orderDeletePending, setOrderDeletePending] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isRefetchPending = useAppSelector(state => state.order.refetchPending);
    const cartId = useAppSelector(state => state.order.cartId);
    const cartQuantity = useAppSelector(state => state.order.cartQuantity);
    const {orderId} = useParams();

    const {
        data: userOrder,
        isLoading,
        isSuccess,
        isError,
        refetch
    } = useQuery({
        queryKey: ["user", "order", orderId],
        queryFn: findUserOrder,
    });

    useEffect(() => {
        if (isSuccess && ((cartId === null || cartQuantity === 0 || orderId && Number(orderId) !== cartId))) {
            setCart(userOrder.cart);
            dispatch(orderState.setCartId(userOrder.cart.id));
            dispatch(orderState.setCartQuantity(getQuantity()));
        }

        return () => {
            clearCart();
            dispatch(orderState.clear());
        };

    }, [isSuccess]);

    if (isRefetchPending) {
        refetch().then((order) => {
            if (order.isSuccess) {
                clearCart();
                dispatch(orderState.clear());
                setCart(order.data.cart);
                dispatch(orderState.setCartId(order.data.cart.id));
                dispatch(orderState.setCartQuantity(order.data.cart.totalQuantity));
                dispatch(orderState.setRefetchPending(false));
            }
        }).catch((error: ApiErrorDTO) => {
            throw new Error(error.errorMsg);
        });
    }

    const deleteOrder = useMutation({
        mutationFn: deleteOrderById,
        onSuccess: async (orderId: number) => {
            await queryClient.invalidateQueries({queryKey: ["user", "orders"]});
            dispatch(orderState.clear());
            clearCart();
            modals.openContextModal({
                modal: "agree",
                title: "Anulación",
                innerProps: {
                    modalBody: `Pedido ${orderId} anulado con éxito.`,
                    onConfirm: () => {
                        navigate("/perfil/pedido/historial?pageSize=5&pageNumber=1");
                    }
                }
            });
        },
        onError: (error: ApiErrorDTO) => {
            modals.openContextModal({
                modal: "agree",
                title: "Error",
                innerProps: {
                    modalBody: error.errorMsg
                }
            });
        }
    });

    const deleteRequest = () => {
        if (userOrder !== undefined && !isOrderUpdateValid(userOrder.createdOn, 15)) {
            modals.openContextModal({
                modal: "agree",
                title: "Advertencia",
                innerProps: {
                    modalBody: "El pedido ya no puede anularse debido a la superación del tiempo límite (20 min.)."
                }
            });
        } else {
            setOrderDeletePending(true);
        }
    };

    const cancelDelete = () => {
        setOrderDeletePending(false);
    };

    const confirmDelete = () => {
        if (orderId != undefined) {
            deleteOrder.mutate(orderId);
        }
    };

    const updateRequest = () => {
        if (userOrder !== undefined) {
            if (!isOrderUpdateValid(userOrder.createdOn, 10) && isOrderUpdateValid(userOrder.createdOn, 15)) {
                dispatch(orderState.setUpdatePending(true));
                modals.openContextModal({
                    modal: "confirm",
                    title: "Advertencia",
                    innerProps: {
                        modalBody: "La cesta ya no puede modificarse debido a la superación del tiempo límite (10 min.). Los demás cambios se realizarán correctamente.",
                        onConfirm: () => {
                            navigate("/menu/pizzas");
                        }
                    }
                });
            }

            if (!isOrderUpdateValid(userOrder.createdOn, 20)) {
                modals.openContextModal({
                    modal: "agree",
                    title: "Advertencia",
                    innerProps: {
                        modalBody: "El pedido ya no puede modificarse debido a la superación del tiempo límite (15 min.)."
                    }
                });
            } else {
                dispatch(orderState.setUpdatePending(true));
                navigate(`actualizacion`);
            }
        }
    };

    const backToOrderList = () => {
        navigate("/perfil/pedido/historial?pageSize=5&pageNumber=1");
    };

    const orderActions = <div className={styles.orderActions}>
        <Button $width={"100%"}
                $color={"#e4e6ed"}
                $textColor={"#a9004f"}
                onClick={deleteRequest}
                type={"button"}>
            Anular pedido
        </Button>

        <Button $width={"100%"}
                onClick={updateRequest}
                type={"button"}>
            Actualizar pedido
        </Button>
    </div>;

    const deleteOrderActions = <div className={styles.orderActions}>
        <Button
            type={"button"}
            onClick={confirmDelete}
            $width={"100%"}
            $color={"#e4e6ed"}
            $textColor={"#a9004f"}>
            Confirmar anulación
        </Button>

        <Button
            type={"button"}
            onClick={cancelDelete}
            $width={"100%"}>
            Cancelar anulación
        </Button>
    </div>;

    return <>
        {isLoading && <Placeholder>Cargando...</Placeholder>}
        {isError && <Placeholder>Se ha producido un error</Placeholder>}
        {isSuccess &&
            <div className={styles.layout}>
                <span className={styles.orderId}>Pedido {userOrder.id}</span>

                <div className={styles.dates}>
                    <p className={styles.date}>Fecha creación:<span>{" " + userOrder.formattedCreatedOn}</span></p>
                    {userOrder.formattedUpdatedOn && (
                        <p className={styles.date}>
                            Última actualización:<span>{" " + userOrder.formattedUpdatedOn}</span>
                        </p>)}
                </div>

                <div className={styles.orderView}>

                    <div className={styles.details}>
                        <UserOrderDetails order={userOrder}/>
                    </div>

                    <div className={styles.cart}>
                        <Cart inDrawer={false}/>
                    </div>
                </div>

                <div className={styles.pageActions}>
                    {!orderDeletePending && orderActions}
                    {orderDeletePending && deleteOrderActions}

                    <Button $width={"10rem"} onClick={backToOrderList}>
                        Volver
                    </Button>
                </div>
                <ExtraInfo title={UpdateTerms} info={UpdateInfoContent} open={true}/>
            </div>}
    </>;
};

export default UserOrderSummary;