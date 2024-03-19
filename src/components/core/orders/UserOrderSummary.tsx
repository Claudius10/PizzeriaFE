import styles from "./css/UserOrderSummary.module.css";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {useNavigate, useParams} from "react-router-dom";
import {deleteOrderById, findUserOrder} from "../../../api/locked/user/orders";
import {orderState} from "../../../store/order-slice";
import {clearCart, getQuantity, setCart} from "../cart/CartLocalStorageFunctions";
import {
    OnCartUpdateNotValid,
    OnDeleteSuccess,
    OnError,
    OnOrderDeleteNotValid, OnOrderUpdateNotValid
} from "../../layout/modal/OrderFormModals";
import {ApiErrorDTO} from "../../../interfaces/dto/api-error";
import useModal from "../../../hooks/useModal";
import {isOrderUpdateValid} from "../../../functions/form";
import {Button, Placeholder} from "../../layout/styled/elements";
import Modal from "../../../hooks/Modal";
import UserOrderDetails from "./UserOrderDetails";
import Cart from "../cart/Cart";
import ExtraInfo from "../../layout/ExtraInfo/ExtraInfo";
import {UpdateInfoContent, UpdateTerms} from "../../layout/ExtraInfo/ExtraInfoContents";

const UserOrderSummary = () => {
    const {isModalOpen, openModal, closeModal, modalContent} = useModal();
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
        onSuccess: async (id: number) => {
            queryClient.removeQueries({queryKey: ["user", "order", orderId]});
            await queryClient.invalidateQueries({queryKey: ["user", "orders"]});
            dispatch(orderState.clear());
            clearCart();
            openModal(<OnDeleteSuccess redirectTo={"/perfil/pedido/historial?pageSize=5&pageNumber=1"} id={id}
                                       closeModal={closeModal}/>);
        },
        onError: (error: ApiErrorDTO) => {
            openModal(<OnError errorMsg={error.errorMsg} closeModal={closeModal}/>);
        }
    });

    const deleteRequest = () => {
        if (userOrder !== undefined && !isOrderUpdateValid(userOrder.createdOn, 15)) {
            openModal(<OnOrderDeleteNotValid closeModal={closeModal}/>);
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
                openModal(<OnCartUpdateNotValid redirectTo={"actualizacion"} closeModal={closeModal}/>);
            }

            if (!isOrderUpdateValid(userOrder.createdOn, 20)) {
                openModal(<OnOrderUpdateNotValid closeModal={closeModal}/>);
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
        <Modal content={modalContent} show={isModalOpen} hide={closeModal}/>
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
                        <Cart/>
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